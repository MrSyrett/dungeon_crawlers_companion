-- Remember a Sound Library track's old (Dropbox) URL when it moves into the bucket,
-- so saved boards and scenes that still hold the old link keep playing.
ALTER TABLE "Sound" ADD COLUMN IF NOT EXISTS "prevUrl" TEXT NOT NULL DEFAULT '';
