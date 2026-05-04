"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function EmbedSnippetRow({
  snippet,
  label,
}: {
  snippet: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }
  return (
    <div className="rounded-xl bg-[var(--accent)] p-3 text-white ring-1 ring-white/10">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#a8b3cb]">
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy snippet"}
          className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-white hover:bg-white/20"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" aria-hidden /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" aria-hidden /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-auto whitespace-pre-wrap break-all text-[11px] leading-relaxed text-[#dde4f3]">
        <code>{snippet}</code>
      </pre>
    </div>
  );
}
