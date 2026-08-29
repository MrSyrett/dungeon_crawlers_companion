import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ACE_SETTINGS } from "@/lib/data/ace-settings";
import { ACE_ROLES } from "@/lib/data/ace-roles";
import { ACE_EXTRAS } from "@/lib/data/ace-extras";
import { ACE_GEAR } from "@/lib/data/ace-gear";
import { ACE_PREGENS } from "@/lib/data/ace-pregens";
import { ACE_TABLES } from "@/lib/data/ace-tables";
import { AceHeader, cardCls, chipBase, chipOff } from "@/components/AceRef";

export const dynamic = "force-dynamic";

// One page for the whole omnibus: the core quick rules, then each setting's
// pitch, its rule tweaks, and links into the filtered reference pages.
export default async function AceSettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const count = (key: string) => ({
    roles: ACE_ROLES.filter((r) => r.setting === key).length,
    extras: ACE_EXTRAS.filter((e) => e.setting === key).length,
    gear: ACE_GEAR.filter((g) => g.setting === key).length,
    pregens: ACE_PREGENS.filter((p) => p.setting === key).length,
  });

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <AceHeader title="Settings & Rules" subtitle={`${ACE_SETTINGS.length} genre settings · one engine`} />
      <p className="mb-6 text-sm leading-relaxed text-[var(--muted)]">
        The Awfully Cheerful Engine is one small ruleset that hops genres: ghost hunters, artefact hunters,
        starship crews, dungeon delvers, waste warriors, monster hunters and cartoon animals all use the
        same four Stats, one Focus each, a Role, a Trait and a pile of Karma. Each setting below adds its
        own Roles, gear and a few rule tweaks.
      </p>

      <section className={`${cardCls} mb-8`}>
        <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#8ad4ff]">Quick rules</h2>
        <dl className="mt-3 grid gap-x-6 gap-y-3 md:grid-cols-2">
          {ACE_TABLES.quickRules.map((r) => (
            <div key={r.title}>
              <dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text)]">{r.title}</dt>
              <dd className="mt-0.5 text-[12px] leading-relaxed text-[var(--muted)]">{r.text}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <table className="w-full text-[12px]">
            <thead><tr className="text-left text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]"><th className="py-1">Difficulty</th><th className="py-1">TN</th><th className="py-1">Examples</th></tr></thead>
            <tbody>{ACE_TABLES.difficulties.map((d) => (
              <tr key={d.name} className="border-t border-[var(--border)]"><td className="py-1 text-[var(--text)]">{d.name}</td><td className="py-1 font-mono text-[#8ad4ff]">{d.tn ?? "—"}</td><td className="py-1 text-[var(--muted)]">{d.examples}</td></tr>
            ))}</tbody>
          </table>
          <table className="w-full text-[12px]">
            <thead><tr className="text-left text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]"><th className="py-1">Karma</th><th className="py-1">Use</th></tr></thead>
            <tbody>{ACE_TABLES.karmaUses.map((k) => (
              <tr key={k.name} className="border-t border-[var(--border)]"><td className="py-1 align-top text-[var(--text)]">{k.name}</td><td className="py-1 text-[var(--muted)]">{k.text}</td></tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <ul className="flex flex-col gap-4">
        {ACE_SETTINGS.map((s) => {
          const c = count(s.key);
          return (
            <li key={s.key} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-lg font-bold uppercase tracking-[0.12em] text-[#8ad4ff]">{s.name}</h2>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{s.tagline} · pp.{s.pages[0]}–{s.pages[1]}{s.usesPower ? " · uses Power" : ""}</span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{s.blurb}</p>
              {s.recommendedRoles.length ? (
                <p className="mt-2 text-[12px] text-[var(--muted)]">
                  <span className="font-semibold uppercase tracking-[0.08em] text-[var(--text)]">Recommended Roles:</span> {s.recommendedRoles.join(", ")}
                </p>
              ) : null}
              <ul className="mt-3 flex flex-col gap-1">
                {s.rules.map((r, i) => (
                  <li key={i} className="flex gap-2 text-[12px] leading-relaxed text-[var(--muted)]">
                    <span className="mt-[2px] shrink-0 text-[var(--ace)]">▸</span><span>{r}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.roles ? <Link href={`/ace/roles?book=${s.key}`} className={`${chipBase} ${chipOff}`}>{c.roles} roles</Link> : null}
                {c.gear ? <Link href={`/ace/gear?book=${s.key}`} className={`${chipBase} ${chipOff}`}>{c.gear} gear</Link> : null}
                {c.extras ? <Link href={`/ace/extras?book=${s.key}`} className={`${chipBase} ${chipOff}`}>{c.extras} extras</Link> : null}
                {c.pregens ? <span className={`${chipBase} border-[var(--border)] text-[var(--muted)]`}>{c.pregens} pregens (in the Hero Builder)</span> : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
