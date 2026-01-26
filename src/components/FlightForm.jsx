import { useContext, useEffect, useState } from 'react';
import { useCreateDummyTicket } from '../hooks/ticket/useCreateDummyTicket';
import { formatDate } from '../utils/formatDate';
import { trackFlightFormSubmission } from '../lib/analytics';
import { validate } from 'email-validator';
import { TicketContext } from '../context/TicketContext';
import Input from './FormElements/Input';
import Label from './FormElements/Label';
import SelectDate from './FormElements/SelectDate';
import SelectTitle from './FormElements/SelectTitle';
import TextArea from './FormElements/TextArea';
import Email from './FormElements/Email';
import PhoneNumber from './FormElements/PhoneNumber';
import PrimaryButton from './PrimaryButton';
import SegmentedRadioGroup from './FormElements/SegmentedRadioGroup';

const FormRow = ({ children }) => <div className="block lg:grid lg:grid-cols-2 lg:gap-2.5">{children}</div>;
const FormItem = ({ children }) => <div className="w-full flex flex-col gap-1.5 mb-3 lg:mb-5">{children}</div>;

export default function FlightForm() {
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const { createDummyTicket, isCreatingDummyTicket } = useCreateDummyTicket()
  const {
    type,
    from,
    to,
    departureDate,
    returnDate,
    quantity,
    passengers,
    email,
    phoneNumber,
    message,
    ticketValidity,
    receiveNow,
    deliveryDate,
    departureFlight,
    returnFlight,
    setEmail,
    setPhoneNumber,
    setReceiveNow,
    setDeliveryDate,
    setMessage,
    initializePassengers,
    updatePassengerData,
    updatePricing,
  } = useContext(TicketContext);

  useEffect(() => {
    if (quantity && passengers.length === 0) {
      initializePassengers(quantity);
    }
  }, [quantity, passengers]);

  useEffect(() => {
    function validateForm(){
      if (passengers?.some(p => !p.title || !p.firstName || !p.lastName)) {
        setIsBtnDisabled(true);
        return false
      }
      if (!email) {
        setIsBtnDisabled(true);
        return false
      }
      if (!validate(email)) {
        setIsBtnDisabled(true);
        return false;
      }
      if (!phoneNumber.code || !phoneNumber.digits) {
        setIsBtnDisabled(true);
        return false;
      }
      if (!receiveNow && !deliveryDate) {
        setIsBtnDisabled(true);
        return false;
      }
      setIsBtnDisabled(false)
      return true
    }
    validateForm()
  }, [passengers, email, phoneNumber, receiveNow, deliveryDate])

  async function handleSubmit(e) {
    e.preventDefault();
    if (isCreatingDummyTicket) return;
    localStorage.setItem('email', email);
    localStorage.setItem('phoneNumber', JSON.stringify(phoneNumber));

    trackFlightFormSubmission({
      passengers,
      email,
      phoneNumber,
      ticketValidity,
      flightDetails: { departureFlight, returnFlight: type === 'One Way' ? null : returnFlight }
    });
    createDummyTicket({ type, from, to, departureDate, returnDate, quantity, passengers, email, phoneNumber, message, ticketValidity, ticketDelivery: { immediate: receiveNow, deliveryDate: receiveNow ? null : deliveryDate }, flightDetails: { departureFlight, returnFlight: type === 'One Way' ? null : returnFlight } })
  }

  return (
    <form className="flex flex-col mt-2.5 p-6 lg:p-6.25 rounded-xl bg-gray-100" onSubmit={handleSubmit}>
      {passengers.length > 0 && (
        <PassengerData passengers={passengers} updatePassengerData={updatePassengerData} />
      )}

      <ContactDetails email={email} setEmail={setEmail} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />

      <TicketValidityOptions ticketValidity={ticketValidity} updatePricing={updatePricing} />

      <TicketDelivery receiveNow={receiveNow} setReceiveNow={setReceiveNow} deliveryDate={deliveryDate} setDeliveryDate={setDeliveryDate} />

      <Message message={message} setMessage={setMessage} />

      <PrimaryButton className="w-full mt-5" disabled={isBtnDisabled || isCreatingDummyTicket}>
        {isCreatingDummyTicket ? 'Processing...' : 'Review Your Information'}
      </PrimaryButton>
    </form>
  );
}

function PassengerData({ passengers, updatePassengerData }) {
  let adultCount = 0;
  let childCount = 0;
  let infantCount = 0;

  return (
    <FormRow>
      {passengers.map((passenger, index) => {
        let label = passenger.type === 'Adult' ? `Adult ${++adultCount}` :
          passenger.type === 'Child' ? `Child ${++childCount}` :
          `Infant ${++infantCount}`;

        return (
          <FormItem key={index}>
            <Label>{label}</Label>
            <div className="w-full flex gap-1.25">
              <SelectTitle value={passenger.title} onChange={e => updatePassengerData(index, 'title', e.target.value)} />
              <Input value={passenger.firstName} placeholder="First Name" onChange={e => updatePassengerData(index, 'firstName', e.target.value)} />
              <Input value={passenger.lastName} placeholder="Last Name" onChange={e => updatePassengerData(index, 'lastName', e.target.value)} />
            </div>
          </FormItem>
        );
      })}
    </FormRow>
  );
}

function ContactDetails({ email, setEmail, phoneNumber, setPhoneNumber }) {
  return (
    <FormRow>
      <FormItem>
        <Label>Email Address</Label>
        <Email email={email} onChange={e => setEmail(e.target.value)} />
      </FormItem>
      <FormItem>
        <Label>Phone Number</Label>
        <PhoneNumber phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
      </FormItem>
    </FormRow>
  );
}

function TicketValidityOptions({ ticketValidity, updatePricing }) {
  const options = [
    { value: '2 Days', label: '2 Days', price: 49 },
    { value: '7 Days', label: '7 Days', price: 69 },
    { value: '14 Days', label: '14 Days', price: 79 },
  ];

  const handleChange = option => {
    updatePricing({ ticketValidity: option.value, ticketPrice: option.price });
  };

  return (
    <FormItem>
      <Label>Choose Ticket Validity</Label>
      <SegmentedRadioGroup name='ticketValidity' options={options} value={ticketValidity} onChange={handleChange} />
    </FormItem>
  );
}

function TicketDelivery({ receiveNow, deliveryDate, setReceiveNow, setDeliveryDate }) {
  return (
    <FormRow>
      <FormItem>
        <Label>Ticket Delivery Type</Label>
        <div>
          <div className='font-light text-[14.5px]'>
            <input type="radio" checked={receiveNow} onChange={() => setReceiveNow(true)} /> <span className='ml-3'>I need it now</span>
          </div>
          <div className='font-light text-[14.5px]'>
            <input type="radio" checked={!receiveNow} onChange={() => setReceiveNow(false)} /> <span className='ml-3'>I need it on a later date</span>
          </div>
        </div>
      </FormItem>
      {!receiveNow && (
        <FormItem>
          <Label>Deliver Ticket On</Label>
          <SelectDate selectedDate={deliveryDate && formatDate(deliveryDate)} onDateSelect={setDeliveryDate} minDate={new Date()} />
        </FormItem>
      )}
    </FormRow>
    
  );
}

function Message({ message, setMessage }) {
  return (
    <FormItem>
      <Label optional>Special Requests</Label>
      <TextArea value={message} onChange={e => setMessage(e.target.value)} />
    </FormItem>
  );
}
