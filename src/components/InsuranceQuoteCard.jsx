export default function InsuranceQuoteCard({ quote, onClick, isSelected = false }) {
  const benefitsArray = Object.values(quote?.benefits || {});

  return (
    <div
      className={`md:min-w-auto bg-white rounded-3xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-300 mb-2 cursor-pointer ${isSelected ? 'border-primary-500' : 'border-gray-200'}`}
      onClick={onClick}
    >
      <h2 className="font-light text-2xl mb-5 pb-4 border-b border-gray-200">
        {quote?.name?.split(' - ')?.[1] || quote?.name}
      </h2>

      <h3 className="text-sm font-light text-gray-900 mb-3">Key Benefits</h3>

      <ul className="flex flex-col gap-3">
        {benefitsArray.slice(0, 5).map((benefit, i) => (
          <li key={i} className="flex justify-between items-center gap-3 text-[12px] lg:text-sm">
            <span className="font-light text-gray-500 text-left">{benefit?.cover}</span>
            <span className="font-light text-gray-800 text-right">{benefit?.amount}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-5 border-t border-gray-200 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-light text-gray-500">Total Premium</span>
          <span className="text-xl font-normal text-gray-900">
            {quote?.currency?.toUpperCase()} {Number(quote?.premium).toFixed(0)}
          </span>
        </div>
        <button
          type="button"
          className={`font-light text-sm px-5 py-2 rounded-lg duration-300 ${isSelected ? 'bg-primary-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black cursor-pointer'}`}
          onClick={onClick}
        >
          {isSelected ? 'Selected' : 'Select'}
        </button>
      </div>
    </div>
  );
}
