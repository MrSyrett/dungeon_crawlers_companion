-- Registration approval gate. New accounts must be approved by an admin before
-- they can sign in. The column defaults to false so anyone who signs up after
-- this deploy is gated, but every account that already exists is backfilled to
-- true here so current members (and admins) aren't locked out.

-- AlterTable: add the column with a default for new rows.
ALTER TABLE "User" ADD COLUMN "approved" BOOLEAN NOT NULL DEFAULT false;

-- Backfill: everyone who registered before this migration keeps their access.
UPDATE "User" SET "approved" = true;
