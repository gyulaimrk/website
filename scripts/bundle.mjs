// Using TypeScript sources from scripts: esbuild compiles them, then we load them.
// This way the scripts use the same data as the site, and no text search (regex) is needed.
import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const root = resolve(import.meta.dirname, '..');

/**
 * Compiles and loads the given TypeScript module.
 * `entry`: a file relative to `root`, or `{ contents }` for a small entry point given in code.
 */
export async function importTs(entry) {
  const dir = await mkdtemp(join(tmpdir(), 'portfolio-script-'));
  const outfile = join(dir, 'module.mjs');
  try {
    await build({
      ...(typeof entry === 'string'
        ? { entryPoints: [join(root, entry)] }
        : { stdin: { contents: entry.contents, resolveDir: root, loader: 'ts' } }),
      bundle: true,
      format: 'esm',
      platform: 'node',
      outfile,
      logLevel: 'silent',
    });
    return await import(pathToFileURL(outfile).href);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}
