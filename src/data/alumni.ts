/**
 * REVOLT LC — COLLEGE COMMITMENTS
 *
 * Real alumni. Names, high schools and colleges exactly as supplied by the club.
 *
 * Positions, NCAA/NAIA divisions and graduation years are deliberately absent:
 * they weren't in the source, and this board is a public claim about real
 * players, so nothing here is inferred. Add fields only from confirmed info.
 */
export type Alum = {
  name: string;
  highSchool: string;
  college: string;
};

export const alumni: Alum[] = [
  { name: 'Tommy Carrera',    highSchool: 'Homestead High School', college: 'Edgewood University' },
  { name: 'Jacob Meyers',     highSchool: 'Homestead High School', college: 'Indiana Tech' },
  { name: 'Cooper Barkway',   highSchool: 'Tecumseh High School',  college: 'Northwood University' },
  { name: 'Gavin Jones',      highSchool: 'Tecumseh High School',  college: 'Trine University' },
  { name: 'Ricky Swift',      highSchool: 'Homestead High School', college: 'Taylor University' },
  { name: 'Carter Schwartz',  highSchool: 'Homestead High School', college: 'Point Park University' },
  { name: 'Maddoxx Schwartz', highSchool: 'Homestead High School', college: 'Indiana Tech' },
  { name: 'Jackson Schroeder',highSchool: 'Homestead High School', college: 'Trine University' },
  { name: 'Simon Watson',     highSchool: 'Snider High School',    college: 'Indiana Tech' },
];

/**
 * Counts for the section lede. Deliberately NOT per-school tallies: ranking
 * players by high school or college makes the most-repeated name the loudest
 * fact on the page, which reads as favouritism rather than as a track record.
 * The board below lists every commitment individually instead.
 */
export const commitmentCount = alumni.length;
export const collegeCount = new Set(alumni.map((a) => a.college)).size;

/**
 * The destination set, alphabetical. Alphabetical on purpose: any other order
 * (count, recency) would turn the same set into a ranking, which is the thing
 * the note above rules out.
 */
export const collegeList = [...new Set(alumni.map((a) => a.college))].sort();
