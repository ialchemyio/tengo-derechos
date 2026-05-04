// Generates real MP3 clips for every step.say phrase across all emergency
// guides, in English (Samantha) and Spanish (Paulina), via macOS `say` +
// `lame`. Writes /public/audio/<slug>/<stepIndex>-<locale>.mp3 and
// /public/audio/manifest.json.
//
// Run: npm run audio
//
// Spec compliance:
// - Mono, ~48-64 kbps MP3, < 8s for "say this" phrases.
// - Manifest contains transcript + duration + bytes + voice per clip.
// - No music bed, neutral pace.
//
// Cleanup: tmp .aiff is unlinked.
import { spawnSync } from "node:child_process";
import { mkdir, writeFile, unlink, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { randomBytes } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const outDir = resolve(root, "public", "audio");

// Import content.ts via tsx-style: we instead inline the parser since this
// runs under plain node. We dynamically `import()` the source after a tiny
// transform: simpler to just re-declare the data the script needs.
//
// The mirrored phrase list below MUST stay in sync with lib/content.ts. The
// content.ts step indexes are zero-based.
const phrases = [
  // ICE at door
  { slug: "ice-at-door", step: 2, en: "Please slide the warrant under the door.", es: "Por favor deslice la orden por debajo de la puerta." },
  { slug: "ice-at-door", step: 3, en: "I choose to remain silent.", es: "Decido permanecer en silencio." },
  // Police stop
  { slug: "police-stop", step: 3, en: "Officer, am I free to go?", es: "Oficial, ¿soy libre de irme?" },
  { slug: "police-stop", step: 4, en: "I choose to remain silent.", es: "Decido permanecer en silencio." },
  { slug: "police-stop", step: 5, en: "I do not consent to a search.", es: "No consiento al registro." },
  // Border patrol
  { slug: "border-patrol", step: 1, en: "Am I free to leave?", es: "¿Soy libre de irme?" },
  { slug: "border-patrol", step: 2, en: "I choose to remain silent.", es: "Decido permanecer en silencio." },
  { slug: "border-patrol", step: 4, en: "I want to speak to a lawyer.", es: "Quiero hablar con un abogado." },
  // Medical
  { slug: "medical", step: 2, en: "Do you offer financial assistance or charity care?", es: "¿Ofrecen asistencia financiera o ayuda económica?" },
];

const VOICES = {
  en: "Samantha",
  es: "Paulina",
};

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: ["ignore", "pipe", "pipe"] });
  if (r.status !== 0) {
    const stderr = r.stderr?.toString() || "";
    throw new Error(`${cmd} failed (${r.status}): ${stderr}`);
  }
  return r.stdout?.toString() ?? "";
}

async function probeDurationMs(mp3Path) {
  // Use lame --decode on the mp3 to a /dev/null target with --silent and
  // grep duration via a separate `afinfo` (always present on macOS).
  const out = run("/usr/bin/afinfo", [mp3Path]);
  const m = out.match(/estimated duration:\s+([0-9.]+)\s*sec/);
  if (!m) return 0;
  return Math.round(parseFloat(m[1]) * 1000);
}

async function synth(text, locale, dest) {
  const tmp = resolve(tmpdir(), `td-tts-${randomBytes(6).toString("hex")}.aiff`);
  // Slightly slower than default for clarity in stressful moments.
  const rate = 175;
  run("/usr/bin/say", ["-v", VOICES[locale], "-r", String(rate), "-o", tmp, text]);
  // Encode AIFF -> mono 64kbps MP3 with lame.
  run("/opt/homebrew/bin/lame", [
    "--silent",
    "-m", "m",       // mono
    "-b", "64",      // 64 kbps CBR
    "--resample", "22.05",
    tmp,
    dest,
  ]);
  await unlink(tmp).catch(() => {});
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: "macos-say",
    steps: {},
  };

  for (const p of phrases) {
    const slugDir = resolve(outDir, p.slug);
    await mkdir(slugDir, { recursive: true });

    for (const locale of ["en", "es"]) {
      const filename = `${p.step}-${locale}.mp3`;
      const dest = resolve(slugDir, filename);
      const url = `/audio/${p.slug}/${filename}`;
      try {
        await synth(p[locale], locale, dest);
      } catch (e) {
        console.error(`! failed ${p.slug}/${filename}: ${e.message}`);
        continue;
      }
      const st = await stat(dest);
      const durationMs = await probeDurationMs(dest);
      const key = `${p.slug}:${p.step}`;
      manifest.steps[key] ??= {};
      manifest.steps[key][locale] = {
        url,
        durationMs,
        bytes: st.size,
        voice: VOICES[locale],
        transcript: p[locale],
      };
      console.log(`✓ ${p.slug}/${filename}  ${st.size}B  ${durationMs}ms`);
    }
  }

  const manifestPath = resolve(outDir, "manifest.json");
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${manifestPath}`);
  const total = Object.values(manifest.steps).reduce(
    (acc, e) => acc + (e.en?.bytes || 0) + (e.es?.bytes || 0),
    0
  );
  console.log(`total: ${Object.keys(manifest.steps).length} phrases × 2 langs, ${(total / 1024).toFixed(1)} KB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
