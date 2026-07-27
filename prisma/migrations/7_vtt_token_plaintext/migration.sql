-- Store the VTT access code in plain form so the VTT page can show it again.
-- Nullable: existing codes stay hash-only (null here) and can be revoked/remade.
-- Trade-off: a leaked DB now exposes usable codes, each limited to read + save
-- on its owner's character sheets.

-- AlterTable
ALTER TABLE "VttToken" ADD COLUMN "token" TEXT;
