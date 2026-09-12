/**
 * REVOLT LC — PROGRAMS DATA (2027 season)
 *
 * ─── HOW TO CHANGE WHICH PROGRAM LEADS ──────────────────────────
 * Set `featured: true` on exactly ONE program. That program renders
 * as the wide hero card (gold frame, larger type, "PRIMARY" flag)
 * and its bar on the season spine is highlighted. Cards render in
 * array order, so this controls emphasis, not position.
 * ────────────────────────────────────────────────────────────────
 *
 * Two rosters: one box team in January, one field team across the
 * summer. Every tournament fact below is taken from that event's own
 * listing — `href` is the source. Nothing here is estimated.
 *
 * NOT YET SUPPLIED by the club: age/grad-year groups, roster sizes,
 * training schedule, and pricing. Those fields are deliberately absent
 * rather than guessed.
 */

import type { ImageMetadata } from 'astro';

// Event logos, supplied by the club. Each is keyed to its tournament below so
// the mark travels with the event rather than with its position in the list.
import glbxLogo from '../assets/tournaments/great-lax-box-classic.png';
import mbiLogo  from '../assets/tournaments/michigan-box-invitational.png';
import glbcLogo from '../assets/tournaments/great-lax-bay-classic.png';
import pipeLogo from '../assets/tournaments/pipe-city-festival.png';
import showLogo from '../assets/tournaments/chicago-showdown.png';

export type Tournament = {
  name: string;
  /** Display range, e.g. 'Jan 23–24'. */
  month: string;
  days: string;
  /** First and last day, ISO. Drives the calendar export, so the .ics can
      never drift from the display range above. Both days inclusive. */
  start: string;
  end: string;
  city: string;
  venue: string;
  /** The sell — why this weekend is worth the drive. */
  pitch: string;
  /** Short verifiable credentials, from the event listing. */
  facts: string[];
  /** Official event page — the source for everything above. */
  href: string;
  /** The event's own logo, as supplied by the club. */
  logo: ImageMetadata;
};

export type Program = {
  id: string;
  index: string;
  name: string;
  season: 'SUMMER' | 'INDOOR';
  format: string;
  /** Months this team competes (1 = Jan). Drives the season spine. */
  months: number[];
  window: string;
  blurb: string;
  tournaments: Tournament[];
  cta: string;
  /** Where the card's CTA goes. Points at /signup with this program
      preselected, so the id in the query string must match `id` above. */
  href: string;
  featured?: boolean;
};

export const seasons = {
  INDOOR: { label: 'Box / Indoor', color: 'var(--slate)' },
  SUMMER: { label: 'Summer Field', color: 'var(--gold)' },
} as const;

