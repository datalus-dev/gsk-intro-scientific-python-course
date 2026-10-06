#!/usr/bin/env node
// Builds the cheatsheet from cheatsheet/cheatsheet.md (content) and
// cheatsheet/cheatsheet.css (look) into one self-contained HTML file, then
// prints it to PDF with headless Chrome.
//
// Markdown layout:
//   # Title, then a one-line subtitle   -> page header
//   ## Part name                        -> section header
//   ### Card name                       -> one card (tables, code, lists)
//   > text                              -> small grey note under a card
// In ```python and ```bash blocks, a trailing `# comment` and `[Tab]` are greyed out.
//
// Usage: node site/build-cheatsheet.js [outDir] [--no-pdf]   (default outDir: cheatsheet/)
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const MarkdownIt = require('markdown-it');

const dir = path.resolve(__dirname, '..', 'cheatsheet');
const mdPath = path.join(dir, 'cheatsheet.md');
const cssPath = path.join(dir, 'cheatsheet.css');
const outDir = path.resolve(process.argv.slice(2).find((a) => !a.startsWith('--')) || dir);
const htmlPath = path.join(outDir, 'cheatsheet.html');
const pdfPath = path.join(outDir, 'cheatsheet.pdf');
fs.mkdirSync(outDir, { recursive: true });

const md = new MarkdownIt({ html: false });
const esc = md.utils.escapeHtml;
const Token = md.parse('x', {})[0].constructor;

md.renderer.rules.fence = (tokens, i) => {
  const { content, info } = tokens[i];
  const lang = info.trim().split(/\s+/)[0];
  let html = esc(content.replace(/\n$/, ''));
  if (lang === 'python' || lang === 'bash') {
    html = html.replace(/(^|\s)(#.*)$/gm, '$1<span class="c">$2</span>');
    html = html.replace(/\[Tab\]/g, '<span class="c">[Tab]</span>');
  }
  return `<pre><code>${html}</code></pre>\n`;
};

function tag(type, content) {
  const t = new Token(type, '', 0);
  t.content = content;
  return t;
}

// Wrap the flat token stream into header / parts / columns / cards, and turn
// blockquotes into <p class="note">.
function structure(tokens) {
  const out = [];
  let inCols = false;
  let inCard = false;
  let inHeader = false;
  let seenH1 = false;
  const closeCard = () => { if (inCard) out.push(tag('html_block', '</section>\n')); inCard = false; };
  const closeCols = () => { closeCard(); if (inCols) out.push(tag('html_block', '</div>\n')); inCols = false; };

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (tok.type === 'heading_open' && tok.tag === 'h1' && !seenH1) {
      seenH1 = true;
      inHeader = true;
      out.push(tag('html_block', '<header>\n'));
    } else if (tok.type === 'heading_open' && tok.tag === 'h2') {
      closeCols();
      tok.attrSet('class', 'part');
    } else if (tok.type === 'heading_close' && tok.tag === 'h2') {
      out.push(tok);
      out.push(tag('html_block', '<div class="cols">\n'));
      inCols = true;
      continue;
    } else if (tok.type === 'heading_open' && tok.tag === 'h3') {
      closeCard();
      out.push(tag('html_block', '<section>\n'));
      inCard = true;
    } else if (tok.type === 'blockquote_open' || tok.type === 'blockquote_close') {
      continue;
    } else if (tok.type === 'paragraph_open' && tok.level > 0 && isInBlockquote(tokens, i)) {
      tok.attrSet('class', 'note');
    }
    out.push(tok);
    if (inHeader && tok.type === 'paragraph_close') {
      out.push(tag('html_block', '</header>\n'));
      inHeader = false;
    }
  }
  closeCols();
  return out;
}

function isInBlockquote(tokens, i) {
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j].type === 'blockquote_close') return false;
    if (tokens[j].type === 'blockquote_open') return true;
    if (tokens[j].level === 0) return false;
  }
  return false;
}

const source = fs.readFileSync(mdPath, 'utf8');
const title = (source.match(/^# (.+)$/m) || [, 'Cheatsheet'])[1];
const tokens = structure(md.parse(source, {}));
let body = md.renderer.render(tokens, md.options, {});

// Tables are written with an empty header row (Markdown requires one); drop it.
body = body.replace(/<thead>\s*<tr>\s*(?:<th[^>]*>\s*<\/th>\s*)+<\/tr>\s*<\/thead>\s*/g, '');

const css = fs.readFileSync(cssPath, 'utf8');
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<style>
${css}</style>
</head>
<body>
<main>
${body}</main>
</body>
</html>
`;
fs.writeFileSync(htmlPath, html);
console.log(`Wrote ${path.relative(process.cwd(), htmlPath)}`);

if (process.argv.includes('--no-pdf')) process.exit(0);

const candidates = [
  process.env.CHROME,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  'google-chrome',
  'chromium',
].filter(Boolean);

const chrome = candidates.find((c) => !c.includes('/') || fs.existsSync(c));
if (!chrome) {
  console.warn('No Chrome found, skipped the PDF. Set CHROME=/path/to/chrome and re-run.');
  process.exit(0);
}
try {
  execFileSync(
    chrome,
    ['--headless', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${pdfPath}`, htmlPath],
    { stdio: 'ignore' }
  );
  console.log(`Wrote ${path.relative(process.cwd(), pdfPath)}`);
} catch (err) {
  console.warn(`PDF step failed (${chrome}): ${err.message}`);
}
