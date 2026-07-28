-- Sound library: a shared, admin-managed shelf of labeled audio URLs the GM
-- Screen Music tool's "Library" picker pulls from, so a track's direct link is
-- saved once (label + category) instead of re-pasted every session. Not
-- user-scoped — one library the whole table draws from; only admins can read or
-- edit it (enforced in the app, not the DB).

-- CreateTable
CREATE TABLE "Sound" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Uncategorized',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sound_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Sound_category_idx" ON "Sound"("category");
