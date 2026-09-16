#!/usr/bin/env node
// Generates the course landing page: a 10-slot grid matching the syllabus's
// 10 sessions. A slot is "filled" (linked to its slides) once its module has
// an active (uncommented) `title:` in its frontmatter; otherwise it renders
// as a locked placeholder using the syllabus's scheduled date.
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const modulesDir = path.join(root, 'modules');
const templatePath = path.join(root, 'site', 'index.template.html');
const outPath = process.argv[2] || path.join(root, '_site', 'index.html');

// 2026 schedule, from syllabus/2026/G440 - Intro to Scientific Python FULL Syllabus.md
const SCHEDULE = [
  'September 14, 2026',
  'September 16, 2026',
  'September 21, 2026',
  'September 23, 2026',
  'September 28, 2026',
  'September 30, 2026',
  'October 5, 2026',
  'October 7, 2026',
  'October 19, 2026',
  'October 21, 2026',
];

const DATE_RE = /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}$/m;

function readModule(num) {
  const file = path.join(modulesDir, `module_${num}.md`);
  if (!fs.existsSync(file)) return null;

  const content = fs.readFileSync(file, 'utf8');
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---/);
  const titleLine =
    frontmatter && frontmatter[1].split('\n').find((l) => l.startsWith('title:'));
  if (!titleLine) return null; // not yet rewritten for 2026

  const rawTitle = titleLine.slice('title:'.length).trim();
  const title = rawTitle.replace(/^Module\s+\d+:\s*/i, '');
  const dateMatch = content.match(DATE_RE);

  return { title, date: dateMatch ? dateMatch[0] : null };
}

const cards = SCHEDULE.map((scheduledDate, i) => {
  const num = String(i + 1).padStart(2, '0');
  const ready = readModule(num);

  if (ready) {
    return `    <a class="card" href="modules/html/module_${num}.html">
      <div class="eyebrow">Module ${num}</div>
      <div class="title">${ready.title}</div>
      <div class="date">${ready.date || scheduledDate}</div>
    </a>`;
  }

  return `    <div class="card locked">
      <svg class="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="4" y="11" width="16" height="10" rx="2"/>
        <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
      </svg>
      <div class="eyebrow">Module ${num}</div>
      <div class="title">Coming soon</div>
      <div class="date">${scheduledDate}</div>
    </div>`;
});

const template = fs.readFileSync(templatePath, 'utf8');
const output = template.replace('<!-- MODULES -->', cards.join('\n'));

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, output);

const readyCount = SCHEDULE.filter((_, i) => readModule(String(i + 1).padStart(2, '0'))).length;
console.log(`Generated ${outPath}: ${readyCount}/${SCHEDULE.length} modules ready.`);
