const SHADOW_CLASSES = {
  none: "",
  sm: "shadow",
  md: "shadow-md",
  lg: "shadow-lg",
  soft: "shadow-soft",
};

const RADIUS_CLASSES = {
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

const PADDING_CLASSES = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

const Card = ({
  className = "",
  children,
  title,
  subtitle,
  header,
  footer,
  interactive = false,
  hover = true,
  shadow = "md",
  radius = "md",
  padding = "md",
  bordered = false,
}) => {
  const base = "bg-white";
  const hoverClasses = hover ? "transition hover:shadow-hover" : "";
  const interactiveClasses = interactive ? "cursor-pointer" : "";
  const borderClasses = bordered ? "border border-secondary-200" : "";
  const shadowClasses = SHADOW_CLASSES[shadow] || SHADOW_CLASSES.md;
  const radiusClasses = RADIUS_CLASSES[radius] || RADIUS_CLASSES.md;
  const paddingClasses = PADDING_CLASSES[padding] || PADDING_CLASSES.md;

  return (
    <div className={`${base} ${shadowClasses} ${radiusClasses} ${paddingClasses} ${borderClasses} ${hoverClasses} ${interactiveClasses} ${className}`}>
      {header || title || subtitle ? (
        <div className="mb-3">
          {header ? (
            header
          ) : (
            <>
              {title && <h3 className="text-lg font-semibold text-secondary-900">{title}</h3>}
              {subtitle && <p className="text-sm text-secondary-500 mt-1">{subtitle}</p>}
            </>
          )}
        </div>
      ) : null}

      <div>
        {children}
      </div>

      {footer ? (
        <div className="mt-4">
          {footer}
        </div>
      ) : null}
    </div>
  );
};

export default Card;
  