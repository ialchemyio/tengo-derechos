// Stripped-down layout for embeddable iframe pages. No SiteHeader/Footer,
// no SW registration UI, no offline banner — keep the iframe payload as
// small and predictable as possible for partner sites.

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-0 bg-[var(--background)] text-zinc-900">
      {children}
    </div>
  );
}
