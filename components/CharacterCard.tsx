"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setSystem } from "./systemStore";
import { deleteDocument } from "@/app/actions/documents";
import { ConfirmButton } from "./ConfirmButton";
import type { CharCardData } from "@/lib/rosters";

// ONE CHARACTER CARD for both character lists — My Characters (every system) and
// a system's Characters page. Data comes from loadCharacterCards (lib/rosters.ts).
//
//   Name (opens the sheet) · its details (LV 3 · Fighter · Dwarf) · its campaign
//   [Sheet]  [VTT]  [Campaign | Link]  [Delete]
//
// It wears the system's identity (the .roster-card tile look in globals.css), so
// the caller must put it inside an element carrying data-sys.
//
// "Campaign" switches to the campaign's system and opens the Campaigns page at
// that campaign's card (#camp-<id>). "Link" asks for the join code and
// opens the sheet with ?join=<code> — the sheet's own Link flow does the joining
// (lib/inject.ts), exactly as the invite page does. One join path, not two.
//
// Plain <a> for the sheet and the VTT: both are route handlers serving whole
// standalone HTML pages, which <Link> would prefetch for nothing.
export default function CharacterCard({ c }: { c: CharCardData }) {
  const router = useRouter();
  const [linking, setLinking] = useState(false);
  const [code, setCode] = useState("");
  const sheet = `/tools/${c.tool}/${c.id}`;
  const okCode = /^[A-Z0-9]{4,12}$/.test(code);

  function openCampaign() {
    if (!c.campaign) return;
    setSystem(c.campaign.system);
    router.push(`/campaigns#camp-${c.campaign.id}`);
  }
  function join(e: React.FormEvent) {
    e.preventDefault();
    if (okCode) window.location.href = `${sheet}?join=${encodeURIComponent(code)}`;
  }

  return (
    <div className="roster-card" id={`char-${c.id}`}>
      <a href={sheet} className="roster-card-name roster-card-link" title={`Open ${c.name}'s sheet`}>
        {c.name}
      </a>
      {c.meta ? <span className="roster-card-meta">{c.meta}</span> : null}
      <span className="roster-card-camp">{c.campaign ? `Campaign: ${c.campaign.name}` : "No campaign"}</span>

      {linking ? (
        <form onSubmit={join} className="roster-link-form">
          <input
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12))}
            placeholder="Join code"
            aria-label="Campaign join code"
            className="roster-input"
          />
          <button className="roster-btn" disabled={!okCode} title="Open the sheet and link it to that campaign">
            Link
          </button>
          <button type="button" className="roster-btn" onClick={() => { setLinking(false); setCode(""); }}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="roster-actions">
          <a href={sheet} className="roster-btn" title={`Open ${c.name}'s sheet`}>
            Sheet
          </a>
          {c.vtt ? (
            <a
              href={c.vtt.href}
              {...(c.vtt.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              title={c.vtt.external ? "Open this campaign's OBR room in a new tab" : "Open this campaign's VTT"}
              className="roster-btn roster-btn-go"
            >
              {c.vtt.external ? "VTT ↗" : "VTT"}
            </a>
          ) : null}
          {c.campaign ? (
            <button type="button" className="roster-btn" onClick={openCampaign} title={`View ${c.campaign.name}`}>
              Campaign
            </button>
          ) : (
            <button
              type="button"
              className="roster-btn"
              onClick={() => setLinking(true)}
              title="Join a campaign with the code your GM gave you"
            >
              Link
            </button>
          )}
          <form action={deleteDocument} className="contents">
            <input type="hidden" name="id" value={c.id} />
            <ConfirmButton message={`Delete "${c.name}"? This cannot be undone.`} className="roster-btn roster-btn-danger">
              Delete
            </ConfirmButton>
          </form>
        </div>
      )}
    </div>
  );
}
