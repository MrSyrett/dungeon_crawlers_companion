-- Bring the Sound table up to the two-level taxonomy.
--
-- Background: migration 11_sound_library was edited in place across a few
-- iterations (category-only → `subsection` → `subcategory`). Because a migration
-- only runs once, databases that applied an earlier 11 never got the later
-- column. This migration reconciles every prior state WITHOUT touching 11:
--   • table has `subsection` (older naming)  → rename it to `subcategory`
--   • table has neither                       → add `subcategory`
--   • table already has `subcategory` (fresh) → both steps no-op
-- It is safe to run on a brand-new database (created by the current 11) too.

DO $$
BEGIN
  -- Old name → new name, preserving any data, when only the old column exists.
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Sound' AND column_name = 'subsection'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Sound' AND column_name = 'subcategory'
  ) THEN
    ALTER TABLE "Sound" RENAME COLUMN "subsection" TO "subcategory";
  END IF;

  -- Still missing (older category-only table) → add it.
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Sound' AND column_name = 'subcategory'
  ) THEN
    ALTER TABLE "Sound" ADD COLUMN "subcategory" TEXT NOT NULL DEFAULT '';
  END IF;
END $$;

-- Align the category default and the index with the current schema (idempotent).
ALTER TABLE "Sound" ALTER COLUMN "category" SET DEFAULT 'Music';
CREATE INDEX IF NOT EXISTS "Sound_category_subcategory_idx" ON "Sound"("category", "subcategory");
DROP INDEX IF EXISTS "Sound_category_idx";
DROP INDEX IF EXISTS "Sound_category_subsection_idx";
