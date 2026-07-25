-- Homebrew sharing moves from a single nullable campaignId to a many-to-many
-- join table, so one entry can be shared with several campaigns at once.

-- CreateTable
CREATE TABLE "HomebrewShare" (
    "homebrewId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,

    CONSTRAINT "HomebrewShare_pkey" PRIMARY KEY ("homebrewId","campaignId")
);

-- CreateIndex
CREATE INDEX "HomebrewShare_campaignId_idx" ON "HomebrewShare"("campaignId");

-- Carry any existing single-campaign shares over to the join table.
INSERT INTO "HomebrewShare" ("homebrewId", "campaignId")
SELECT "id", "campaignId" FROM "Homebrew" WHERE "campaignId" IS NOT NULL;

-- Retire the old column
ALTER TABLE "Homebrew" DROP CONSTRAINT IF EXISTS "Homebrew_campaignId_fkey";
DROP INDEX IF EXISTS "Homebrew_campaignId_idx";
ALTER TABLE "Homebrew" DROP COLUMN "campaignId";

-- AddForeignKey
ALTER TABLE "HomebrewShare" ADD CONSTRAINT "HomebrewShare_homebrewId_fkey" FOREIGN KEY ("homebrewId") REFERENCES "Homebrew"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomebrewShare" ADD CONSTRAINT "HomebrewShare_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
