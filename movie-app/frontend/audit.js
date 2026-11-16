// audit.js - Run with: node audit.js
import fs from 'fs';
import path from 'path';

console.log('=== 1. AUDITING JSON FILES ===');
const files = fs.readdirSync('.');
files.filter(f => f.endsWith('.json')).forEach(file => {
  try {
    const raw = fs.readFileSync(file, 'utf8');
    JSON.parse(raw);
    console.log(`[PASS] ${file} is valid JSON.`);
  } catch (err) {
    console.error(`[FAIL] ${file}: ${err.message}`);
  }
});

console.log('\n=== 2. AUDITING index.html (7.5k lines) ===');
try {
  const html = fs.readFileSync('index.html', 'utf8');
  
  // Tag mismatch & nesting check using basic regex tracking
  const voidTags = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
  const tagRegex = /<\/?([a-zA-Z0-9\-]+)(?:\s+[^>]*)?\/?>/g;
  let match;
  let stack = [];
  let line = 1;
  let lastIndex = 0;

  while ((match = tagRegex.exec(html)) !== null) {
    // track lines
    const textBefore = html.slice(lastIndex, match.index);
    line += (textBefore.match(/\n/g) || []).length;
    lastIndex = match.index;

    const fullTag = match[0];
    const tagName = match[1].toLowerCase();

    if (voidTags.has(tagName) || fullTag.endsWith('/>')) continue;

    if (fullTag.startsWith('</')) {
      if (stack.length === 0) {
        console.error(`[MISMATCH] Line ~${line}: Unexpected closing tag </${tagName}> with no open tag.`);
      } else {
        const last = stack.pop();
        if (last.name !== tagName) {
          console.error(`[MISMATCH] Line ~${line}: Expected closing </${last.name}> (from line ~${last.line}), but found </${tagName}>.`);
        }
      }
    } else {
      stack.push({ name: tagName, line });
    }
  }

  if (stack.length > 0) {
    stack.forEach(t => console.error(`[UNCLOSED] Tag <${t.name}> opened around line ~${t.line} was never closed.`));
  } else {
    console.log('[PASS] All structural tags matched and closed properly.');
  }

  // Duplicate ID Check
  const idRegex = /\sid=["']([^"']+)["']/g;
  const ids = new Map();
  line = 1; lastIndex = 0;
  while ((match = idRegex.exec(html)) !== null) {
    line += (html.slice(lastIndex, match.index).match(/\n/g) || []).length;
    lastIndex = match.index;
    const id = match[1];
    if (ids.has(id)) {
      console.error(`[DUPLICATE ID] ID "${id}" on line ~${line} was already declared on line ~${ids.get(id)}.`);
    } else {
      ids.set(id, line);
    }
  }

} catch (err) {
  console.error(`Error reading index.html: ${err.message}`);
}
