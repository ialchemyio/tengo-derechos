// Tengo Derechos brand shield. Reuse everywhere we used to drop a generic
// lucide Shield. Keep it as inline SVG so it tree-shakes to bytes and can
// inherit text color via CSS variables when needed.

type Props = {
  size?: number;
  className?: string;
  /** 'full' = navy + clay + cream details. 'red' = emergency variant.
   *  'mono' = single-color outline (uses currentColor). */
  variant?: "full" | "red" | "mono" | "white";
  title?: string;
};

const COLORS = {
  full: { shield: "#1f2c44", inner: "#b4571f", paper: "#fbf7ef", figure: "#fbf7ef", arc: "#b4571f" },
  red: { shield: "#8a1f12", inner: "#b9341d", paper: "#fbf7ef", figure: "#fbf7ef", arc: "#b9341d" },
  mono: { shield: "currentColor", inner: "currentColor", paper: "transparent", figure: "currentColor", arc: "currentColor" },
  white: { shield: "#ffffff", inner: "#ffffff", paper: "#1f2c44", figure: "#1f2c44", arc: "#ffffff" },
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
      height={size}
      viewBox="0 0 200 220"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      {/* Outer shield */}
      <path
        d="M100 6
           L18 30
           L18 110
           C18 158 56 196 100 214
           C144 196 182 158 182 110
           L182 30 Z"
        fill={c.shield}
        stroke={isMono ? "currentColor" : "none"}
        strokeWidth={isMono ? 8 : 0}
      />
      {/* Inner clay shield */}
      <path
        d="M100 26
           L40 44
           L40 108
           C40 146 68 178 100 192
           C132 178 160 146 160 108
           L160 44 Z"
        fill={c.inner}
        opacity={isMono ? 0.18 : 1}
      />

      {/* Document (top-right) with lines */}
      <g transform="translate(108 50) rotate(8)">
        <rect width="42" height="52" rx="4" fill={c.paper} stroke={isMono ? "currentColor" : "none"} strokeWidth={isMono ? 3 : 0} />
        <rect x="6" y="10" width="22" height="3" rx="1.5" fill={c.shield} />
        <rect x="6" y="18" width="30" height="3" rx="1.5" fill={c.shield} />
        <rect x="6" y="26" width="22" height="3" rx="1.5" fill={c.shield} />
        <rect x="6" y="34" width="26" height="3" rx="1.5" fill={c.shield} />
      </g>

      {/* Signal arcs above the document — broadcast / reach */}
      <g
        transform="translate(150 38)"
        fill="none"
        stroke={c.arc}
        strokeWidth="6"
        strokeLinecap="round"
      >
        <path d="M0 14 A14 14 0 0 1 14 0" />
        <path d="M0 26 A26 26 0 0 1 26 0" opacity="0.55" />
      </g>

      {/* Parent + child — abstract: large head/body cradling a smaller one */}
      <g transform="translate(56 76)">
        {/* Parent head */}
        <circle cx="38" cy="14" r="14" fill={c.figure} />
        {/* Parent body cradling */}
        <path
          d="M10 80
             C10 50 24 34 38 34
             C50 34 64 44 64 60
             L64 96
             C64 110 50 116 38 116
             C26 116 10 110 10 96 Z"
          fill={c.figure}
        />
        {/* Child head */}
        <circle cx="46" cy="58" r="9" fill={c.shield} opacity={isMono ? 0 : 0.9} />
        {/* Child body */}
        <path
          d="M30 70
             C30 64 36 60 44 60
             C54 60 60 66 60 76
             L60 92
             C60 100 54 102 46 102
             C36 102 30 100 30 92 Z"
          fill={c.shield}
          opacity={isMono ? 0 : 0.9}
        />
      </g>
    </svg>
  );
}

/** Horizontal lockup: mark + wordmark. Used in SiteHeader / PressView. */
export function BrandLockup({
  height = 36,
  className,
  variant = "full",
  showTagline = false,
}: {
  height?: number;
  className?: string;
  variant?: "full" | "red" | "mono" | "white";
  showTagline?: boolean;
}) {
  const wordColor =
    variant === "white" || variant === "mono" ? "currentColor" : "#1f2c44";
  const tagColor =
    variant === "white" || variant === "mono" ? "currentColor" : "#3a4866";
  return (
    <span
      className={`inline-flex items-center gap-3 ${className ?? ""}`}
      style={{ height }}
    >
      <BrandMark size={height} variant={variant} />
      <span className="flex flex-col leading-tight">
        <span
          className="font-display font-extrabold tracking-tight"
          style={{ color: wordColor, fontSize: height * 0.58 }}
        >
          Tengo Derechos
        </span>
        {showTagline ? (
          <span
            style={{ color: tagColor, fontSize: height * 0.28 }}
            className="opacity-80"
          >
            Tus derechos. Tu familia. Tu protección.
          </span>
        ) : null}
      </span>
    </span>
  );
}
