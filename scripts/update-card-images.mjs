// One-off script: update src/data/articles.ts so each article's `image`
// points to the first body image from content/<slug>.html rather than the
// legacy /images/cards/*.webp preview. Also updates imageAlt, imageWidth,
// imageHeight, imageAspect to match the new image.

import fs from 'fs';
import sharp from 'sharp';

const articlesFile = 'src/data/articles.ts';
let src = fs.readFileSync(articlesFile, 'utf8');

const slugs = [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
console.log('Found', slugs.length, 'articles');

const updates = [];
const skipped = [];

for (const slug of slugs) {
  const contentPath = `content/${slug}.html`;
  if (!fs.existsSync(contentPath)) {
    skipped.push([slug, 'no content file']);
    continue;
  }
  const html = fs.readFileSync(contentPath, 'utf8');
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (!bodyMatch) {
    skipped.push([slug, 'no body']);
    continue;
  }
  const body = bodyMatch[1];

  // Find first img tag whose src lives under /images/blog/
  const imgRe = /<img\b[^>]*>/g;
  let chosen = null;
  let m;
  while ((m = imgRe.exec(body)) !== null) {
    const tag = m[0];
    const srcMatch = tag.match(/\ssrc\s*=\s*"([^"]+)"/) || tag.match(/\ssrc\s*=\s*'([^']+)'/);
    if (!srcMatch) continue;
    let s = srcMatch[1];
    if (!s.startsWith('/images/blog/')) continue;
    s = s.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const diskPath = 'public' + s;
    if (!fs.existsSync(diskPath)) continue;
    const altMatch = tag.match(/\salt\s*=\s*"([^"]*)"/) || tag.match(/\salt\s*=\s*'([^']*)'/);
    chosen = { src: s, alt: altMatch ? altMatch[1] : '', disk: diskPath };
    break;
  }
  if (!chosen) {
    skipped.push([slug, 'no body image']);
    continue;
  }
  const meta = await sharp(chosen.disk).metadata();
  updates.push({ slug, ...chosen, width: meta.width, height: meta.height });
}

console.log('Will update:', updates.length);
console.log('Skip:', skipped.length);
if (skipped.length) console.log(skipped);

function toTsSingleQuoted(str) {
  // Escape backslashes first, then single quotes.
  return "'" + str.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
}

for (const u of updates) {
  const slugIdx = src.indexOf(`slug: '${u.slug}'`);
  if (slugIdx === -1) continue;
  const closeIdx = src.indexOf('\n  },', slugIdx);
  if (closeIdx === -1) continue;
  const blockEnd = closeIdx + 5;
  let block = src.slice(slugIdx, blockEnd);
  const aspect = (u.width / u.height).toFixed(3);
  // Use a function replacer to avoid interpreting $ or \ in the replacement.
  block = block.replace(/image:\s*'[^']*'/, () => "image: " + toTsSingleQuoted(u.src));
  block = block.replace(/imageAlt:\s*'(?:[^'\\]|\\.)*'/, () => "imageAlt: " + toTsSingleQuoted(u.alt));
  block = block.replace(/imageWidth:\s*\d+/, () => `imageWidth: ${u.width}`);
  block = block.replace(/imageHeight:\s*\d+/, () => `imageHeight: ${u.height}`);
  block = block.replace(/imageAspect:\s*[\d.]+/, () => `imageAspect: ${aspect}`);
  src = src.slice(0, slugIdx) + block + src.slice(blockEnd);
}

fs.writeFileSync(articlesFile, src);
console.log('Wrote', articlesFile);
