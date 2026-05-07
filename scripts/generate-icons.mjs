// One-shot icon generator. Run: npm run icons
// Renders the Tengo Derechos brand mark to:
//   /public/icons/icon-{192,512,512-maskable}.png + apple-touch-icon.png
import sharp from "sharp";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const out = resolve(root, "public", "icons");

const CREAM = "#fbf7ef";
const NAVY = "#1f2c44";

// Read the canonical SVG and embed it inside a square cream backdrop with
// the requested padding. Used for app/Apple touch icons.
async function compose(canvasSize, padding, opts = {}) {
  const innerSize = canvasSize - padding * 2;
  const markSvg = await readFile(resolve(out, "icon.svg"), "utf8");
  // Pull the inner contents of <svg ...>...</svg>
  const inner = markSvg
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "");
  const bg = opts.darkBg ? NAVY : CREAM;
  const composed = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasSize}" height="${canvasSize}" viewBox="0 0 ${canvasSize} ${canvasSize}">
    <rect width="${canvasSize}" height="${canvasSize}" fill="${bg}" rx="${opts.rounded ? canvasSize * 0.18 : 0}"/>
    <svg x="${padding}" y="${padding}" width="${innerSize}" height="${innerSize}" viewBox="0 0 200 220" preserveAspectRatio="xMidYMid meet">
      ${inner}
    </svg>
  </svg>`;
  return sharp(Buffer.from(composed)).png().toBuffer();
}

async function emit(name, canvasSize, padding, opts = {}) {
  const png = await compose(canvasSize, padding, opts);
  const path = resolve(out, name);
  await writeFile(path, png);
  console.log(`wrote ${path} (${png.length} bytes)`);
}

await mkdir(out, { recursive: true });
// Standard PWA icons: cream background, generous padding so the mark breathes.
await emit("icon-192.png", 192, 14);
await emit("icon-512.png", 512, 36);
// Maskable: SAFE zone is the inner ~80%, so add 80px of padding on a 512.
await emit("icon-512-maskable.png", 512, 80);
// Apple touch icon: rounded-square on dark navy bg, white-mark feel.
await emit("apple-touch-icon.png", 180, 18, { rounded: true });
console.log("done");
