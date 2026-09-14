-- Site-wide system visibility. One row per game system hidden from the homepage
-- system switcher. A system with no row is visible (the default), so this table
-- only holds hidden systems. Display-only — it does not block a system's routes.

-- CreateTable
CREATE TABLE "SystemSetting" (
    "key" TEXT NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("key")
);
