import type { Locale } from "./i18n";

export type Step = {
  command: { en: string; es: string };
  detail: { en: string; es: string };
  say?: { en: string; es: string };
  doNot?: { en: string; es: string };
};

export type EmergencyGuide = {
  slug: string;
  title: { en: string; es: string };
  intro: { en: string; es: string };
  steps: Step[];
  reviewed?: boolean;
};

export const guides: EmergencyGuide[] = [
  {
    slug: "ice-at-door",
    title: { en: "ICE at your door", es: "ICE en tu puerta" },
    intro: {
      en: "If immigration officers come to your home, you may have certain rights. Stay calm and take it step by step.",
      es: "Si oficiales de inmigración llegan a tu casa, puedes tener ciertos derechos. Mantén la calma y sigue los pasos.",
    },
    steps: [
      {
        command: { en: "Stay calm", es: "Mantén la calma" },
        detail: {
          en: "Take a breath. You do not have to open the door immediately.",
          es: "Respira. No tienes que abrir la puerta inmediatamente.",
        },
      },
      {
        command: {
          en: "Do not open the door",
          es: "No abras la puerta",
        },
        detail: {
          en: "You generally do not have to open the door unless officers have a judicial warrant signed by a judge.",
          es: "Generalmente no tienes que abrir la puerta a menos que los oficiales tengan una orden judicial firmada por un juez.",
        },
        doNot: {
          en: "Do not open the door without seeing a judicial warrant.",
          es: "No abras la puerta sin ver una orden judicial.",
        },
      },
      {
        command: {
          en: "Ask for a warrant",
          es: "Pide la orden judicial",
        },
        detail: {
          en: "Ask them to slide any warrant under the door or hold it up to a window so you can read it.",
          es: "Pídeles que deslicen cualquier orden por debajo de la puerta o que la muestren por la ventana.",
        },
        say: {
          en: "Please slide the warrant under the door.",
          es: "Por favor deslice la orden por debajo de la puerta.",
        },
      },
      {
        command: {
          en: "You may remain silent",
          es: "Puedes permanecer en silencio",
        },
        detail: {
          en: "You generally have the right not to answer questions about your immigration status or where you were born.",
          es: "Generalmente tienes el derecho de no contestar preguntas sobre tu estatus migratorio o lugar de nacimiento.",
        },
        say: {
          en: "I choose to remain silent.",
          es: "Decido permanecer en silencio.",
        },
      },
      {
        command: {
          en: "Call a lawyer or trusted contact",
          es: "Llama a un abogado o contacto de confianza",
        },
        detail: {
          en: "If possible, contact a lawyer or family member right away.",
          es: "Si es posible, contacta a un abogado o familiar inmediatamente.",
        },
      },
      {
        command: {
          en: "Do not sign anything",
          es: "No firmes nada",
        },
        detail: {
          en: "Do not sign any document you do not understand or that has not been reviewed by a lawyer.",
          es: "No firmes ningún documento que no entiendas o que no haya sido revisado por un abogado.",
        },
        doNot: {
          en: "Do not sign documents without a lawyer.",
          es: "No firmes documentos sin un abogado.",
        },
      },
    ],
    reviewed: false,
  },
  {
    slug: "police-stop",
    title: { en: "Police traffic stop", es: "Parada de tránsito" },
    intro: {
      en: "If you are stopped by police while driving, stay calm and keep your movements visible.",
      es: "Si la policía te detiene manejando, mantén la calma y haz tus movimientos visibles.",
    },
    steps: [
      {
        command: { en: "Pull over safely", es: "Detente de forma segura" },
        detail: {
          en: "Use your turn signal and pull over to a safe spot.",
          es: "Usa la direccional y detente en un lugar seguro.",
        },
      },
      {
        command: {
          en: "Keep your hands visible",
          es: "Mantén las manos visibles",
        },
        detail: {
          en: "Place your hands on the steering wheel. Move slowly.",
          es: "Coloca tus manos en el volante. Muévete despacio.",
        },
      },
      {
        command: {
          en: "Provide required documents",
          es: "Entrega los documentos requeridos",
        },
        detail: {
          en: "If you are driving, you generally must show license, registration, and insurance when asked.",
          es: "Si manejas, generalmente debes mostrar licencia, registración y seguro cuando se pida.",
        },
      },
      {
        command: {
          en: "You may ask if you are free to leave",
          es: "Puedes preguntar si eres libre de irte",
        },
        detail: {
          en: "If they say yes, you may calmly leave.",
          es: "Si dicen que sí, puedes irte con calma.",
        },
        say: {
          en: "Officer, am I free to go?",
          es: "Oficial, ¿soy libre de irme?",
        },
      },
      {
        command: {
          en: "You may remain silent",
          es: "Puedes permanecer en silencio",
        },
        detail: {
          en: "You generally do not have to answer questions beyond identifying yourself when required.",
          es: "Generalmente no tienes que responder más preguntas además de identificarte cuando se requiera.",
        },
        say: {
          en: "I choose to remain silent.",
          es: "Decido permanecer en silencio.",
        },
      },
      {
        command: {
          en: "Do not consent to searches",
          es: "No consientas registros",
        },
        detail: {
          en: "You may say you do not consent. Do not physically resist.",
          es: "Puedes decir que no consientes. No te resistas físicamente.",
        },
        say: {
          en: "I do not consent to a search.",
          es: "No consiento al registro.",
        },
        doNot: {
          en: "Do not argue, run, or touch the officer.",
          es: "No discutas, no corras, no toques al oficial.",
        },
      },
    ],
    reviewed: false,
  },
  {
    slug: "border-patrol",
    title: { en: "Border Patrol encounter", es: "Encuentro con la Patrulla Fronteriza" },
    intro: {
      en: "Border Patrol agents have certain authority near the border. You may still have rights.",
      es: "Los agentes de la Patrulla Fronteriza tienen cierta autoridad cerca de la frontera. Aun así puedes tener derechos.",
    },
    steps: [
      {
        command: { en: "Stay calm", es: "Mantén la calma" },
        detail: { en: "Breathe. Do not run.", es: "Respira. No corras." },
      },
      {
        command: {
          en: "Ask if you are free to leave",
          es: "Pregunta si eres libre de irte",
        },
        detail: {
          en: "If they say yes, you may calmly leave.",
          es: "Si dicen que sí, puedes irte con calma.",
        },
        say: {
          en: "Am I free to leave?",
          es: "¿Soy libre de irme?",
        },
      },
      {
        command: {
          en: "You may remain silent",
          es: "Puedes permanecer en silencio",
        },
        detail: {
          en: "You generally do not have to answer questions about where you were born or your immigration status.",
          es: "Generalmente no tienes que contestar preguntas sobre dónde naciste o tu estatus migratorio.",
        },
        say: {
          en: "I choose to remain silent.",
          es: "Decido permanecer en silencio.",
        },
      },
      {
        command: {
          en: "Do not provide false documents",
          es: "No entregues documentos falsos",
        },
        detail: {
          en: "Never present false papers. It can carry serious consequences.",
          es: "Nunca presentes papeles falsos. Puede tener consecuencias graves.",
        },
        doNot: {
          en: "Do not lie about your citizenship.",
          es: "No mientas sobre tu ciudadanía.",
        },
      },
      {
        command: {
          en: "Ask for a lawyer if detained",
          es: "Pide un abogado si te detienen",
        },
        detail: {
          en: "If you are detained, ask to speak with a lawyer before answering questions or signing anything.",
          es: "Si te detienen, pide hablar con un abogado antes de contestar o firmar.",
        },
        say: {
          en: "I want to speak to a lawyer.",
          es: "Quiero hablar con un abogado.",
        },
      },
    ],
    reviewed: false,
  },
  {
    slug: "medical",
    title: { en: "Medical help without insurance", es: "Ayuda médica sin seguro" },
    intro: {
      en: "If you have an emergency, do not avoid care because of fear or insurance status.",
      es: "Si tienes una emergencia, no evites la atención por miedo o falta de seguro.",
    },
    steps: [
      {
        command: { en: "If it is an emergency, call 911", es: "Si es emergencia, llama al 911" },
        detail: {
          en: "Or go to the nearest Emergency Room.",
          es: "O ve a la sala de emergencias más cercana.",
        },
      },
      {
        command: {
          en: "Emergency rooms generally help",
          es: "Las salas de emergencia generalmente ayudan",
        },
        detail: {
          en: "Under federal law, ERs typically must screen and stabilize emergency conditions regardless of ability to pay or immigration status.",
          es: "Bajo la ley federal, las salas de emergencia generalmente deben evaluar y estabilizar emergencias sin importar capacidad de pago o estatus migratorio.",
        },
      },
      {
        command: {
          en: "Ask for financial assistance",
          es: "Pide asistencia financiera",
        },
        detail: {
          en: "Many hospitals have charity care or sliding-scale programs. Ask the billing department.",
          es: "Muchos hospitales tienen ayuda económica o tarifas según ingresos. Pregunta en facturación.",
        },
        say: {
          en: "Do you offer financial assistance or charity care?",
          es: "¿Ofrecen asistencia financiera o ayuda económica?",
        },
      },
      {
        command: {
          en: "Look for community clinics",
          es: "Busca clínicas comunitarias",
        },
        detail: {
          en: "Community health centers (FQHCs) offer care on a sliding fee. They serve everyone.",
          es: "Las clínicas comunitarias ofrecen tarifas según ingresos y atienden a todos.",
        },
      },
      {
        command: {
          en: "Bring ID if available",
          es: "Lleva identificación si la tienes",
        },
        detail: {
          en: "Helpful but not required for emergency care. Do not skip emergency care out of fear.",
          es: "Útil pero no obligatorio para emergencias. No evites la atención por miedo.",
        },
      },
    ],
    reviewed: false,
  },
];

export function getGuide(slug: string): EmergencyGuide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function pick<T>(locale: Locale, val: { en: T; es: T }): T {
  return val[locale];
}
