"use client";

import { useRouter } from "next/navigation";
import OpenGmScreenButton from "./OpenGmScreenButton";
import { setSystem, type SystemKey } from "./systemStore";

// The buttons on a My Campaigns card (app/my-campaigns/page.tsx).
//   GM (you own it):   GM Screen · VTT · Manage
//   Player (joined):   Sheet · VTT
// "Manage" switches to the campaign's system and opens the per-system Campaigns
// page, where the join code, invite link and Edit dialog live — the card itself
// stays a summary rather than duplicating that page.
//
// Plain <a> for the sheet and the VTT: both are route handlers serving
// standalone HTML, so <Link> would prefetch a whole document for nothing. An
// Owlbear room is external, hence the new tab.
export default function CampaignCardActions({
  role,
  campaign,
  sheet,
}: {
  role: "gm" | "player";
  campaign: { id: string; name: string; code: string; system: SystemKey; vttUrl: string | null };
  sheet?: { tool: string; id: string } | null;
}) {
  const router = useRouter();
  const vtt = campaign.vttUrl ?? `/play/${campaign.id}`;
  const external = !!campaign.vttUrl;
  return (
    <div className="roster-actions">
      {role === "gm" ? (
        <OpenGmScreenButton campaign={campaign} className="roster-btn" />
      ) : sheet ? (
        <a href={`/tools/${sheet.tool}/${sheet.id}`} className="roster-btn">Sheet</a>
      ) : null}
      <a
        href={vtt}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        title={external ? "Open this campaign's OBR room in a new tab" : "Open this campaign's VTT"}
        className="roster-btn"
      >
        {external ? "VTT ↗" : "VTT"}
      </a>
      {role === "gm" ? (
        <button
          type="button"
          className="roster-btn"
          title="Join code, invite link and settings for this campaign"
          onClick={() => {
            setSystem(campaign.system);
            router.push("/campaigns");
          }}
        >
          Manage
        </button>
      ) : null}
    </div>
  );
}
