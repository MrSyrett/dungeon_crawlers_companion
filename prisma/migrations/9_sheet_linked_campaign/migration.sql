-- Promote the character-sheet → campaign link out of the sheet JSON
-- (data.sd_sheet → _sheet.campaign.id) into an indexed column, so the party
-- roster and campaign-membership lookups become index scans instead of
-- full-table string_contains scans + JSON.parse.
--
-- Only "sd-character" docs use this column. Deleting a campaign nulls the link
-- (ON DELETE SET NULL) so a player's character is unlinked, not deleted — unlike
-- the existing gm-screen "campaignId" column, whose board is owned by the
-- campaign and cascades.

-- AlterTable
ALTER TABLE "Document" ADD COLUMN "linkedCampaignId" TEXT;

-- CreateIndex
CREATE INDEX "Document_tool_linkedCampaignId_idx" ON "Document"("tool", "linkedCampaignId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_linkedCampaignId_fkey" FOREIGN KEY ("linkedCampaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
