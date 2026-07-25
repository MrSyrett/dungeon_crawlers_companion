-- CreateTable
CREATE TABLE "Homebrew" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "campaignId" TEXT,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Homebrew_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Homebrew_ownerId_idx" ON "Homebrew"("ownerId");

-- CreateIndex
CREATE INDEX "Homebrew_campaignId_idx" ON "Homebrew"("campaignId");

-- AddForeignKey
ALTER TABLE "Homebrew" ADD CONSTRAINT "Homebrew_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Homebrew" ADD CONSTRAINT "Homebrew_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
