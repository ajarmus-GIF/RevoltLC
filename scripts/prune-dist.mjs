/**
 * Deletes files in dist/_astro/ that nothing in the built site references.
 *
 * WHY: Astro's image pipeline emits the ORIGINAL of every processed image
 * alongside the optimised .webp variants. For the 238-photo gallery that is
 * ~300MB of JPEGs no page, stylesheet or script ever points at — about
 * two-thirds of the build output. The behaviour doesn't depend on where the
 * image is imported (.astro frontmatter and .ts modules both do it), so it is
 * cleaned up after the fact instead.
 *
 * Safety: a file is removed ONLY if its exact name appears in no .html, .css,
 * .js or .json in dist/. Anything referenced — including every .webp actually
 * used in a srcset — is kept. Run automatically by `npm run build`.
 */
import { readdirSync, readFileSync, statSync, unlinkSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]
  );

const all = walk(dist);
const TEXT = new Set(['.html', '.css', '.js', '.json', '.xml', '.txt', '.map']);

// One big haystack of everything the site can actually reference.
const haystack = all
  .filter((f) => TEXT.has(extname(f)))
  .map((f) => readFileSync(f, 'utf8'))
  .join('\n');

let freed = 0;
const removed = [];
for (const f of all.filter((f) => f.includes('/_astro/') && !TEXT.has(extname(f)))) {
  const name = f.split('/').pop();
  if (haystack.includes(name)) continue;
  freed += statSync(f).size;
  unlinkSync(f);
  removed.push(name);
}

const mb = (n) => `${(n / 1048576).toFixed(1)}MB`;
if (removed.length) {
  const byExt = removed.reduce((m, n) => ((m[extname(n)] = (m[extname(n)] ?? 0) + 1), m), {});
  console.log(`prune-dist: removed ${removed.length} unreferenced files (${mb(freed)}) —`,
    Object.entries(byExt).map(([e, n]) => `${n}${e}`).join(', '));
} else {
  console.log('prune-dist: nothing unreferenced');
}
