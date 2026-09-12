/**
 * Regenerates src/data/gallery-images.ts from the contents of
 * src/assets/gallery/.
 *
 * Run after adding or removing photos:   node scripts/gen-gallery.mjs
 *
 * WHY THIS EXISTS instead of import.meta.glob: a glob import emits every
 * original file into the build output as well as the optimised variants —
 * 303MB of unreferenced JPEGs, two-thirds of dist/. Explicit imports let the
 * bundler see that only the transforms are used, so the originals stay out.
 */
import { readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = readdirSync(join(root, 'src/assets/gallery'))
  .filter((f) => f.toLowerCase().endsWith('.jpg'))
  .sort();

const imports = files.map((f, i) => `import i${i} from '../assets/gallery/${f}';`);
const entries = files.map((f, i) => `  { id: '${f}', src: i${i} },`);

writeFileSync(
  join(root, 'src/data/gallery-images.ts'),
  `/**
 * AUTO-GENERATED — do not edit by hand.
 * Run \`node scripts/gen-gallery.mjs\` after changing src/assets/gallery/.
 * ${files.length} photos.
 */
import type { ImageMetadata } from 'astro';

${imports.join('\n')}

export const galleryImages: { id: string; src: ImageMetadata }[] = [
${entries.join('\n')}
];
`
);
console.log(`wrote src/data/gallery-images.ts — ${files.length} photos`);
