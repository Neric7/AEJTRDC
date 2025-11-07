const VARIANT_CLASSES = {
  primary: "bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-400",
  secondary: "bg-secondary-800 text-white hover:bg-secondary-900 disabled:bg-secondary-700",
  outline: "border border-secondary-300 text-secondary-800 hover:bg-secondary-100 disabled:text-secondary-400",
  ghost: "text-secondary-800 hover:bg-secondary-100 disabled:text-secondary-400",
  danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400",
};

const SIZE_CLASSES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const RADIUS_CLASSES = {
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const Spinner = ({ className = "" }) => (
  <svg className={`animate-spin h-4 w-4 ${className}`} viewBox="0 0 24 24" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
  </svg>
);

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
  size = "md",
  radius = "md",
  leadingIcon = null,
  trailingIcon = null,
  loading = false,
  disabled = false,
  fullWidth = false,
  ariaLabel,
}) => {
  const isDisabled = disabled || loading;
  const base = "inline-flex items-center justify-center gap-2 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500";
  const width = fullWidth ? "w-full" : "";
  const variantClasses = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
  const sizeClasses = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  const radiusClasses = RADIUS_CLASSES[radius] || RADIUS_CLASSES.md;

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={isDisabled}
      className={`${base} ${variantClasses} ${sizeClasses} ${radiusClasses} ${width} disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {loading ? (
        <Spinner className="text-current" />
      ) : (
        <>
          {leadingIcon}
          <span>{children}</span>
          {trailingIcon}
        </>
      )}
    </button>
  );
};

export default Button;
  