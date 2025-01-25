/*
  # Add contact requests table
  
  1. New Tables
    - `contact_requests`
      - `id` (uuid, primary key)
      - `email` (text, not null)
      - `status` (text, not null, default 'new')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS
    - Add policy for anonymous inserts
    - Add policy for board members to read
*/

-- Create contact_requests table
CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow insert for all" ON contact_requests
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow board members to read" ON contact_requests
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = 'board'
  ));

-- Add comment
COMMENT ON TABLE contact_requests IS 'Stores contact form submissions from potential customers';
