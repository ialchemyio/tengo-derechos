// One-shot icon generator. Run: node scripts/generate-icons.mjs
// Produces /public/icons/icon-{192,512,512-maskable}.png and apple-touch-icon.png
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, "..", "public", "icons");

const EMERALD = "#059669";
const CREAM = "#fdfaf3";

const shieldSvg = (size, padding) => {
  const inner = size - padding * 2;
  const fontSize = Math.round(inner * 0.42);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="${EMERALD}"/>
    <g transform="translate(${padding} ${padding})">
      <path d="M ${inner / 2} ${inner * 0.08}
               L ${inner * 0.12} ${inner * 0.22}
               L ${inner * 0.12} ${inner * 0.55}
               C ${inner * 0.12} ${inner * 0.78}, ${inner * 0.32} ${inner * 0.92}, ${inner / 2} ${inner * 0.96}
               C ${inner * 0.68} ${inner * 0.92}, ${inner * 0.88} ${inner * 0.78}, ${inner * 0.88} ${inner * 0.55}
               L ${inner * 0.88} ${inner * 0.22} Z"
            fill="${CREAM}" stroke="${CREAM}" stroke-width="0"/>
      <text x="${inner / 2}" y="${inner * 0.62}" text-anchor="middle"
            font-family="Helvetica, Arial, sans-serif" font-weight="900"
            font-size="${fontSize}" fill="${EMERALD}">TD</text>
    </g>
  </svg>`;
};

async function emit(name, size, padding) {
  const svg = shieldSvg(size, padding);
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const path = resolve(out, name);
  await writeFile(path, png);
  console.log(`wrote ${path} (${png.length} bytes)`);
}

await mkdir(out, { recursive: true });
await emit("icon-192.png", 192, 8);
await emit("icon-512.png", 512, 22);
await emit("icon-512-maskable.png", 512, 80);
await emit("apple-touch-icon.png", 180, 8);
await writeFile(
  resolve(out, "icon.svg"),
  shieldSvg(512, 22),
  "utf8"
);
console.log("wrote icon.svg");
