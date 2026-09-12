/**
 * REVOLT LC — COLLEGE LINK REGISTRY
 *
 * One place that maps a college name to its official page, so a school
 * mentioned in three different sections (a commitment, a coach's résumé,
 * a tournament pitch) links to the same URL from all three.
 *
 * ─── HOW TO ADD OR CHANGE A LINK ────────────────────────────────
 * Set `href` on the entry below. An entry with an empty `href` renders
 * as plain text — exactly what the site did before — so a school we
 * don't have a URL for is never a broken link. Nothing else to update:
 * every mention on the site reads from this list.
 *
 * Prefer the school's own men's lacrosse page over a generic homepage —
 * a recruit clicking through wants the program, not the admissions site.
 * ────────────────────────────────────────────────────────────────
 *
 * `aliases` catches the shorter forms that appear in running prose
 * ('Trine' for 'Trine University'). Names and aliases are matched
 * whole-word only.
 */
export type College = {
  /** Exactly as written in alumni.ts / coaches.ts. */
  name: string;
  /** Official page. Empty string = no link yet; renders as plain text. */
  href: string;
  /** Other forms of the name used in prose on the site. */
  aliases?: string[];
};

export const colleges: College[] = [
  // ── Alumni commitments (src/data/alumni.ts) ──
  { name: 'Indiana Tech',        href: 'https://indianatechwarriors.com/sports/mens-lacrosse', aliases: ['Indiana Institute of Technology'] },
  { name: 'Northwood University', href: 'https://www.gonorthwood.com/sports/mlax/index', aliases: ['Northwood'] },
  { name: 'Taylor University',   href: 'https://taylortrojans.com/sports/mlax/index' },
  { name: 'Point Park University', href: 'https://pointparksports.com/sports/mens-lacrosse', aliases: ['Point Park'] },
  { name: 'Trine University',    href: 'https://trinethunder.com/sports/mens-lacrosse', aliases: ['Trine'] },

  // ── Alumni commitment + Mitchell Wilkins' current post ──
  { name: 'Edgewood University', href: 'https://edgewoodeagles.com/sports/mens-lacrosse', aliases: ['Edgewood College', 'Edgewood'] },

  // ── Recruiting coaches named in the Chicago Showdown pitch ──
  { name: 'Marquette',           href: 'https://gomarquette.com/sports/mens-lacrosse', aliases: ['Marquette University'] },
];

/** Every spelling of a school, longest first so 'Trine University' wins over 'Trine'. */
const index: [needle: string, college: College][] = colleges
  .flatMap((c) => [c.name, ...(c.aliases ?? [])].map((n) => [n, c] as [string, College]))
  .sort((a, b) => b[0].length - a[0].length);

/** The official page for a school, or undefined if we don't have one yet. */
export const collegeHref = (name: string): string | undefined => {
  const hit = index.find(([n]) => n.toLowerCase() === name.trim().toLowerCase());
  return hit?.[1].href || undefined;
};

/** True when a college name is worth wrapping in an anchor. */
export const isLinked = (name: string): boolean => Boolean(collegeHref(name));

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Links every known college inside a sentence of prose.
 *
 * Escapes first, then substitutes in ONE pass — so a school name that
 * happens to sit inside a URL we just inserted can't be linked twice.
 * Returns HTML; render it with `set:html`.
 */
export const linkColleges = (text: string): string => {
  const linkable = index.filter(([, c]) => c.href);
  if (!linkable.length) return escapeHtml(text);

  const pattern = new RegExp(`\\b(${linkable.map(([n]) => escapeRe(n)).join('|')})\\b`, 'g');

  return escapeHtml(text).replace(pattern, (match) => {
    const href = collegeHref(match);
    if (!href) return match;
    return `<a class="clink" href="${href}" target="_blank" rel="noopener">${match}</a>`;
  });
};
