export const metadata = {
  title: "Weather",
  description: "Local weather conditions.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-zinc-900">Weather</h1>
      <p className="mt-2 text-zinc-600">
        Today&apos;s forecast: partly cloudy. High 72°F, low 58°F.
      </p>
      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
          <div key={d} className="rounded-xl bg-white p-3 ring-1 ring-zinc-200">
            <div className="text-xs text-zinc-500">{d}</div>
            <div className="text-lg font-bold">{70 + (i % 4)}°</div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-xs text-zinc-400">Data not real-time.</p>
    </main>
  );
}
