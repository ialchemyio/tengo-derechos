import Link from "next/link";
import { CloudOff, ShieldAlert, DoorClosed, Car, Stethoscope } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";

export function OfflineView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const p = (path: string) => (locale === "es" ? `/es${path}` : path);
  const offlineLabel = locale === "es" ? "Sin conexión" : "Offline";
  const offlineMsg =
    locale === "es"
      ? "No hay conexión a internet. Estas guías guardadas pueden ayudarte."
      : "You are offline. These saved guides can still help.";
  const tryAgain = locale === "es" ? "Reintentar" : "Try again";
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 py-8">
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 text-amber-950">
        <div className="flex items-center gap-2 font-semibold">
          <CloudOff className="h-5 w-5" aria-hidden />
          {offlineLabel}
        </div>
        <p className="mt-1 text-sm">{offlineMsg}</p>
      </div>

      <h1 className="mt-6 text-3xl font-extrabold text-zinc-900">
        {t.brand}
      </h1>
      <p className="mt-1 text-zinc-700">{t.tagline}</p>

      <h2 className="mt-6 text-lg font-bold text-zinc-900">{t.emergency}</h2>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href={p("/emergency/ice-at-door")}
          className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-zinc-200 hover:ring-zinc-400"
        >
          <DoorClosed className="h-6 w-6 text-red-600" aria-hidden />
          <div>
            <div className="font-bold text-zinc-900">{t.iceAtDoor}</div>
          </div>
        </Link>
        <Link
          href={p("/emergency/police-stop")}
          className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-zinc-200 hover:ring-zinc-400"
        >
          <Car className="h-6 w-6 text-amber-600" aria-hidden />
          <div>
            <div className="font-bold text-zinc-900">{t.policeStop}</div>
          </div>
        </Link>
        <Link
          href={p("/emergency/border-patrol")}
          className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-zinc-200 hover:ring-zinc-400"
        >
          <ShieldAlert className="h-6 w-6 text-indigo-600" aria-hidden />
          <div>
            <div className="font-bold text-zinc-900">{t.borderPatrol}</div>
          </div>
        </Link>
        <Link
          href={p("/emergency/medical")}
          className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-zinc-200 hover:ring-zinc-400"
        >
          <Stethoscope className="h-6 w-6 text-teal-600" aria-hidden />
          <div>
            <div className="font-bold text-zinc-900">{t.medical}</div>
          </div>
        </Link>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href={p("/")}
          className="rounded-2xl bg-emerald-600 px-5 py-3 text-base font-bold text-white"
        >
          {tryAgain}
        </Link>
      </div>

      <p className="mt-6 text-xs text-zinc-500">{t.legalNotice}</p>
    </main>
  );
}
