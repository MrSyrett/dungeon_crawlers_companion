-- Per-campaign GM Screen boards: scope a "gm-screen" Document to a campaign.
-- campaignId is nullable (NULL = the personal / unlinked board). Existing rows
-- (character sheets, session prep) keep NULL and are unaffected.

-- AlterTable
ALTER TABLE "Document" ADD COLUMN "campaignId" TEXT;

-- The old (userId, tool) index is superseded by the two composite indexes below,
-- both of which keep (userId, tool) as a usable prefix.
-- DropIndex
DROP INDEX "Document_userId_tool_idx";

-- CreateIndex
CREATE INDEX "Document_userId_tool_campaignId_idx" ON "Document"("userId", "tool", "campaignId");

-- CreateIndex
CREATE INDEX "Document_userId_tool_updatedAt_idx" ON "Document"("userId", "tool", "updatedAt");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
