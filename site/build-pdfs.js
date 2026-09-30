#!/usr/bin/env node
// Builds a PDF of every module that's ready for this year, i.e. has an active
// (uncommented) `title:` in its frontmatter, the same signal `build:slides`
// uses. Usage: node site/build-pdfs.js [outDir]   (default: modules/pdf)
//
// Slides reference local images relative to the built HTML in modules/html/
// (e.g. ../../syllabus/2026/...), but PDF export resolves them relative to the
// Markdown file. So each deck is built from a temporary copy placed in
// modules/html/, which makes both outputs resolve paths the same way.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const modulesDir = path.join(root, 'modules');
const htmlDir = path.join(modulesDir, 'html');
const outDir = path.resolve(process.argv[2] || path.join(modulesDir, 'pdf'));
const marp = path.join(root, 'node_modules', '.bin', 'marp');

const ready = fs
  .readdirSync(modulesDir)
  .filter((f) => /^module_\d+\.md$/.test(f))
  .filter((f) => /^title:/m.test(fs.readFileSync(path.join(modulesDir, f), 'utf8').split(/\n---/)[0]))
  .sort();

const createdHtmlDir = !fs.existsSync(htmlDir);
fs.mkdirSync(htmlDir, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

try {
  for (const file of ready) {
    const tmp = path.join(htmlDir, file);
    const out = path.join(outDir, file.replace(/\.md$/, '.pdf'));
    fs.copyFileSync(path.join(modulesDir, file), tmp);
    try {
      execFileSync(marp, ['--no-stdin', '--html', '--pdf', '--allow-local-files', tmp, '-o', out], {
        stdio: 'inherit',
      });
    } finally {
      fs.unlinkSync(tmp);
    }
  }
} finally {
  if (createdHtmlDir && fs.readdirSync(htmlDir).length === 0) fs.rmdirSync(htmlDir);
}

console.log(`Built ${ready.length} PDFs in ${outDir}`);
