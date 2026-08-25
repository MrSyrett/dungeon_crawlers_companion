-- Which game system's Rulebooks list shows each file: 'SD', 'DCC', or 'BOTH'.
-- Display-only (the /rules list hides non-matching books behind the system
-- toggle); access control is unchanged. Existing rows default to BOTH so
-- nothing disappears until an admin assigns a system.

-- AlterTable
ALTER TABLE "Rulebook" ADD COLUMN "system" TEXT NOT NULL DEFAULT 'BOTH';
