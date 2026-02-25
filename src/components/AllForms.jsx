import { Plane, ShieldPlus } from 'lucide-react';
import { useState } from 'react';
import TicketForm from './TicketForm';
import TravelInsuranceForm from './TravelInsuranceForm';

export default function AllForms({ defaultTab }) {
  const [activeForm, setActiveForm] = useState(defaultTab || 'ticket');
  return (
    <>
      <div className="flex lg:hidden items-center gap-3 mb-3 py-2 overflow-x-auto">
        {[
          { name: 'ticket', label: 'Dummy Ticket', icon: <Plane size={18} /> },
          { name: 'insurance', label: 'Travel Insurance', icon: <ShieldPlus size={18} /> },
        ].map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveForm(item.name)}
            className={`flex items-center gap-2 py-2 px-4 text-sm font-light rounded-lg border border-gray-300 cursor-pointer duration-300 ${activeForm === item.name ? 'bg-primary-600 text-white' : 'bg-white hover:bg-gray-50'}`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {activeForm === 'ticket' && <TicketForm />}
      {activeForm === 'insurance' && <TravelInsuranceForm />}
    </>
  );
}
