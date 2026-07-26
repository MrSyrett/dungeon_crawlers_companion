-- Rulebook access control. Files with no Rulebook row and no grants are private
-- (admin-only). everyone=true opens a file to all signed-in users; RulebookAccess
-- rows grant specific accounts.

-- CreateTable
CREATE TABLE "Rulebook" (
    "file" TEXT NOT NULL,
    "everyone" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rulebook_pkey" PRIMARY KEY ("file")
);

-- CreateTable
CREATE TABLE "RulebookAccess" (
    "file" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RulebookAccess_pkey" PRIMARY KEY ("file","userId")
);

-- CreateIndex
CREATE INDEX "RulebookAccess_userId_idx" ON "RulebookAccess"("userId");

-- CreateIndex
CREATE INDEX "RulebookAccess_file_idx" ON "RulebookAccess"("file");

-- AddForeignKey
ALTER TABLE "RulebookAccess" ADD CONSTRAINT "RulebookAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
