-- The game system a campaign runs (a SystemKey like "SD" | "DCC" | …). Drives
-- the GM Screen's system automatically when the board is linked.
-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN "system" TEXT;
