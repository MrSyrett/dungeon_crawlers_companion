"use client";

import type { CampCardData } from "@/lib/rosters";
import CopyCodeButton from "./CopyCodeButton";
import InviteLinkButton from "./InviteLinkButton";
import OpenGmScreenButton from "./OpenGmScreenButton";
import CampaignDialog from "./CampaignDialog";
import {
  clearCampaignRolls,
  deleteCampaign,
  renameCampaign,
  setCampaignVttUrl,
  regenerateCampaignCode,
  removeCampaignMember,
} from "@/app/actions/campaigns";

// ONE CAMPAIGN CARD for both campaign lists — My Campaigns (every system) and a
// system's Campaigns page. Data comes from loadCampaignCards (lib/rosters.ts).
//
// Everyone sees:   the name · the party (each character's details) · VTT · Sheet
//                  (your own character in it, when you have one)
// The GM also sees: the join code + Copy + Invite · each character as a link
//                  to open that player's sheet · GM Screen · Edit
//
// Players never get links to other players' sheets — only the campaign's owner
// may open those (docAccess in lib/campaign-member.ts), so a player is shown the
// party as names, not as buttons that would lead to "not found".
//
// Wears the system's identity (.roster-card in globals.css); the caller puts it
// inside an element carrying data-sys. id="camp-<id>" is what a Character
// card's "Campaign" button scrolls to.
export default function CampaignCard({ c }: { c: CampCardData }) {
  const gm = c.role === "gm";
  const others = c.party.length;
  return (
    <div className="roster-card" id={`camp-${c.id}`}>
      <span className="roster-card-name">{c.name}</span>
      <span className="roster-card-meta">
        {gm ? "Game Master" : "Player"} · {others} {others === 1 ? "character" : "characters"}
      </span>

      {gm ? (
        <span className="roster-code-row">
          <span className="roster-code" title="Join code — players type this into their sheet's Link">
            {c.code}
          </span>
          <CopyCodeButton value={c.code} label="join code" />
          <InviteLinkButton code={c.code} />
        </span>
      ) : null}

      {others ? (
        <ul className="roster-party">
          {c.party.map((m) => {
            const body = (
              <>
                <span className="roster-party-name">
                  {m.name}
                  {m.mine ? <span className="roster-party-you"> (you)</span> : null}
                </span>
                {m.meta ? <span className="roster-party-meta">{m.meta}</span> : null}
              </>
            );
            return (
              <li key={m.id}>
                {gm ? (
                  <a
                    href={`/tools/${m.tool}/${m.id}`}
                    target="_blank"
                    rel="noopener"
                    className="roster-party-row roster-party-link"
                    title={`Open ${m.name}'s sheet in a new tab to view or edit it`}
                  >
                    {body}
                    <span className="roster-party-open" aria-hidden="true">✎</span>
                  </a>
                ) : (
                  <span className="roster-party-row">{body}</span>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <span className="roster-card-camp roster-wrap">
          {gm ? "No characters linked yet — send your players the invite link." : "No characters linked yet."}
        </span>
      )}

      <div className="roster-actions">
        <a
          href={c.vtt.href}
          {...(c.vtt.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          title={c.vtt.external ? "Open this campaign's OBR room in a new tab" : "Open this campaign's VTT"}
          className="roster-btn roster-btn-go"
        >
          {c.vtt.external ? "VTT ↗" : "VTT"}
        </a>
        {c.mySheet ? (
          <a href={`/tools/${c.mySheet.tool}/${c.mySheet.id}`} className="roster-btn" title="Open your character's sheet">
            Sheet
          </a>
        ) : null}
        {gm ? (
          <>
            <OpenGmScreenButton
              campaign={{ id: c.id, name: c.name, code: c.code, system: c.system, vttUrl: c.vttUrl }}
              className="roster-btn"
            />
            <CampaignDialog
              mode="edit"
              id={c.id}
              name={c.name}
              code={c.code}
              vttUrl={c.vttUrl}
              rolls={c.rolls}
              party={c.party.map((m) => ({ id: m.id, name: m.name }))}
              rename={renameCampaign}
              setVttUrl={setCampaignVttUrl}
              remove={deleteCampaign}
              clearRolls={clearCampaignRolls}
              regenerateCode={regenerateCampaignCode}
              removeMember={removeCampaignMember}
              className="roster-btn"
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
