import { useEffect, useRef } from "react";

const SIZES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  className = "",
  size = "md",
  closeOnOverlay = true,
  footer,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const sizeClasses = SIZES[size] || SIZES.md;

  return (
    <div
      className="fixed inset-0 z-80 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeOnOverlay ? onClose : undefined}
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`relative w-full ${sizeClasses} mx-4 bg-white rounded-lg shadow-lg focus:outline-none ${className}`}
      >
        {(title || onClose) && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-secondary-200">
            {title ? (
              <h2 id="modal-title" className="text-lg font-semibold text-secondary-900">
                {title}
              </h2>
            ) : <span />}
            {onClose && (
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="text-secondary-500 hover:text-secondary-700"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div className="px-5 py-4">
          {children}
        </div>

        {footer && (
          <div className="px-5 py-4 border-t border-secondary-200">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

