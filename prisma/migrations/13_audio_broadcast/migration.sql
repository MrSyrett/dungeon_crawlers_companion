-- Audio broadcast: the GM streams the GM-screen's mixed audio to a campaign's
-- players over a WebRTC mesh. Two pieces are added here.
--
-- 1. Campaign.audioBroadcastAt — a liveness heartbeat. The GM bumps it every few
--    seconds while streaming; a player's extension treats the campaign as "live"
--    only if it was bumped within the last ~20s. Null / stale = nobody live.
--
-- 2. SignalMessage — the WebRTC signaling channel (SDP offers/answers + trickled
--    ICE candidates), campaign-scoped and polled by ascending id exactly like
--    CampaignRoll. Rows are ephemeral and pruned aggressively.

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN "audioBroadcastAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "SignalMessage" (
    "id" SERIAL NOT NULL,
    "campaignId" TEXT NOT NULL,
    "fromKey" TEXT NOT NULL,
    "toKey" TEXT,
    "kind" TEXT NOT NULL,
    "payload" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SignalMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SignalMessage_campaignId_id_idx" ON "SignalMessage"("campaignId", "id");

-- AddForeignKey
ALTER TABLE "SignalMessage" ADD CONSTRAINT "SignalMessage_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
