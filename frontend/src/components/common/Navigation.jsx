import { useState } from "react";

export default function Navigation({
  items = [],
  className = "",
  onItemClick,
  brand,
}) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`w-full bg-white border-b border-secondary-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            {brand}
          </div>
          <div className="flex items-center md:hidden">
            <button
              aria-label="Ouvrir le menu"
              onClick={() => setOpen(!open)}
              className="p-2 rounded text-secondary-700 hover:bg-secondary-100"
            >
              ☰
            </button>
          </div>
          <div className="hidden md:flex md:items-center md:gap-4">
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onItemClick?.(item)}
                className="px-3 py-2 text-sm font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 rounded-md"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile */}
      {open && (
        <div className="md:hidden border-t border-secondary-200">
          <div className="px-2 py-3 space-y-1">
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => { setOpen(false); onItemClick?.(item); }}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 rounded-md"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

