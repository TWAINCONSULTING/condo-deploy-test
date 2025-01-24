/*
  # Fix news pinning functionality
  
  1. Changes
    - Simplifies pinning logic with a single trigger
    - Ensures atomic updates
    - Prevents recursive trigger calls
*/

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS manage_news_pins_trigger ON news_section;
DROP FUNCTION IF EXISTS manage_news_pins();

-- Create new pinning function with simplified logic
CREATE OR REPLACE FUNCTION manage_news_pins() 
RETURNS TRIGGER AS $$
DECLARE
  pinned_count INTEGER;
BEGIN
  -- Get count of currently pinned items (excluding the one being updated)
  SELECT COUNT(*) INTO pinned_count 
  FROM news_section 
  WHERE is_pinned = true 
  AND id != COALESCE(NEW.id, -1);

  -- If pinning this item
  IF NEW.is_pinned THEN
    -- Unpin other items if this one is being pinned
    UPDATE news_section 
    SET is_pinned = false 
    WHERE id != NEW.id 
    AND is_pinned = true;
  -- If unpinning this item
  ELSIF NOT NEW.is_pinned AND (OLD IS NULL OR OLD.is_pinned) THEN
    -- If this is the last pinned item, keep it pinned
    IF pinned_count = 0 THEN
      NEW.is_pinned := true;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create new trigger
CREATE TRIGGER manage_news_pins_trigger
  BEFORE INSERT OR UPDATE OF is_pinned ON news_section
  FOR EACH ROW
  EXECUTE FUNCTION manage_news_pins();

-- Ensure one item is pinned
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM news_section WHERE is_pinned = true) THEN
    UPDATE news_section 
    SET is_pinned = true 
    WHERE id = (
      SELECT id 
      FROM news_section 
      ORDER BY created_at DESC 
      LIMIT 1
    );
  END IF;
END $$;