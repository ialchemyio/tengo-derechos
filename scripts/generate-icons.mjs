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

// ---------- Favicon set for app/ (Next's metadata-icons convention) ----------
//
// Next.js auto-generates the <link rel="icon"> tags for files placed at the
// root of the app directory: app/favicon.ico, app/icon.{svg,png}, and
// app/apple-icon.png. We render those here from the same canonical source so
// the favicon stays one byte stream away from the rest of the brand assets.

const appDir = resolve(root, "app");

// Modern browsers prefer the SVG.
const srcSvg = await readFile(resolve(out, "icon.svg"), "utf8");
await writeFile(resolve(appDir, "icon.svg"), srcSvg, "utf8");
console.log(`wrote ${resolve(appDir, "icon.svg")} (${srcSvg.length} bytes)`);

// Apple touch icon. iOS rejects transparency, so reuse the rounded-navy
// variant we already built for /public/icons/apple-touch-icon.png.
const appleBuf = await compose(180, 22, { background: "navy-rounded" });
await writeFile(resolve(appDir, "apple-icon.png"), appleBuf);
console.log(
  `wrote ${resolve(appDir, "apple-icon.png")} (${appleBuf.length} bytes, navy-rounded bg)`
);

// Legacy favicon.ico — multi-resolution. Generate three transparent PNGs at
// 16, 32, 48 and pack them into one .ico via to-ico.
const toIco = (await import("to-ico")).default;
const sizes = [16, 32, 48];
const pngBuffers = await Promise.all(
  sizes.map((s) => compose(s, Math.max(0, Math.round(s * 0.05))))
);
const icoBuf = await toIco(pngBuffers);
await writeFile(resolve(appDir, "favicon.ico"), icoBuf);
console.log(
  `wrote ${resolve(appDir, "favicon.ico")} (${icoBuf.length} bytes, ${sizes.join("+")})`
);

console.log("done");
