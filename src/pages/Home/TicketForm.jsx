import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateField } from '../../redux/slices/passengerDetailsSlice';
import { FaCircle } from 'react-icons/fa';
import { PlaneLandingIcon, PlaneTakeoff } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import Label from '../../components/FormElements/Label';
import PrimaryButton from '../../components/PrimaryButton';
import SelectAirport from '../../components/FormElements/SelectAirport';
import SelectDate from '../../components/FormElements/SelectDate';
import Counter from '../../components/FormElements/Counter';
import Error from '../../components/Error';
import { toast } from 'react-toastify';

const Form = styled.form`
  margin: 0;
  transition-duration: 0.3s;
  border-radius: 15px;
`;

const Type = styled.div`
  font-size: 14.5px;
  width: fit-content;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
`;

const CircleIcon = styled(FaCircle)`
  margin-right: 8px;
  font-size: 20px;
  border-radius: 100px;
  padding: 3px;
  color: transparent;
  border: 2px solid black;
  &.active {
    color: black;
    border: 2px solid black;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 15px;
  @media only screen and (max-width: 991px) {
    display: block;
  }
`;

const TypeRow = styled(Row)`
  @media only screen and (max-width: 991px) {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;

const FormRow = styled.div`
  width: ${({ width }) => width || '50%'};
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 991px) {
    width: 100%;
    margin-bottom: 15px;
  }
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  text-align: center;
`;

const SearchButton = styled(PrimaryButton)`
  width: 100%;
  font-weight: 600;
`;

export default function TicketForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessages, setErrorMessages] = useState({});

  const { from, to, departureDate, returnDate, type, quantity } = useSelector(
    (state) => state.passengerDetails
  );

  const isFormValid = () => {
    const errors = {};
    if (!from) {
      toast.error('From field is required');
      return false;
    }
    if (!to) {
      toast.error('To field is required');
      return false;
    }
    if (!departureDate) {
      toast.error('Departure date is required');
      return false;
    }
    if (type === 'Return' && !returnDate) {
      toast.error('Return date is required');
      return false;
    }
    if (
      quantity.adults < 1 ||
      quantity.adults + quantity.children + quantity.infants > 9
    ) {
      toast.error('Return date is required');
      return false;
    }
    return Object.keys(errors).length === 0;
  };

  const handleFieldChange = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const handleQuantityChange = (field, value) => {
    const updatedQuantity = {
      ...quantity,
      [field]: quantity[field] + value,
    };
    const totalPassengers =
      updatedQuantity.adults +
      updatedQuantity.children +
      updatedQuantity.infants;

    if (totalPassengers > 9 || updatedQuantity.adults < 1) {
      toast.error('Total passengers cannot be less than 1 or exceed 9.');
      return;
    }
    dispatch(updateField({ field: 'quantity', value: updatedQuantity }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('routes', JSON.stringify({ from, to }));
    if (isFormValid()) {
      navigate('/booking/select-flights');
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <TypeRow>
        {['One Way', 'Return'].map((tripType) => (
          <Type
            key={tripType}
            onClick={() => handleFieldChange('type', tripType)}
          >
            <CircleIcon className={type === tripType ? 'active' : ''} />
            {tripType}
          </Type>
        ))}
      </TypeRow>

      <Row>
        <FormRow>
          <Label htmlFor="from" required>
            From
          </Label>
          <SelectAirport
            value={from}
            onChange={(value) => handleFieldChange('from', value)}
            icon={<PlaneTakeoff size={22} />}
          />
          {errorMessages?.from && <Error>{errorMessages.from}</Error>}
        </FormRow>
        <FormRow>
          <Label htmlFor="to" required>
            To
          </Label>
          <SelectAirport
            value={to}
            onChange={(value) => handleFieldChange('to', value)}
            icon={<PlaneLandingIcon size={22} />}
          />
          {errorMessages?.to && <Error>{errorMessages.to}</Error>}
        </FormRow>
      </Row>

      <Row>
        <FormRow width={type === 'Return' ? '50%' : '100%'}>
          <Label htmlFor="departureDate" required>
            Departure Date
          </Label>
          <SelectDate
            selectedDate={departureDate && formatDate(departureDate)}
            onDateSelect={(date) => handleFieldChange('departureDate', date)}
            minDate={new Date()}
          />
          {errorMessages?.departureDate && (
            <Error>{errorMessages.departureDate}</Error>
          )}
        </FormRow>
        {type === 'Return' && (
          <FormRow>
            <Label htmlFor="returnDate" required>
              Return Date
            </Label>
            <SelectDate
              selectedDate={returnDate && formatDate(returnDate)}
              onDateSelect={(date) => handleFieldChange('returnDate', date)}
              minDate={new Date(departureDate)}
            />
            {errorMessages?.returnDate && (
              <Error>{errorMessages.returnDate}</Error>
            )}
          </FormRow>
        )}
      </Row>

      <QuantityCounter
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
      />

      <ButtonDiv>
        <SearchButton type="submit" disabled={() => !isFormValid()}>
          Search Flights
        </SearchButton>
      </ButtonDiv>
    </Form>
  );
}

function QuantityCounter({ quantity, onQuantityChange, error }) {
  const categories = [
    { label: 'Adults', ageRange: '(12+)', field: 'adults' },
    { label: 'Children', ageRange: '(2 - 11)', field: 'children' },
    { label: 'Infants', ageRange: '(0 - 1)', field: 'infants' },
  ];

  return (
    <>
      <Row>
        {categories.map(({ label, ageRange, field }, i) => (
          <Counter
            key={i}
            ageGroup={label}
            age={ageRange}
            onAdd={() => onQuantityChange(field, 1)}
            onSubtract={() => onQuantityChange(field, -1)}
            value={quantity[field]}
          />
        ))}
      </Row>
      {error && <Error>{error}</Error>}
    </>
  );
}
