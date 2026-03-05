import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { InsuranceContext } from '../../../context/InsuranceContext';
import { useNationalities } from '../../../hooks/insurance/useNationalities';
import { CalendarDaysIcon } from 'lucide-react';
import { formatDate } from '../../../utils/formatDate';
import { useFinalizeInsurance } from '../../../hooks/insurance/useFinalizeInsurance';
import Email from '../../../components/FormElements/Email';
import SelectTitle from '../../../components/FormElements/SelectTitle';
import Input from '../../../components/FormElements/Input';
import SearchNationality from '../../../components/FormElements/SearchNationality';
import SelectDate from '../../../components/FormElements/SelectDate';
import PhoneNumber from '../../../components/FormElements/PhoneNumber';
import { useLocalStorage } from '../../../hooks/general/useLocalStorage';
import { todayDateOnly } from '../../../utils/dateOnly';

const pageData = {
  meta: {
    title: 'Passenger Details - Travel Insurance',
    description:
      'Dummy tickets are flight reservations travelers use for various purposes, including visa applications. Book yours with My Dummy Ticket. Starting from AED 49.',
    canonical: 'https://www.mydummyticket.ae/travel-insurance/passenger-details',
  },
  sections: {},
};

export default function PassengerDetails() {
  const { updateLocalStorage } = useLocalStorage();
  const { finalizeInsurance, isFinalizing } = useFinalizeInsurance();
  const { nationalities } = useNationalities();
  const {
    quoteId,
    schemeId,
    journeyType,
    startDate,
    endDate,
    region,
    email,
    mobile,
    address1,
    address3,
    address4,
    quantity,
    passengers,
    handlePhoneChange,
    handleEmailChange,
    handleAddress1Change,
    handleAddress3Change,
    handleAddress4Change,
    handleUpdatePassenger,
  } = useContext(InsuranceContext);

  function validateRequiredFields() {
    for (let i = 0; i < passengers.length; i += 1) {
      const passenger = passengers[i];
      const passengerLabel = `${passenger.type === 'adults' ? 'Adult' : passenger.type === 'children' ? 'Child' : 'Senior'} ${i + 1}`;

      if (!passenger.title) {
        toast.error(`${passengerLabel}: title is required`);
        return false;
      }
      if (!passenger.firstName?.trim()) {
        toast.error(`${passengerLabel}: first name is required`);
        return false;
      }
      if (!passenger.lastName?.trim()) {
        toast.error(`${passengerLabel}: last name is required`);
        return false;
      }
      if (!passenger.dob) {
        toast.error(`${passengerLabel}: date of birth is required`);
        return false;
      }
      if (!passenger.nationality?.id) {
        toast.error(`${passengerLabel}: nationality is required`);
        return false;
      }
      if (!passenger.passport?.trim()) {
        toast.error(`${passengerLabel}: passport number is required`);
        return false;
      }
    }

    if (!email?.trim()) {
      toast.error('Email address is required');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!mobile?.code || !mobile?.digits?.trim()) {
      toast.error('Phone number is required');
      return false;
    }
    if (!address1?.trim()) {
      toast.error('Address is required');
      return false;
    }
    if (!address3?.trim()) {
      toast.error('City is required');
      return false;
    }
    if (!address4?.trim()) {
      toast.error('Country is required');
      return false;
    }

    return true;
  }

  function handleSubmit() {
    if (!validateRequiredFields()) return;

    const obj = {
      quoteId,
      schemeId,
      journeyType,
      startDate,
      endDate,
      region,
      quantity,
      passengers,
      email,
      mobile,
      address1,
      address2: '',
      address3,
      address4,
    };

    updateLocalStorage('travelInsurance', obj);

    finalizeInsurance(obj);
  }

  return (
    <>
      <Helmet>
        <title>{pageData.meta.title}</title>
        <link rel="canonical" href={pageData.meta.canonical} />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content={pageData.meta.description} />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          {passengers?.map((passenger, i) => (
            <div
              key={passenger.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-light text-gray-900">
                  {passenger.type === 'adults'
                    ? 'Adult'
                    : passenger.type === 'children'
                      ? 'Child'
                      : 'Senior'}{' '}
                  {i + 1}
                </h2>

                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                  Passenger Details
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block mb-1 text-sm font-light text-gray-700">Title</label>
                  <SelectTitle
                    value={passenger.title}
                    onChange={e => handleUpdatePassenger(passenger.id, 'title', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-light text-gray-700">First Name</label>
                  <Input
                    value={passenger.firstName}
                    onChange={e => handleUpdatePassenger(passenger.id, 'firstName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-light text-gray-700">Last Name</label>
                  <Input
                    value={passenger.lastName}
                    onChange={e => handleUpdatePassenger(passenger.id, 'lastName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-light text-gray-700">
                    Date of Birth
                  </label>
                  <SelectDate
                    selectedDate={passenger.dob ? formatDate(passenger.dob) : ''}
                    onDateSelect={date => handleUpdatePassenger(passenger.id, 'dob', date)}
                    minYear={1900}
                    maxDate={todayDateOnly()}
                    icon={<CalendarDaysIcon size={20} />}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-light text-gray-700">Nationality</label>
                  <SearchNationality
                    items={nationalities}
                    value={passenger.nationality}
                    onChange={value => handleUpdatePassenger(passenger.id, 'nationality', value)}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-light text-gray-700">
                    Passport Number
                  </label>
                  <Input
                    value={passenger.passport}
                    onChange={e => handleUpdatePassenger(passenger.id, 'passport', e.target.value)}
                  />
                </div>
              </div>

              {i === 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-2xl font-light text-gray-800 mb-4">
                    Primary Contact Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-1 text-sm font-light text-gray-700">
                        Email Address
                      </label>
                      <Email value={email} onChange={handleEmailChange} />
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-light text-gray-700">
                        Phone Number
                      </label>
                      <PhoneNumber phoneNumber={mobile} setPhoneNumber={handlePhoneChange} />
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-light text-gray-700">Address</label>
                      <Input value={address1} onChange={handleAddress1Change} />
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-light text-gray-700">City</label>
                      <Input value={address3} onChange={handleAddress3Change} />
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-light text-gray-700">Country</label>
                      <Input value={address4} onChange={handleAddress4Change} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isFinalizing}
            className="w-full sm:w-auto px-10 py-3 rounded-xl bg-accent-500 text-white text-sm font-medium cursor-pointer
                 hover:bg-accent-600 transition shadow-sm"
          >
            {isFinalizing ? 'Loading' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    </>
  );
}