export const programs: Program[] = [
  {
    id: 'box-travel',
    index: '001',
    name: 'Box Travel Team',
    season: 'INDOOR',
    format: 'Box · 6v6 · Rink',
    months: [1],
    window: 'January 2027',
    blurb:
      'One roster, two tournaments, both in Michigan in January. Box is 6v6 inside a rink: less space, faster hands and far more touches per possession than the field game allows. It is the most efficient way to keep a stick in your player’s hands through the winter.',
    tournaments: [
      {
        name: 'Great Lax Box Classic',
        month: 'Jan',
        days: '23–24',
        start: '2027-01-23',
        end: '2027-01-24',
        city: 'Canton, MI',
        venue: 'High Velocity Sports',
        pitch:
          'Trilogy bills this as the premier box event in the Midwest, and the format backs it up: three turf rinks starting 8am, four guaranteed games before playoffs, and benches with two doors so lines change on the fly the way box is meant to be played.',
        facts: ['3 turf rinks', '4 games + playoffs', '3 × 12-min periods'],
        href: 'https://trilogylacrosse.com/events/great-lax-box-classic/',
        logo: glbxLogo,
      },
      {
        name: 'Michigan Box Invitational',
        month: 'Jan',
        days: '30–31',
        start: '2027-01-30',
        end: '2027-01-31',
        city: 'Novi, MI',
        venue: 'Total Sports Novi — East',
        pitch:
          'A week later and a harder draw. The Novi invitational pulls box programs from Illinois and across the Midwest under one roof, with an HS Elite bracket at the top and a four-game minimum for every team entered.',
        facts: ['4-game minimum', 'HS Elite bracket', 'Midwest field'],
        href: 'https://teamillinoislax.com/events/michigan-box-lacrosse-invitational/',
        logo: mbiLogo,
      },
    ],
    cta: 'Register for the box roster',
    href: '/signup?program=box-travel',
  },
  {
    id: 'summer-travel',
    index: '002',
    name: 'Summer Travel Team',
    season: 'SUMMER',
    format: 'Field · Travel Circuit',
    months: [6, 7],
    window: 'June — July 2027',
    blurb:
      'One roster from June through July, three tournaments across Michigan and Illinois. All three are recruiting weekends — college coaches working the sidelines at every stop, and game film included at Saginaw.',
    tournaments: [
      {
        name: 'Great Lax Bay Classic',
        month: 'Jun',
        days: '19–20',
        start: '2027-06-19',
        end: '2027-06-20',
        city: 'Saginaw, MI',
        venue: 'STSA Athletic Complex',
        pitch:
          'The top Michigan tournament destination for over a decade, spread across 21 grass fields. High school game film is included at no cost through Next Level Video, and Event Beacon puts your player’s roster and profile in front of coaches evaluating from the sideline.',
        facts: ['21 grass fields', 'Free HS game film', 'Coach sideline access'],
        href: 'https://trilogylacrosse.com/events/great-lax-bay-classic/',
        logo: glbcLogo,
      },
      {
        name: 'Pipe City Lacrosse Festival',
        month: 'Jul',
        days: '10–11',
        start: '2027-07-10',
        end: '2027-07-11',
        city: 'Vernon Hills, IL',
        venue: 'Vernon Hills Athletic Complex',
        pitch:
          'The largest single-site summer tournament in the country — roughly 600 games and over 6,000 athletes across 24 fields. High school divisions draw premium field placement, which is where the 75+ college coaches on site spend their weekend.',
        facts: ['75+ college coaches', '24 fields', '4-game guarantee'],
        href: 'https://www.lacrosseamerica.com/site/register/register?EventID=16598',
        logo: pipeLogo,
      },
      {
        name: 'Chicago Showdown',
        month: 'Jul',
        days: '17–18',
        start: '2027-07-17',
        end: '2027-07-18',
        city: 'Elgin, IL',
        venue: 'Elgin Sports Park',
        pitch:
          'Victory Event Series closes the summer with a straight recruiting weekend: pool play into brackets, four games minimum. The 2025 edition drew coaches from 16 programs, Marquette among them.',
        facts: ['16 programs in 2025', 'Pool → bracket', '4 games minimum'],
        href: 'https://victoryeventseries.com/event/chicago-showdown/',
        logo: showLogo,
      },
    ],
    cta: 'Register for the summer roster',
    href: '/signup?program=summer-travel',
    featured: true,
  },
];

/** Derived from the schedule so the cards can never drift from the calendar. */
export const specsFor = (p: Program) => [
  { k: 'Tournaments', v: String(p.tournaments.length).padStart(2, '0') },
  { k: 'Window', v: p.window },
  {
    k: 'Travel',
    v: [...new Set(p.tournaments.map((t) => t.city.split(', ')[1]))].join(' · '),
  },
];

/** Totals for the full-year offer — derived so the pitch tracks the schedule. */
export const totalTournaments = programs.reduce((n, p) => n + p.tournaments.length, 0);

/** 'Canton · Novi' — the towns a roster actually travels to. */
export const citiesFor = (p: Program) =>
  p.tournaments.map((t) => t.city.split(',')[0]).join(' · ');

export const allStates = [
  ...new Set(programs.flatMap((p) => p.tournaments.map((t) => t.city.split(', ')[1]))),
].join(' · ');

/** Month names, indexed 0 = Jan — used to label each season window. */
export const MONTHS_FULL = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
