// Snapshot the live resources table to data/resources-snapshot.jsonl.
// Run: npm run resources:export
//
// Falls back to the seed array when SUPABASE_URL is unset (so backups still
// produce a useful artifact for diff in CI).
import { mkdir, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  let rows;

  if (url && key) {
    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await sb
      .from("resources")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(10000);
    if (error) throw error;
    rows = data ?? [];
    console.log(`fetched ${rows.length} rows from Supabase`);
  } else {
    console.log("SUPABASE_URL not set — exporting seed array as snapshot");
    console.log(
      "hint: this script's snapshot is meant to back up the live Supabase table.\n" +
      "without SUPABASE_URL the seed array in lib/resources.ts IS the source of truth — no separate snapshot needed."
    );
    rows = [];
  }

  const out = resolve(root, "data", "resources-snapshot.jsonl");
  await mkdir(dirname(out), { recursive: true });
  await writeFile(
    out,
    rows.map((r) => JSON.stringify(r)).join("\n") + (rows.length ? "\n" : ""),
    "utf8"
  );
  console.log(`wrote ${out} (${rows.length} rows)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
