import type { SystemKey } from "./systemStore";

// The game heading on the My Characters and My Campaigns pages: the system's
// name in its own face and colour (.roster-sys-name in app/globals.css, which
// reads the [data-sys] identity tokens the home page's game tiles use), followed
// by a divider line. The caller wraps it in a .roster-sys section carrying
// data-sys.
//
// Two-colour wordmarks are split into the pieces the stylesheet colours
// (.tn-1 / .tn-2); the parts must spell the system's own name exactly. The label
// is wrapped so the flex divider (::after) doesn't gap-space the halves apart.
const NAME_PARTS: Partial<Record<SystemKey, [string, string]>> = {
  DCC: ["Dungeon", "Crawler Carl"],
};

export default function RosterSysName({ system, name }: { system: SystemKey; name: string }) {
  const parts = NAME_PARTS[system];
  return (
    <h2 className="roster-sys-name">
      <span className="roster-sys-label">
        {parts ? (
          <>
            <span className="tn-1">{parts[0]}</span> <span className="tn-2">{parts[1]}</span>
          </>
        ) : (
          name
        )}
      </span>
    </h2>
  );
}
