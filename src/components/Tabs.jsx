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
      className={`px-4 py-2 rounded-lg text-sm cursor-pointer ${
        active ? 'bg-primary-700 text-white' : 'text-gray-600'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
