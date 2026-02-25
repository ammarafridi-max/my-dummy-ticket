export function Tabs({ items, activeValue, onChange, className = '' }) {
  return (
    <div className={`mb-5 inline-flex bg-white border border-gray-200 rounded-xl p-1 ${className}`}>
      {items.map((item) => (
        <TabButton
          key={item.value}
          active={activeValue === item.value}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </TabButton>
      ))}
    </div>
  );
}

export function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-xs md:text-sm transition-colors ${
        active
          ? 'border-primary-700 bg-primary-700 text-white'
          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
