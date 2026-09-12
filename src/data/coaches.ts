/**
 * REVOLT LC — COACHING STAFF
 *
 * Real staff data. Each coach is described by their coaching appointments
 * rather than a written bio: the record is the credential, and it keeps the
 * section honest — nothing here is claimed that isn't on the résumé.
 *
 * `to: null` means the appointment is current. The roster derives "coaching
 * since" from the earliest `from`, so these entries stay correct on their own.
 *
 * High schools carry "High School" in `org` on purpose: this list mixes them
 * with colleges, and the colleges link out to their lacrosse programs while
 * the high schools don't. Spelling it out is what tells a reader which is
 * which, rather than leaving them to infer it from which names are links.
 */
export type Appointment = {
  org: string;
  title: string;
  from: number;
  /** null = present */
  to: number | null;
};

export type Coach = {
  index: string;
  name: string;
  /** Role within Revolt LC. */
  role: string;
  /** Chronological, earliest first. */
  history: Appointment[];
};

export const coaches: Coach[] = [
  {
    index: '01',
    name: 'Mitchell Wilkins',
    role: 'Owner',
    history: [
      { org: 'Indiana Tech', title: 'Offensive Coordinator', from: 2019, to: 2025 },
      { org: 'Edgewood University', title: 'Head Coach', from: 2025, to: null },
    ],
  },
  {
    index: '02',
    name: 'Sam Anderson',
    role: 'Program Director',
    history: [
      { org: 'Homestead High School', title: 'Assistant Coach', from: 2023, to: 2024 },
      { org: 'Homestead High School', title: 'Head Coach', from: 2024, to: null },
    ],
  },
  {
    index: '03',
    name: 'Ryan Richardson',
    role: 'Coach',
    history: [
      { org: 'Bishop Dwenger High School', title: 'Assistant Coach', from: 2021, to: 2024 },
      { org: 'Bishop Dwenger High School', title: 'Head Coach', from: 2024, to: null },
    ],
  },
  {
    index: '04',
    name: 'Michael DeCarro',
    role: 'Faceoff Coach',
    history: [
      { org: 'Homestead High School', title: 'Assistant Coach', from: 2025, to: null },
    ],
  },
  {
    index: '05',
    name: 'Harrison Sutphin',
    role: 'Coach',
    history: [
      { org: 'Carroll High School', title: 'Head Coach', from: 2022, to: null },
    ],
  },
];

/** Earliest year on record — drives the "since" stamp on each roster row. */
export const coachingSince = (c: Coach): number =>
  Math.min(...c.history.map((h) => h.from));

/** The appointment a coach currently holds, if any. */
export const currentPost = (c: Coach): Appointment | undefined =>
  c.history.find((h) => h.to === null);
