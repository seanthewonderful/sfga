-- Add published column and sync it with status
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT false;
-- Update published column based on status
UPDATE blog_posts
SET published = (status = 'published');
-- Add trigger to keep published and status in sync
CREATE OR REPLACE FUNCTION sync_published_status() RETURNS TRIGGER AS $$ BEGIN IF TG_OP = 'UPDATE' THEN IF NEW.status = 'published' THEN NEW.published = true;
ELSE NEW.published = false;
END IF;
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER sync_published_status_trigger BEFORE
UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION sync_published_status();