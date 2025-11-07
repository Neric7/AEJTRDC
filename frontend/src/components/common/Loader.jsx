const SIZE = {
  xs: "h-4 w-4",
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export default function Loader({ size = "md", className = "", label }) {
  const sizeCls = SIZE[size] || SIZE.md;
  return (
    <div className="inline-flex items-center gap-2">
      <svg className={`animate-spin ${sizeCls} ${className}`} viewBox="0 0 24 24" aria-hidden="true" role="status">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      {label ? <span className="text-sm text-secondary-600">{label}</span> : null}
    </div>
  );
}

