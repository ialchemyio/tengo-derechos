// Tengo Derechos brand shield. Inline SVG → tree-shakes to bytes, sizes via
// the size prop, recolors via the variant. Single source of truth shared
// with public/icons/icon.svg + scripts/generate-icons.mjs.

type Variant = "full" | "red" | "mono" | "white";

type Props = {
  size?: number;
  className?: string;
  variant?: Variant;
  title?: string;
};

const COLORS: Record<
  Variant,
  {
    shield: string;
    inner: string;
    innerShadow: string;
    paper: string;
    paperFold: string;
    figure: string;
    figureChild: string;
    arc: string;
    line: string;
  }
> = {
  full: {
    shield: "#1f2c44",
    inner: "#b4571f",
    innerShadow: "#9a4a17",
    paper: "#fbf7ef",
    paperFold: "#e9e1d3",
    figure: "#fbf7ef",
    figureChild: "#1f2c44",
    arc: "#b4571f",
    line: "#1f2c44",
  },
  red: {
    shield: "#8a1f12",
    inner: "#b9341d",
    innerShadow: "#8a261a",
    paper: "#fbf7ef",
    paperFold: "#f0d8d2",
    figure: "#fbf7ef",
    figureChild: "#8a1f12",
    arc: "#b9341d",
    line: "#8a1f12",
  },
  mono: {
    shield: "currentColor",
    inner: "currentColor",
    innerShadow: "currentColor",
    paper: "transparent",
    paperFold: "transparent",
    figure: "currentColor",
    figureChild: "transparent",
    arc: "currentColor",
    line: "currentColor",
  },
  white: {
    shield: "#ffffff",
    inner: "#ffffff",
    innerShadow: "#e5e7ec",
    paper: "#1f2c44",
    paperFold: "#3a4866",
    figure: "#1f2c44",
    figureChild: "#ffffff",
    arc: "#ffffff",
    line: "#1f2c44",
  },
};

export function BrandMark({
  size = 40,
  className,
  variant = "full",
  title = "Tengo Derechos",
}: Props) {
  const c = COLORS[variant];
  const isMono = variant === "mono";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * (240 / 220)}
      viewBox="0 0 220 240"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>

      {/* Shield outer */}
      <path
        d="M110 10
           C76 10 44 18 22 30
           L22 116
           C22 168 60 208 110 228
           C160 208 198 168 198 116
           L198 30
           C176 18 144 10 110 10 Z"
        fill={c.shield}
        stroke={isMono ? "currentColor" : "none"}
        strokeWidth={isMono ? 8 : 0}
      />

      {/* Inner clay shield + tonal split (right side warmer/darker) */}
      <path
        d="M110 28
           C82 28 56 35 38 45
           L38 114
           C38 156 68 188 110 204
           C152 188 182 156 182 114
           L182 45
           C164 35 138 28 110 28 Z"
        fill={c.inner}
        opacity={isMono ? 0.18 : 1}
      />
      {!isMono ? (
        <path
          d="M110 28
             C138 28 164 35 182 45
             L182 114
             C182 156 152 188 110 204
             L110 28 Z"
          fill={c.innerShadow}
          opacity="0.55"
        />
      ) : null}

      {/* Document with folded corner */}
      <g transform="translate(108 50) rotate(6)">
        <path
          d="M0 0 H36 L48 12 V58 H0 Z"
          fill={c.paper}
          stroke={isMono ? "currentColor" : "none"}
          strokeWidth={isMono ? 3 : 0}
        />
        <path d="M36 0 L48 12 H38 C36 12 36 10 36 8 Z" fill={c.paperFold} />
        <rect x="6" y="20" width="22" height="3" rx="1.5" fill={c.line} />
        <rect x="6" y="28" width="32" height="3" rx="1.5" fill={c.line} />
        <rect x="6" y="36" width="22" height="3" rx="1.5" fill={c.line} />
        <rect x="6" y="44" width="28" height="3" rx="1.5" fill={c.line} />
      </g>

      {/* Three-arc signal */}
      <g
        transform="translate(154 32) rotate(-8)"
        fill="none"
        stroke={c.arc}
        strokeWidth={6}
        strokeLinecap="round"
      >
        <path d="M0 12 A12 12 0 0 1 12 0" />
        <path d="M0 22 A22 22 0 0 1 22 0" opacity="0.7" />
        <path d="M0 32 A32 32 0 0 1 32 0" opacity="0.4" />
      </g>

      {/* Parent figure */}
      <g transform="translate(50 80)" fill={c.figure}>
        <circle cx="38" cy="14" r="14" />
        <path
          d="M14 86
             C14 56 26 32 42 32
             C56 32 70 42 70 60
             L70 102
             C70 116 56 122 42 122
             C26 122 14 116 14 102 Z"
        />
      </g>

      {/* Child overlay */}
      {!isMono ? (
        <g transform="translate(50 80)" fill={c.figureChild} opacity="0.92">
          <circle cx="50" cy="60" r="9" />
          <path
            d="M34 72
               C34 66 40 62 48 62
               C58 62 64 68 64 78
               L64 96
               C64 104 58 106 50 106
               C40 106 34 104 34 96 Z"
          />
        </g>
      ) : null}
    </svg>
  );
}

/** Horizontal lockup: mark + Fraunces wordmark, optional tagline. */
export function BrandLockup({
  height = 36,
  className,
  variant = "full",
  showTagline = false,
}: {
  height?: number;
  className?: string;
  variant?: Variant;
  showTagline?: boolean;
}) {
  const wordColor =
    variant === "white" || variant === "mono" ? "currentColor" : "#1f2c44";
  const tagColor =
    variant === "white" || variant === "mono" ? "currentColor" : "#3a4866";
  const markHeight = height;
  const markWidth = height * (220 / 240);
  return (
    <span
      className={`inline-flex items-center gap-3 ${className ?? ""}`}
      style={{ height: markHeight }}
    >
      <span
        className="block shrink-0"
        style={{ width: markWidth, height: markHeight }}
      >
        <BrandMark size={markWidth} variant={variant} />
      </span>
      <span className="flex flex-col leading-[0.95]">
        <span
          className="font-display font-extrabold tracking-tight"
          style={{ color: wordColor, fontSize: height * 0.62 }}
        >
          Tengo Derechos
        </span>
        {showTagline ? (
          <span
            style={{
              color: tagColor,
              fontSize: height * 0.26,
              marginTop: height * 0.08,
            }}
            className="opacity-80"
          >
            Tus derechos. Tu familia. Tu protección.
          </span>
        ) : null}
      </span>
    </span>
  );
}
