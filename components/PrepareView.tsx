"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Printer,
  Trash2,
  Copy,
  Check,
  Shield,
  AlertTriangle,
  Users,
  Baby,
  Scale,
  Stethoscope,
  Folder,
  ClipboardList,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { QuickExitButton } from "./QuickExitButton";

type PlanData = {
  contactName: string;
  contactPhone: string;
  contactRelationship: string;
  altContactName: string;
  altContactPhone: string;

  childrenPickups: string;
  schoolContact: string;
  pickupNote: string;

  lawyerName: string;
  lawyerPhone: string;
  caseNotes: string;

  allergies: string;
  medications: string;
  clinic: string;

  documents: string[];
  documentsOther: string;

  whoToCallFirst: string;
  meetingPlace: string;
  ifDetained: string;

  consent: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "td-prepare-plan-v1";

const DEFAULT_DOCS = {
  en: [
    "Government ID (driver's license, state ID)",
    "Passports for everyone in the family",
    "Birth certificates for each child",
    "Social Security cards (if any)",
    "Medical insurance cards",
    "School records / immunization records",
    "Marriage certificate",
    "Lease or proof of residence",
    "Any open immigration case papers",
    "List of medications",
    "Emergency cash",
  ],
  es: [
    "Identificación oficial (licencia de manejo, ID estatal)",
    "Pasaportes de cada miembro de la familia",
    "Actas de nacimiento de cada hijo o hija",
    "Tarjetas de seguro social (si aplica)",
    "Tarjetas de seguro médico",
    "Records escolares / cartilla de vacunación",
    "Acta de matrimonio",
    "Contrato de renta o comprobante de domicilio",
    "Papeles de cualquier caso migratorio abierto",
    "Lista de medicamentos",
    "Dinero en efectivo para emergencia",
  ],
};

const COPY = {
  en: {
    title: "Family preparedness plan",
    subtitle:
      "Build a private, printable emergency plan for your family. Nothing on this page is sent to our server. Information stays in your browser.",
    privacyHeading: "Your privacy",
    privacyOne:
      "We never see your plan. There is no upload, no email, no cloud sync. Everything happens locally in this tab.",
    privacyTwo:
      "Optionally save the plan on this device for next time — see the consent checkbox at the bottom.",
    privacyThree:
      "Do not save this on a shared or unsafe device. If you are using a public computer, leave 'Save on this device' unchecked.",
    quickExit: "Quick Exit",
    legalNotice:
      "Educational only. Not legal advice. Review this plan with a trusted attorney or nonprofit if possible.",

    next: "Next",
    back: "Back",
    finish: "Finish & review",
    edit: "Edit",
    print: "Print or save as PDF",
    copy: "Copy plan summary",
    copied: "Copied",
    clear: "Clear all data",
    saveOnDevice: "Save this plan on this device",
    saveOnDeviceWarning:
      "Do not save this on a shared or unsafe device.",
    backToEmergency: "Back to emergency guides",
    progress: "Step",
    of: "of",

    section1: "Trusted contacts",
    section1desc:
      "Pick someone outside your immediate household who family members can call if something happens.",
    contactName: "Trusted contact name",
    contactPhone: "Phone",
    contactRelationship: "Relationship (e.g. aunt, neighbor, pastor)",
    altContactName: "Backup contact name",
    altContactPhone: "Backup contact phone",

    section2: "Children & dependents",
    section2desc:
      "Who can pick up your children if you can't? Schools and daycares need this in writing.",
    childrenPickups: "People allowed to pick up children (full names + phone)",
    schoolContact: "School / daycare main phone",
    pickupNote: "Special instructions for pickup",

    section3: "Legal help",
    section3desc:
      "Note your attorney or legal-aid contact. If you don't have one yet, leave blank — visit /lawyers.",
    lawyerName: "Attorney or legal-aid org name",
    lawyerPhone: "Attorney phone",
    caseNotes: "Open case number / A-number / notes",

    section4: "Medical needs",
    section4desc:
      "What should responders or hospital staff know about your family's medical situation?",
    allergies: "Allergies",
    medications: "Medications (name + dose + who takes it)",
    clinic: "Preferred clinic or hospital",

    section5: "Documents checklist",
    section5desc:
      "Mark which documents your family already has organized in one place. The rest are next on the to-do list.",
    documentsOther: "Other documents (one per line)",

    section6: "Emergency instructions",
    section6desc:
      "Write the plan in your own words, in the language each family member reads best.",
    whoToCallFirst: "Who to call first",
    meetingPlace: "Where the family meets",
    ifDetained: "What to say if someone is detained",

    summaryHeading: "Your plan",
    summaryHint:
      "Review what you wrote. Print it, or copy it and forward to your trusted contact.",

    optional: "Optional",
    placeholderPickup:
      "Maria Hernández — 555-0123\nJuan Hernández — 555-0145",
    placeholderClinic: "Bay Area Community Clinic — 555-0190",
    placeholderMeeting:
      "1) At Aunt Maria's house\n2) If we can't reach there: the church on Main St.",
    placeholderIfDetained:
      'Say "I want to remain silent" and "I want to speak to a lawyer." Do not sign anything. Call our lawyer immediately.',
  },
  es: {
    title: "Plan familiar de emergencia",
    subtitle:
      "Crea un plan privado e imprimible para tu familia. Nada de esta página se envía a nuestro servidor. La información se queda en tu navegador.",
    privacyHeading: "Tu privacidad",
    privacyOne:
      "Nunca vemos tu plan. No hay carga, ni correo, ni sincronización a la nube. Todo ocurre localmente en esta pestaña.",
    privacyTwo:
      "Si quieres, guarda el plan en este dispositivo para la próxima vez — mira la casilla de consentimiento al final.",
    privacyThree:
      "No guardes esto en un dispositivo compartido o inseguro. Si usas una computadora pública, deja desmarcada «Guardar en este dispositivo».",
    quickExit: "Salida rápida",
    legalNotice:
      "Solo informativo. No es asesoramiento legal. Revisa este plan con un abogado de confianza o una organización si es posible.",

    next: "Siguiente",
    back: "Atrás",
    finish: "Terminar y revisar",
    edit: "Editar",
    print: "Imprimir o guardar como PDF",
    copy: "Copiar resumen del plan",
    copied: "Copiado",
    clear: "Borrar todos los datos",
    saveOnDevice: "Guardar este plan en este dispositivo",
    saveOnDeviceWarning:
      "No guardes esto en un dispositivo compartido o inseguro.",
    backToEmergency: "Volver a las guías de emergencia",
    progress: "Paso",
    of: "de",

    section1: "Contactos de confianza",
    section1desc:
      "Elige a alguien fuera de tu hogar inmediato que la familia pueda llamar si algo pasa.",
    contactName: "Nombre del contacto de confianza",
    contactPhone: "Teléfono",
    contactRelationship: "Parentesco (ej. tía, vecino, pastor)",
    altContactName: "Nombre del contacto de respaldo",
    altContactPhone: "Teléfono del contacto de respaldo",

    section2: "Hijos y dependientes",
    section2desc:
      "¿Quién puede recoger a tus hijos si tú no puedes? Las escuelas y guarderías necesitan esto por escrito.",
    childrenPickups:
      "Personas autorizadas a recoger a los niños (nombres completos + teléfono)",
    schoolContact: "Teléfono principal de la escuela o guardería",
    pickupNote: "Instrucciones especiales para recoger",

    section3: "Ayuda legal",
    section3desc:
      "Anota tu abogado o contacto de ayuda legal. Si aún no tienes uno, déjalo en blanco — visita /lawyers.",
    lawyerName: "Nombre del abogado u organización de ayuda legal",
    lawyerPhone: "Teléfono del abogado",
    caseNotes: "Número de caso / número A / notas",

    section4: "Necesidades médicas",
    section4desc:
      "¿Qué deben saber los rescatistas o el personal del hospital sobre la salud de tu familia?",
    allergies: "Alergias",
    medications: "Medicamentos (nombre + dosis + quién lo toma)",
    clinic: "Clínica u hospital preferido",

    section5: "Lista de documentos",
    section5desc:
      "Marca qué documentos tu familia ya tiene organizados en un solo lugar. Los demás van a la lista de pendientes.",
    documentsOther: "Otros documentos (uno por línea)",

    section6: "Instrucciones de emergencia",
    section6desc:
      "Escribe el plan con tus propias palabras, en el idioma que cada miembro de la familia lee mejor.",
    whoToCallFirst: "A quién llamar primero",
    meetingPlace: "Dónde se reúne la familia",
    ifDetained: "Qué decir si detienen a alguien",

    summaryHeading: "Tu plan",
    summaryHint:
      "Revisa lo que escribiste. Imprímelo o cópialo y envíaselo a tu contacto de confianza.",

    optional: "Opcional",
    placeholderPickup:
      "María Hernández — 555-0123\nJuan Hernández — 555-0145",
    placeholderClinic: "Clínica Comunitaria — 555-0190",
    placeholderMeeting:
      "1) En casa de la tía María\n2) Si no podemos llegar allí: la iglesia de la calle Main",
    placeholderIfDetained:
      'Decir «Decido permanecer en silencio» y «Quiero hablar con un abogado». No firmar nada. Llamar a nuestro abogado de inmediato.',
  },
} as const;

type PrepareCopy = (typeof COPY)["en"] | (typeof COPY)["es"];

const SECTIONS_PER_LOCALE = (locale: Locale) =>
  [
    { key: "contacts", icon: Users, title: COPY[locale].section1, desc: COPY[locale].section1desc },
    { key: "children", icon: Baby, title: COPY[locale].section2, desc: COPY[locale].section2desc },
    { key: "legal", icon: Scale, title: COPY[locale].section3, desc: COPY[locale].section3desc },
    { key: "medical", icon: Stethoscope, title: COPY[locale].section4, desc: COPY[locale].section4desc },
    { key: "documents", icon: Folder, title: COPY[locale].section5, desc: COPY[locale].section5desc },
    { key: "instructions", icon: ClipboardList, title: COPY[locale].section6, desc: COPY[locale].section6desc },
  ] as const;

function emptyPlan(): PlanData {
  return {
    contactName: "",
    contactPhone: "",
    contactRelationship: "",
    altContactName: "",
    altContactPhone: "",
    childrenPickups: "",
    schoolContact: "",
    pickupNote: "",
    lawyerName: "",
    lawyerPhone: "",
    caseNotes: "",
    allergies: "",
    medications: "",
    clinic: "",
    documents: [],
    documentsOther: "",
    whoToCallFirst: "",
    meetingPlace: "",
    ifDetained: "",
    consent: false,
    updatedAt: "",
  };
}

export function PrepareView({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const sections = SECTIONS_PER_LOCALE(locale);
  const docList = DEFAULT_DOCS[locale];

  const [plan, setPlan] = useState<PlanData>(emptyPlan);
  const [step, setStep] = useState(0); // 0..sections.length-1, then sections.length = summary
  const [copied, setCopied] = useState(false);
  const initialLoaded = useRef(false);

  // One-shot autoload after mount.
  useEffect(() => {
    if (initialLoaded.current) return;
    initialLoaded.current = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PlanData;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPlan({ ...emptyPlan(), ...parsed });
      }
    } catch {}
  }, []);

  // Autosave whenever plan changes AND consent is true.
  useEffect(() => {
    try {
      if (plan.consent) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...plan, updatedAt: new Date().toISOString() })
        );
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
  }, [plan]);

  function update<K extends keyof PlanData>(key: K, value: PlanData[K]) {
    setPlan((p) => ({ ...p, [key]: value }));
  }

  function clearAll() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setPlan(emptyPlan());
    setStep(0);
  }

  const onSummary = step >= sections.length;

  const summaryText = buildSummaryText(plan, locale, t, docList);

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  }

  return (
    <>
      <QuickExitButton label={t.quickExit} />

      <header className="bg-[var(--accent)] text-white no-print">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
            <Shield className="h-5 w-5" aria-hidden />
          </span>
          <div className="flex-1">
            <p className="font-display text-lg font-bold">Tengo Derechos</p>
            <p className="text-xs text-[#cdd5e8]">{t.title}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="font-display text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl print:text-3xl">
          {t.title}
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-700">{t.subtitle}</p>

        {/* Privacy note */}
        <aside
          role="note"
          className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950 no-print"
        >
          <p className="flex items-center gap-2 text-sm font-bold">
            <AlertTriangle className="h-4 w-4 text-amber-700" aria-hidden />
            {t.privacyHeading}
          </p>
          <ul className="mt-1 list-inside list-disc space-y-1 text-sm">
            <li>{t.privacyOne}</li>
            <li>{t.privacyTwo}</li>
            <li className="font-semibold">{t.privacyThree}</li>
          </ul>
        </aside>

        {!onSummary ? (
          <FormSection
            step={step}
            sections={sections}
            t={t}
            plan={plan}
            update={update}
            docList={docList}
          />
        ) : (
          <Summary plan={plan} locale={locale} t={t} docList={docList} />
        )}

        {/* Footer controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="text-xs uppercase tracking-wider text-zinc-500">
            {!onSummary
              ? `${t.progress} ${step + 1} ${t.of} ${sections.length}`
              : t.summaryHeading}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {!onSummary ? (
              <>
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className="inline-flex items-center gap-1 rounded-2xl bg-white px-4 py-2 font-semibold text-zinc-800 ring-1 ring-zinc-300 hover:bg-zinc-50"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                    {t.back}
                  </button>
                ) : null}
                {step < sections.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    className="inline-flex items-center gap-1 rounded-2xl bg-[var(--accent)] px-4 py-2 font-semibold text-white hover:bg-[var(--accent)]/90"
                  >
                    {t.next}
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStep(sections.length)}
                    className="inline-flex items-center gap-1 rounded-2xl bg-[var(--brand)] px-4 py-2 font-semibold text-white hover:bg-[var(--brand-deep)]"
                  >
                    {t.finish}
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="inline-flex items-center gap-1 rounded-2xl bg-white px-4 py-2 font-semibold text-zinc-800 ring-1 ring-zinc-300 hover:bg-zinc-50"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  {t.edit}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1 rounded-2xl bg-[var(--accent)] px-4 py-2 font-semibold text-white hover:bg-[var(--accent)]/90"
                >
                  <Printer className="h-4 w-4" aria-hidden />
                  {t.print}
                </button>
                <button
                  type="button"
                  onClick={copySummary}
                  className="inline-flex items-center gap-1 rounded-2xl bg-[var(--brand)] px-4 py-2 font-semibold text-white hover:bg-[var(--brand-deep)]"
                >
                  {copied ? (
                    <Check className="h-4 w-4" aria-hidden />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden />
                  )}
                  {copied ? t.copied : t.copy}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Consent + clear */}
        <div className="mt-8 rounded-2xl bg-white p-4 ring-1 ring-[var(--hairline)] no-print">
          <label className="flex items-start gap-2 text-sm text-zinc-800">
            <input
              type="checkbox"
              checked={plan.consent}
              onChange={(e) => update("consent", e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-zinc-300"
            />
            <span>
              <span className="font-semibold">{t.saveOnDevice}</span>
              <span className="block text-xs text-zinc-600">
                {t.saveOnDeviceWarning}
              </span>
            </span>
          </label>
          <button
            type="button"
            onClick={clearAll}
            className="mt-3 inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700 hover:bg-red-100 hover:text-red-800"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden />
            {t.clear}
          </button>
        </div>

        <p className="mt-6 rounded-2xl bg-amber-50 p-3 text-xs text-amber-950 no-print">
          {t.legalNotice}
        </p>

        <p className="mt-4 text-sm no-print">
          <Link
            href={locale === "es" ? "/es/emergency" : "/emergency"}
            className="font-semibold text-[var(--brand-deep)] hover:underline"
          >
            ← {t.backToEmergency}
          </Link>
        </p>
      </main>
    </>
  );
}

function FormSection({
  step,
  sections,
  t,
  plan,
  update,
  docList,
}: {
  step: number;
  sections: ReturnType<typeof SECTIONS_PER_LOCALE>;
  t: PrepareCopy;
  plan: PlanData;
  update: <K extends keyof PlanData>(k: K, v: PlanData[K]) => void;
  docList: string[];
}) {
  const section = sections[step];
  const Icon = section.icon;
  return (
    <section className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-[var(--hairline)]">
      <header className="mb-4 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-zinc-900">
            {section.title}
          </h2>
          <p className="mt-1 text-sm text-zinc-700">{section.desc}</p>
        </div>
      </header>

      {section.key === "contacts" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={t.contactName} value={plan.contactName} onChange={(v) => update("contactName", v)} />
          <Field label={t.contactPhone} value={plan.contactPhone} onChange={(v) => update("contactPhone", v)} type="tel" />
          <Field label={t.contactRelationship} value={plan.contactRelationship} onChange={(v) => update("contactRelationship", v)} />
          <Field label={t.altContactName + " · " + t.optional} value={plan.altContactName} onChange={(v) => update("altContactName", v)} />
          <Field label={t.altContactPhone + " · " + t.optional} value={plan.altContactPhone} onChange={(v) => update("altContactPhone", v)} type="tel" />
        </div>
      )}

      {section.key === "children" && (
        <div className="space-y-3">
          <Textarea
            label={t.childrenPickups}
            value={plan.childrenPickups}
            onChange={(v) => update("childrenPickups", v)}
            rows={4}
            placeholder={t.placeholderPickup}
          />
          <Field label={t.schoolContact} value={plan.schoolContact} onChange={(v) => update("schoolContact", v)} type="tel" />
          <Textarea label={t.pickupNote + " · " + t.optional} value={plan.pickupNote} onChange={(v) => update("pickupNote", v)} rows={3} />
        </div>
      )}

      {section.key === "legal" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={t.lawyerName} value={plan.lawyerName} onChange={(v) => update("lawyerName", v)} />
          <Field label={t.lawyerPhone} value={plan.lawyerPhone} onChange={(v) => update("lawyerPhone", v)} type="tel" />
          <div className="sm:col-span-2">
            <Textarea label={t.caseNotes + " · " + t.optional} value={plan.caseNotes} onChange={(v) => update("caseNotes", v)} rows={3} />
          </div>
        </div>
      )}

      {section.key === "medical" && (
        <div className="space-y-3">
          <Field label={t.allergies + " · " + t.optional} value={plan.allergies} onChange={(v) => update("allergies", v)} />
          <Textarea label={t.medications + " · " + t.optional} value={plan.medications} onChange={(v) => update("medications", v)} rows={3} />
          <Field label={t.clinic} value={plan.clinic} onChange={(v) => update("clinic", v)} placeholder={t.placeholderClinic} />
        </div>
      )}

      {section.key === "documents" && (
        <div className="space-y-3">
          <ul className="grid gap-2 sm:grid-cols-2">
            {docList.map((label) => {
              const checked = plan.documents.includes(label);
              return (
                <li key={label}>
                  <label className="flex items-start gap-2 rounded-xl bg-[var(--accent-soft)]/40 p-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) =>
                        update(
                          "documents",
                          e.target.checked
                            ? [...plan.documents, label]
                            : plan.documents.filter((d) => d !== label)
                        )
                      }
                      className="mt-1 h-4 w-4 rounded border-zinc-300"
                    />
                    <span className="text-zinc-800">{label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
          <Textarea label={t.documentsOther + " · " + t.optional} value={plan.documentsOther} onChange={(v) => update("documentsOther", v)} rows={3} />
        </div>
      )}

      {section.key === "instructions" && (
        <div className="space-y-3">
          <Field label={t.whoToCallFirst} value={plan.whoToCallFirst} onChange={(v) => update("whoToCallFirst", v)} />
          <Textarea label={t.meetingPlace} value={plan.meetingPlace} onChange={(v) => update("meetingPlace", v)} rows={3} placeholder={t.placeholderMeeting} />
          <Textarea label={t.ifDetained} value={plan.ifDetained} onChange={(v) => update("ifDetained", v)} rows={4} placeholder={t.placeholderIfDetained} />
        </div>
      )}
    </section>
  );
}

function Summary({
  plan,
  locale,
  t,
  docList,
}: {
  plan: PlanData;
  locale: Locale;
  t: PrepareCopy;
  docList: string[];
}) {
  const date = new Date().toISOString().slice(0, 10);
  const checked = plan.documents;
  const unchecked = docList.filter((d) => !checked.includes(d));
  return (
    <section className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-[var(--hairline)] print:rounded-none print:p-0 print:ring-0">
      <p className="text-xs uppercase tracking-wider text-zinc-500 print:hidden">
        {t.summaryHeading}
      </p>
      <p className="mt-1 text-sm text-zinc-600 print:hidden">{t.summaryHint}</p>

      <header className="mt-4 hidden print:block">
        <h1 className="font-display text-3xl font-extrabold">
          {t.title}
        </h1>
        <p className="text-sm text-zinc-700">tengoderechos.org · {date}</p>
      </header>

      <Block heading={t.section1}>
        <KV k={t.contactName} v={plan.contactName} />
        <KV k={t.contactPhone} v={plan.contactPhone} />
        <KV k={t.contactRelationship} v={plan.contactRelationship} />
        <KV k={t.altContactName} v={plan.altContactName} />
        <KV k={t.altContactPhone} v={plan.altContactPhone} />
      </Block>
      <Block heading={t.section2}>
        <KV k={t.childrenPickups} v={plan.childrenPickups} multi />
        <KV k={t.schoolContact} v={plan.schoolContact} />
        <KV k={t.pickupNote} v={plan.pickupNote} multi />
      </Block>
      <Block heading={t.section3}>
        <KV k={t.lawyerName} v={plan.lawyerName} />
        <KV k={t.lawyerPhone} v={plan.lawyerPhone} />
        <KV k={t.caseNotes} v={plan.caseNotes} multi />
      </Block>
      <Block heading={t.section4}>
        <KV k={t.allergies} v={plan.allergies} />
        <KV k={t.medications} v={plan.medications} multi />
        <KV k={t.clinic} v={plan.clinic} />
      </Block>
      <Block heading={t.section5}>
        <ul className="mt-1 list-inside list-disc text-sm text-zinc-800">
          {checked.length === 0 ? (
            <li className="italic text-zinc-500">—</li>
          ) : (
            checked.map((d) => <li key={d}>{d}</li>)
          )}
        </ul>
        {unchecked.length ? (
          <p className="mt-2 text-xs text-zinc-500">
            {locale === "es" ? "Pendientes" : "Still to gather"}:{" "}
            {unchecked.join(" · ")}
          </p>
        ) : null}
        {plan.documentsOther ? (
          <p className="mt-2 whitespace-pre-line text-sm text-zinc-800">
            {plan.documentsOther}
          </p>
        ) : null}
      </Block>
      <Block heading={t.section6}>
        <KV k={t.whoToCallFirst} v={plan.whoToCallFirst} />
        <KV k={t.meetingPlace} v={plan.meetingPlace} multi />
        <KV k={t.ifDetained} v={plan.ifDetained} multi />
      </Block>

      <footer className="mt-6 text-xs text-zinc-500 print:mt-8">
        <p>{t.legalNotice}</p>
        <p className="mt-1 print:mt-2">
          {locale === "es" ? "Generado el" : "Generated on"} {date} ·
          tengoderechos.org
        </p>
      </footer>
    </section>
  );
}

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 break-inside-avoid">
      <h2 className="font-display text-base font-bold text-zinc-900 print:text-lg">
        {heading}
      </h2>
      <div className="mt-1.5">{children}</div>
    </section>
  );
}

function KV({ k, v, multi }: { k: string; v: string; multi?: boolean }) {
  if (!v) {
    return (
      <p className="text-sm">
        <span className="font-semibold text-zinc-700">{k}:</span>{" "}
        <span className="italic text-zinc-400">—</span>
      </p>
    );
  }
  return (
    <p className="text-sm text-zinc-800">
      <span className="font-semibold text-zinc-900">{k}:</span>{" "}
      {multi ? (
        <span className="block whitespace-pre-line">{v}</span>
      ) : (
        v
      )}
    </p>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
      />
    </label>
  );
}

function buildSummaryText(
  plan: PlanData,
  locale: Locale,
  t: PrepareCopy,
  docList: string[]
): string {
  const lines: string[] = [];
  lines.push(t.title.toUpperCase());
  lines.push("tengoderechos.org · " + new Date().toISOString().slice(0, 10));
  lines.push("");
  const push = (k: string, v: string) => {
    if (v) lines.push(`${k}: ${v}`);
  };
  lines.push(`# ${t.section1}`);
  push(t.contactName, plan.contactName);
  push(t.contactPhone, plan.contactPhone);
  push(t.contactRelationship, plan.contactRelationship);
  push(t.altContactName, plan.altContactName);
  push(t.altContactPhone, plan.altContactPhone);
  lines.push("");
  lines.push(`# ${t.section2}`);
  push(t.childrenPickups, plan.childrenPickups);
  push(t.schoolContact, plan.schoolContact);
  push(t.pickupNote, plan.pickupNote);
  lines.push("");
  lines.push(`# ${t.section3}`);
  push(t.lawyerName, plan.lawyerName);
  push(t.lawyerPhone, plan.lawyerPhone);
  push(t.caseNotes, plan.caseNotes);
  lines.push("");
  lines.push(`# ${t.section4}`);
  push(t.allergies, plan.allergies);
  push(t.medications, plan.medications);
  push(t.clinic, plan.clinic);
  lines.push("");
  lines.push(`# ${t.section5}`);
  if (plan.documents.length) lines.push("- " + plan.documents.join("\n- "));
  if (plan.documentsOther) lines.push(plan.documentsOther);
  const unchecked = docList.filter((d) => !plan.documents.includes(d));
  if (unchecked.length)
    lines.push(
      `(${locale === "es" ? "Pendientes" : "Still to gather"}: ${unchecked.join(", ")})`
    );
  lines.push("");
  lines.push(`# ${t.section6}`);
  push(t.whoToCallFirst, plan.whoToCallFirst);
  push(t.meetingPlace, plan.meetingPlace);
  push(t.ifDetained, plan.ifDetained);
  lines.push("");
  lines.push("--");
  lines.push(t.legalNotice);
  return lines.join("\n");
}
