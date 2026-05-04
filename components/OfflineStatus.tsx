"use client";

import { useEffect, useState } from "react";
import { CloudOff, ShieldCheck, Download } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const STRINGS = {
  offlineBanner: {
    en: "You are offline. Saved emergency guides still work.",
    es: "Estás sin conexión. Las guías guardadas siguen funcionando.",
  },
  saved: {
    en: "Emergency pages saved offline",
    es: "Páginas de emergencia guardadas sin conexión",
  },
  install: {
    en: "Save to home screen",
    es: "Guardar en pantalla de inicio",
  },
  dismiss: {
    en: "Dismiss",
    es: "Cerrar",
  },
};

function detectLocale(): "en" | "es" {
  if (typeof window === "undefined") return "en";
  return window.location.pathname === "/es" ||
    window.location.pathname.startsWith("/es/")
    ? "es"
    : "en";
}

export function OfflineStatus() {
  const [online, setOnline] = useState(true);
  const [swReady, setSwReady] = useState(false);
  const [showInstall, setShowInstall] = useState(false);
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [savedDismissed, setSavedDismissed] = useState(false);
  const [locale, setLocale] = useState<"en" | "es">("en");

  useEffect(() => {
    // Sync initial values from browser APIs after hydration. These are
    // subscriptions to external systems (navigator + URL), not derivable state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocale(detectLocale());
    setOnline(navigator.onLine);

    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    const onInstall = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
      setShowInstall(true);
    };
    window.addEventListener("beforeinstallprompt", onInstall);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(() => setSwReady(true));
    }

    try {
      if (sessionStorage.getItem("td-saved-dismissed") === "1") {
        setSavedDismissed(true);
      }
    } catch {}

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("beforeinstallprompt", onInstall);
    };
  }, []);

  function dismissSaved() {
    setSavedDismissed(true);
    try {
      sessionStorage.setItem("td-saved-dismissed", "1");
    } catch {}
  }

  async function triggerInstall() {
    if (!installEvent) return;
    await installEvent.prompt();
    await installEvent.userChoice.catch(() => null);
    setShowInstall(false);
    setInstallEvent(null);
  }

  return (
    <>
      {!online ? (
        <div
          role="status"
          className="fixed inset-x-0 top-0 z-50 bg-amber-500 text-amber-950 shadow"
        >
          <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-2 text-sm font-semibold">
            <CloudOff className="h-4 w-4" aria-hidden />
            {STRINGS.offlineBanner[locale]}
          </div>
        </div>
      ) : null}

      {swReady && !savedDismissed ? (
        <div
          role="status"
          className="pointer-events-auto fixed bottom-3 left-1/2 z-40 flex max-w-[92vw] -translate-x-1/2 items-center gap-2 rounded-full bg-[var(--brand-deep)] px-4 py-2 text-xs font-semibold text-white shadow-lg"
        >
          <ShieldCheck className="h-4 w-4" aria-hidden />
          <span>{STRINGS.saved[locale]}</span>
          <button
            type="button"
            onClick={dismissSaved}
            aria-label={STRINGS.dismiss[locale]}
            className="ml-1 rounded-full bg-[var(--brand-deep)]/40 px-2 py-0.5 text-[10px] font-semibold hover:bg-[var(--brand-deep)]/60"
          >
            ×
          </button>
        </div>
      ) : null}

      {showInstall ? (
        <button
          type="button"
          onClick={triggerInstall}
          className="fixed bottom-3 right-3 z-40 inline-flex items-center gap-1.5 rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-[var(--brand-deep)]"
        >
          <Download className="h-4 w-4" aria-hidden />
          {STRINGS.install[locale]}
        </button>
      ) : null}
    </>
  );
}
