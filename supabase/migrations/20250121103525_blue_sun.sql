-- Create the news_section table
CREATE TABLE IF NOT EXISTS news_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  date text NOT NULL,
  is_pinned boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row-Level Security (RLS)
ALTER TABLE news_section ENABLE ROW LEVEL SECURITY;

-- Create policies for board members to manage news
CREATE POLICY "Allow board members to manage news"
  ON news_section
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'board'
    )
  );

-- Create policies for all authenticated users to read news
CREATE POLICY "Allow all users to read news"
  ON news_section
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to manage pinning logic
CREATE OR REPLACE FUNCTION manage_news_pins()
RETURNS TRIGGER AS $$
BEGIN
  -- If this is a new pin, unpin others
  IF NEW.is_pinned AND (OLD IS NULL OR NOT OLD.is_pinned) THEN
    UPDATE news_section 
    SET is_pinned = false 
    WHERE id != NEW.id;
  -- If trying to unpin the last pinned message, prevent it
  ELSIF NOT NEW.is_pinned AND (OLD IS NULL OR OLD.is_pinned) THEN
    IF NOT EXISTS (
      SELECT 1 FROM news_section 
      WHERE is_pinned = true 
      AND id != NEW.id
    ) THEN
      -- Keep this message pinned if it's the last one
      NEW.is_pinned := true;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for managing pinned news (before insert or update)
CREATE TRIGGER manage_news_pins_trigger
  BEFORE INSERT OR UPDATE ON news_section
  FOR EACH ROW
  EXECUTE FUNCTION manage_news_pins();

-- Ensure one message is pinned
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM news_section WHERE is_pinned = true) THEN
    WITH latest_news AS (
      SELECT id FROM news_section 
      ORDER BY created_at DESC 
      LIMIT 1
    )
    UPDATE news_section 
    SET is_pinned = true 
    WHERE id = (SELECT id FROM latest_news);
  END IF;
END $$;

-- Ensure the latest message is pinned if no message is pinned
UPDATE news_section
SET is_pinned = true
WHERE id = (
  SELECT id 
  FROM news_section 
  WHERE NOT EXISTS (
    SELECT 1 
    FROM news_section 
    WHERE is_pinned = true
  )
  ORDER BY created_at DESC 
  LIMIT 1
);
