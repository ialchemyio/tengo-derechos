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
