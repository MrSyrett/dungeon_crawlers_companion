-- Sound library: a shared, admin-managed shelf of labeled audio URLs the GM
-- Screen Music tool's "Library" picker pulls from, so a track's direct link is
-- saved once (label + category + subcategory) instead of re-pasted every session.
-- Not user-scoped — one library the whole table draws from; only admins can read
-- or edit it (enforced in the app, not the DB).
--
-- Two-level taxonomy: `category` is the kind of audio (Ambiance | Music |
-- Scenes); `subcategory` is the Location it depicts or Mood it evokes. `label`
-- is the track's display Name.

-- CreateTable
CREATE TABLE "Sound" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Music',
    "subcategory" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sound_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Sound_category_subcategory_idx" ON "Sound"("category", "subcategory");
