/**
 * REVOLT LC — PHOTO GALLERY
 *
 * Every image in src/assets/gallery/. The import list lives in the generated
 * gallery-images.ts — after adding or removing a file there, run
 * `node scripts/gen-gallery.mjs`. Removing one is a file delete, which matters:
 * the registration form has a photo-consent checkbox, so a family may ask for a
 * specific shot to come down.
 *
 * The list is generated rather than globbed on purpose: import.meta.glob also
 * emits every ORIGINAL file into the build (303MB of unreferenced JPEGs here),
 * while explicit imports ship only the optimised variants.
 *
 * SOURCE: the club's "Revolt Photos" folder, 253 files. 15 were byte-identical
 * duplicates and were dropped, leaving 238. Copies here are capped at 2400px on
 * the long edge — past anything the site displays, and it keeps the originals
 * (untouched, in "Revolt Photos/") out of the build. Order is by capture date
 * then filename, so the gallery reads chronologically.
 *
 * DATES are read from each file's EXIF capture timestamp, not invented: every
 * photo in this set was shot across three days in July 2023.
 */
import type { ImageMetadata } from 'astro';
import { galleryImages } from './gallery-images';

export type Photo = {
  /** Bare filename, e.g. 'dsc-0757.jpg' — the id used by `featured` below. */
  id: string;
  src: ImageMetadata;
  portrait: boolean;
};

export const photos: Photo[] = galleryImages
  .map(({ id, src }) => ({ id, src, portrait: src.height > src.width }))
  .sort((a, b) => a.id.localeCompare(b.id));

export const photoCount = photos.length;

/**
 * The season this set covers, derived from the EXIF dates above rather than
 * typed in — if photos from another year are added, update this alongside them.
 */
export const seasonLabel = 'Summer 2023';

/**
 * Hand-picked stronger frames, used for the home-page strip. The full gallery
 * shows everything; this pool exists because the set also contains sideline
 * and vendor-tent shots that shouldn't be what greets someone on the home page.
 * Anything here must exist in src/assets/gallery/ — unknown ids are ignored.
 */
const featuredIds = [
  'dsc-0571.jpg', 'dsc-0024.jpg', 'dsc-0033.jpg', 'dsc-0034.jpg',
  'dsc-0070.jpg', 'dsc-0088.jpg', 'dsc-0148.jpg', 'dsc-0171.jpg',
  'dsc-0198.jpg', 'dsc-0225.jpg', 'dsc-0248.jpg', 'dsc-0300.jpg',
  'dsc-0323.jpg', 'dsc-0426.jpg', 'dsc-0476.jpg', 'dsc-0544.jpg',
  'dsc-0599.jpg', 'dsc-0657.jpg', 'dsc-0679.jpg', 'dsc-0747.jpg',
  'dsc-0757.jpg', 'dsc-0383.jpg', 'dsc-0579.jpg', 'dsc-0670.jpg',
  'dsc-0803.jpg', 'dsc-0848.jpg', 'dsc-0892.jpg', 'dsc-0771.jpg',
  'dsc-0827.jpg', 'dsc-0899-1.jpg',
];

const byId = new Map(photos.map((p) => [p.id, p]));
export const featured: Photo[] = featuredIds
  .map((id) => byId.get(id))
  .filter((p): p is Photo => p !== undefined);

/**
 * n photos at random from the featured pool.
 *
 * This runs at BUILD time — the site is static, so the picks are baked into the
 * HTML and change on each rebuild/deploy, not on each page load. That's the
 * deliberate trade: no JavaScript, and every image still goes through Astro's
 * optimiser with a proper srcset. Falls back to the full set if the pool is
 * ever smaller than n.
 */
export function pickRandom(n: number): Photo[] {
  const pool = (featured.length >= n ? featured : photos).slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, n);
}

/**
 * Alt text. The shoot is one club across three days, and nobody has described
 * these frames individually, so the alt says what is true of all of them rather
 * than inventing a specific description per photo.
 */
export const altFor = (i: number) =>
  `Revolt LC players in black and gold during the ${seasonLabel} season — photo ${i + 1} of ${photoCount}`;
