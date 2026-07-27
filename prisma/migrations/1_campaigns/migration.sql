-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'New Campaign',
    "code" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignRoll" (
    "id" SERIAL NOT NULL,
    "campaignId" TEXT NOT NULL,
    "clientKey" TEXT NOT NULL DEFAULT '',
    "source" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "detail" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL DEFAULT 'normal',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampaignRoll_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_code_key" ON "Campaign"("code");

-- CreateIndex
CREATE INDEX "CampaignRoll_campaignId_id_idx" ON "CampaignRoll"("campaignId", "id");

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignRoll" ADD CONSTRAINT "CampaignRoll_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
