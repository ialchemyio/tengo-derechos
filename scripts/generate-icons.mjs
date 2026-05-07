// One-shot icon generator. Run: npm run icons
// Renders the Tengo Derechos brand mark to:
//   /public/icons/icon-{192,512}.png         (transparent background)
//   /public/icons/icon-512-maskable.png      (navy square — Android safe-zone)
//   /public/icons/apple-touch-icon.png       (navy rounded — iOS forbids alpha)
//   /public/icons/icon-1024-transparent.png  (press-kit hi-res)
import sharp from "sharp";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const out = resolve(root, "public", "icons");

const NAVY = "#1f2c44";

async function compose(canvasSize, padding, opts = {}) {
  const innerSize = canvasSize - padding * 2;
  const markSvg = await readFile(resolve(out, "icon.svg"), "utf8");
  // Read the source viewBox so the inner <svg> wrapper preserves coordinates.
  const vbMatch = markSvg.match(/viewBox=["']([^"']+)["']/i);
  const sourceViewBox = vbMatch ? vbMatch[1] : "0 0 220 240";
  const inner = markSvg
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "");

  const bgFill =
    opts.background === "navy-rounded" || opts.background === "navy-square"
      ? NAVY
      : "none";
  const bgRadius =
    opts.background === "navy-rounded" ? canvasSize * 0.22 : 0;

  const composed = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasSize}" height="${canvasSize}" viewBox="0 0 ${canvasSize} ${canvasSize}">
    ${
      bgFill !== "none"
        ? `<rect width="${canvasSize}" height="${canvasSize}" rx="${bgRadius}" fill="${bgFill}"/>`
        : ""
    }
    <svg x="${padding}" y="${padding}" width="${innerSize}" height="${innerSize}" viewBox="${sourceViewBox}" preserveAspectRatio="xMidYMid meet">
      ${inner}
    </svg>
  </svg>`;

  return sharp(Buffer.from(composed))
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function emit(name, canvasSize, padding, opts = {}) {
  const png = await compose(canvasSize, padding, opts);
  const path = resolve(out, name);
  await writeFile(path, png);
  console.log(
    `wrote ${path} (${png.length} bytes, ${
      opts.background ?? "transparent"
    } bg)`
  );
}

await mkdir(out, { recursive: true });

// Standard PWA icons — transparent background. The OS / launcher draws the
// surrounding chrome; we don't bake one in.
await emit("icon-192.png", 192, 12);
await emit("icon-512.png", 512, 32);

// Maskable icon: Android launchers may crop heavily. Use navy square so the
// safe zone reads as a proper navy app tile.
await emit("icon-512-maskable.png", 512, 80, { background: "navy-square" });

// Apple touch icon: iOS does not honor transparency on touch icons; ship a
// rounded-square navy backdrop so the home-screen tile looks intentional.
await emit("apple-touch-icon.png", 180, 22, { background: "navy-rounded" });

// Press-kit hi-res transparent for partner orgs.
await emit("icon-1024-transparent.png", 1024, 0);

console.log("done");
