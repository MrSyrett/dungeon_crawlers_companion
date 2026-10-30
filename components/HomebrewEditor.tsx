"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Homebrew editor dispatcher. Every system that uses <HomebrewEditor kind=…/>
// now has its own builder shell under components/hb/<sys>/ (one accordion per
// kind: list + builder + live preview + campaign sharing). This file only routes
// a kind to its system's shell by prefix, so no system's rules live here.
// Shadowdark (HomebrewManager), DCC (DccHomebrewEditor) and D&D
// (DndHomebrewEditor) are mounted directly by their pages.
// ─────────────────────────────────────────────────────────────────────────────
import type { ReactElement } from "react";
import NimbleHomebrewEditor from "@/components/hb/nimble/NimbleHomebrewEditor";
import LotrHomebrewEditor from "@/components/hb/lotr/LotrHomebrewEditor";
import PbHomebrewEditor from "@/components/hb/pb/PbHomebrewEditor";
import IcrpgHomebrewEditor from "@/components/hb/icrpg/IcrpgHomebrewEditor";
import DbHomebrewEditor from "@/components/hb/db/DbHomebrewEditor";
import SwHomebrewEditor from "@/components/hb/sw/SwHomebrewEditor";
import AceHomebrewEditor from "@/components/hb/ace/AceHomebrewEditor";
import KobHomebrewEditor from "@/components/hb/kob/KobHomebrewEditor";
import D62eHomebrewEditor from "@/components/hb/d62e/D62eHomebrewEditor";
import CoHomebrewEditor from "@/components/hb/co/CoHomebrewEditor";
import YzeHomebrewEditor from "@/components/hb/yze/YzeHomebrewEditor";
import TwdHomebrewEditor from "@/components/hb/twd/TwdHomebrewEditor";
import MyzHomebrewEditor from "@/components/hb/myz/MyzHomebrewEditor";
import VaeHomebrewEditor from "@/components/hb/vae/VaeHomebrewEditor";
import MmrpgHomebrewEditor from "@/components/hb/mmrpg/MmrpgHomebrewEditor";

export type CampaignRef = { id: string; name: string; code: string; system?: string | null };
export type HomebrewRecord = {
  id: string;
  type: string;
  name: string;
  campaignIds: string[];
  data: Record<string, unknown>;
  updatedAt: string;
  owner: boolean;
};

type EditorProps = { kind: string; campaigns: CampaignRef[]; initial: HomebrewRecord[] };
type Shell = (p: EditorProps) => ReactElement | null;

const SHELLS: [prefix: string, shell: Shell][] = [
  ["nimble-", NimbleHomebrewEditor], ["lotr-", LotrHomebrewEditor], ["pb-", PbHomebrewEditor],
  ["icrpg-", IcrpgHomebrewEditor], ["db-", DbHomebrewEditor], ["sw-", SwHomebrewEditor],
  ["ace-", AceHomebrewEditor], ["kob-", KobHomebrewEditor], ["d62e-", D62eHomebrewEditor],
  ["co-", CoHomebrewEditor], ["yze-", YzeHomebrewEditor], ["twd-", TwdHomebrewEditor],
  ["myz-", MyzHomebrewEditor], ["vae-", VaeHomebrewEditor], ["mmrpg-", MmrpgHomebrewEditor],
];

export default function HomebrewEditor(props: EditorProps) {
  const Shell = SHELLS.find(([p]) => props.kind.startsWith(p))?.[1];
  return Shell ? <Shell {...props} /> : null;
}
