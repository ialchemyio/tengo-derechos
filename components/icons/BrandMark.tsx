// Tengo Derechos brand. The canonical artwork lives at
// /public/icons/brand.svg (and is also served at /public/icons/icon.svg).
// We render via <img> so the 280KB asset is loaded once per browser and
// shared by every consumer (header, footer, share cards, prepare, press,
// etc.) instead of being inlined into every component bundle.
//
// 'variant' picks a tint by swapping the source asset:
//   full  -> /icons/brand.svg            (original navy + clay + gold)
//   white -> /icons/brand-white.svg      (white-on-navy panel — generated later)
//   red   -> /icons/brand-red.svg        (emergency variant — generated later)
//   mono  -> /icons/brand-mono.svg       (current-color outline)
// For now (until tinted variants are exported) we default everything to the
// canonical brand.svg.

type Variant = "full" | "red" | "mono" | "white";

type Props = {
  size?: number;
  className?: string;
  variant?: Variant;
  title?: string;
  /** When true, omit the soft drop shadow under the mark. */
  flat?: boolean;
};

const SRC: Record<Variant, string> = {
  full: "/icons/brand.svg",
  red: "/icons/brand.svg",
  mono: "/icons/brand.svg",
  white: "/icons/brand.svg",
};

export function BrandMark({
  size = 40,
  className,
  variant = "full",
  title = "Tengo Derechos",
}: Props) {
  // The canonical SVG has 1:1 aspect ratio so width === height.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SRC[variant]}
      width={size}
      height={size}
      alt={title}
      className={className}
      style={{ display: "inline-block", flexShrink: 0 }}
      loading="eager"
      decoding="async"
    />
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
  return (
    <span
      className={`inline-flex items-center gap-3 ${className ?? ""}`}
      style={{ height }}
    >
      <BrandMark size={height} variant={variant} />
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
