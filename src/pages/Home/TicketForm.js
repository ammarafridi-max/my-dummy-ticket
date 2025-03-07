import styled from 'styled-components';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import { updateFormField, updateQuantity } from '../../redux/slices/ticketForm';
import { FaPlaneDeparture, FaPlaneArrival, FaCircle } from 'react-icons/fa';
import Label from '../../components/FormElements/Label';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import SelectAirport from '../../components/FormElements/SelectAirport';
import SelectDate from '../../components/FormElements/SelectDate';
import Counter from '../../components/FormElements/Counter';
import Error from '../../components/Feedback/Error';

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
    color: var(--primary-color-600) !important;
    border: 2px solid var(--primary-color-600);
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
  width: 50%;
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
`;

const SearchButton = styled(PrimaryButton)``;

export default function TicketForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData } = useSelector((state) => state.ticketForm);
  const [errorMessages, setErrorMessages] = useState({});

  const isFormValid = () => {
    const errors = {};
    if (!formData.from) errors.from = 'From field is required';
    if (!formData.to) errors.to = 'To field is required';
    if (!formData.departureDate)
      errors.departureDate = 'Departure Date is required';
    if (formData.type === 'Return' && !formData.returnDate)
      errors.returnDate = 'Return Date is required';
    if (
      formData.quantity.adults < 1 ||
      formData.quantity.adults +
        formData.quantity.children +
        formData.quantity.infants >
        9
    ) {
      errors.quantity =
        'Total passengers cannot exceed 9, with at least one adult.';
    }
    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFieldChange = (field, value) => {
    dispatch(updateFormField({ field, value }));
  };

  const handleQuantityChange = (field, value) => {
    const updatedQuantity = {
      ...formData.quantity,
      [field]: formData.quantity[field] + value,
    };
    const totalPassengers =
      updatedQuantity.adults +
      updatedQuantity.children +
      updatedQuantity.infants;

    if (totalPassengers > 9 || updatedQuantity.adults < 1) {
      setErrorMessages((prev) => ({
        ...prev,
        quantity: 'Total passengers cannot be less than 1 or exceed 9.',
      }));
    } else {
      setErrorMessages((prev) => ({ ...prev, quantity: '' }));
      dispatch(updateQuantity(updatedQuantity));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      navigate('/booking/select-flights');
      window.scrollTo(0, 0);
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
            <CircleIcon
              className={formData.type === tripType ? 'active' : ''}
            />
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
            value={formData.from}
            onChange={(value) => handleFieldChange('from', value)}
            icon={<FaPlaneDeparture />}
          />
          {errorMessages?.from && <Error>{errorMessages.from}</Error>}
        </FormRow>
        <FormRow>
          <Label htmlFor="to" required>
            To
          </Label>
          <SelectAirport
            value={formData.to}
            onChange={(value) => handleFieldChange('to', value)}
            icon={<FaPlaneArrival />}
          />
          {errorMessages?.to && <Error>{errorMessages.to}</Error>}
        </FormRow>
      </Row>

      <Row>
        <FormRow>
          <Label htmlFor="departureDate" required>
            Departure Date
          </Label>
          <SelectDate
            selectedDate={
              formData.departureDate && formatDate(formData.departureDate)
            }
            onDateSelect={(date) => handleFieldChange('departureDate', date)}
            minDate={new Date()}
          />
          {errorMessages?.departureDate && (
            <Error>{errorMessages.departureDate}</Error>
          )}
        </FormRow>
        <FormRow>
          {formData.type === 'Return' && (
            <>
              <Label htmlFor="returnDate" required>
                Return Date
              </Label>
              <SelectDate
                selectedDate={
                  formData.returnDate && formatDate(formData.returnDate)
                }
                onDateSelect={(date) => handleFieldChange('returnDate', date)}
                minDate={new Date(formData.departureDate)}
              />
              {errorMessages?.returnDate && (
                <Error>{errorMessages.returnDate}</Error>
              )}
            </>
          )}
        </FormRow>
      </Row>

      <QuantityCounter
        quantity={formData.quantity}
        onQuantityChange={handleQuantityChange}
      />

      <ButtonDiv>
        <SearchButton type="submit">Search Flights</SearchButton>
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
