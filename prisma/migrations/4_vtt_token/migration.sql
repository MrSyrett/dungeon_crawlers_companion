-- Access tokens for virtual tabletops (Owlbear Rodeo). Scoped to the owner's
-- character sheets; only a hash of each token is stored.

-- CreateTable
CREATE TABLE "VttToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "VttToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VttToken_tokenHash_key" ON "VttToken"("tokenHash");

-- CreateIndex
CREATE INDEX "VttToken_userId_idx" ON "VttToken"("userId");

-- AddForeignKey
ALTER TABLE "VttToken" ADD CONSTRAINT "VttToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
