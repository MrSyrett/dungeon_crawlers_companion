"use client";

// SOLO PLAY — one solo campaign as a card, in the same tile look as the campaign
// and character cards (.roster-card; the parent carries data-sys="DB" or "SD").
// Part of the removable Solo Play feature — see SOLO-REMOVAL.md.
import type { SoloSummary } from "@/lib/solo";
import { deleteSoloCampaign } from "@/app/actions/solo";
import { ConfirmButton } from "../ConfirmButton";

export default function SoloCampaignCard({ s }: { s: SoloSummary }) {
  return (
    <div className="roster-card" id={`solo-${s.id}`}>
      <span className="roster-card-name">{s.name}</span>
      <span className="roster-card-meta">Solo · {s.module || "Solo campaign"}</span>
      <span className="roster-card-camp">
        {s.party.length > 1
          ? `Party: ${s.party.map((p) => p.name).join(", ")}`
          : s.character
            ? `Hero: ${s.character.name}`
            : "No heroes chosen yet"}
        {s.mission ? ` · ${s.mission}` : ""}
      </span>
      {s.progress ? <span className="roster-card-camp">{s.progress}</span> : null}
      <div className="roster-actions">
        {/* Plain <a>: /solo/… and /tools/… are route handlers serving standalone pages. */}
        <a href={`/solo/${s.id}`} className="roster-btn" title="Open the solo play screen">
          Continue
        </a>
        {s.character ? (
          <a href={`/tools/${s.system === "SD" ? "sd" : "db"}-character/${s.character.id}`} className="roster-btn" title={s.party.length > 1 ? `Open ${s.character.name}'s sheet` : "Open your hero's sheet"}>
            Sheet
          </a>
        ) : null}
        <form action={deleteSoloCampaign} className="contents">
          <input type="hidden" name="id" value={s.id} />
          <ConfirmButton
            message={`Delete the solo campaign "${s.name}"? Its progress and journal are lost. Your character is kept.`}
            className="roster-btn roster-btn-danger"
          >
            Delete
          </ConfirmButton>
        </form>
      </div>
    </div>
  );
}
