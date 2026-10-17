-- Index campaigns by owner. Campaigns are listed by ownerId on every visit to
-- the Campaigns page and My Campaigns, and with no index that was a scan of the
-- whole table. (Named to sort after "9_sheet_linked_campaign" — migrations run
-- in folder-name order.)
CREATE INDEX IF NOT EXISTS "Campaign_ownerId_idx" ON "Campaign"("ownerId");
