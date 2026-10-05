"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { generateToken, hashToken } from "@/lib/vtt";

// ONE access code at a time, in the Owlbear Rodeo section of /account.
//
// This used to back a /vtt page that listed one code per device, each with its
// own label and Revoke button. Owlbear is the backup tabletop rather than the
// daily one, so that page collapsed into three rows on the Account page and the
// codes collapsed into a single one.
//
// The code is stored in plain form as well as hashed (see VttToken in
// prisma/schema.prisma), which is what lets the page render it whenever you look
// rather than handing it back exactly once through a `?new=` redirect param, the
// way this did before. That round-trip went with the page.

export async function createVttToken(): Promise<void> {
  const user = await getCurrentUser();
  if (!user) return;

  // Refuse to add a second one. Without this, a double-clicked Generate button
  // or a stale tab submitting again leaves an extra active code that the UI,
  // showing only the newest, would never surface again.
  const existing = await prisma.vttToken.findFirst({
    where: { userId: user.id, revokedAt: null },
    select: { id: true },
  });
  if (existing) {
    revalidatePath("/account");
    return;
  }

  const raw = generateToken();

  await prisma.vttToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(raw),
      token: raw,
      prefix: raw.slice(0, 6),
      // Labels were how per-device codes were told apart. There is only one code
      // now, but the column is required, so it gets a constant.
      label: "OBR",
    },
  });

  revalidatePath("/account");
}

// Revokes EVERY active code, not only the newest.
//
// The UI shows one code. An account from before this change can still carry
// several, and those extras would otherwise keep working with nothing anywhere
// able to show or revoke them — the one way "one code at a time" could quietly
// stop being true. Revoking all of them means the empty state is honestly empty.
export async function revokeVttToken(): Promise<void> {
  const user = await getCurrentUser();
  if (!user) return;

  await prisma.vttToken.updateMany({
    where: { userId: user.id, revokedAt: null },
    data: { revokedAt: new Date() },
  });

  revalidatePath("/account");
}
