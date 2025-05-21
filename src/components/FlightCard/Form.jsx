import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  updateField,
  updatePassengerData,
  updatePricing,
  submitFormData,
  initializePassengers,
} from '../../redux/slices/passengerDetailsSlice';
import { formatDate } from '../../utils/formatDate';
import Error from '../Error';
import Input from '../FormElements/Input';
import Label from '../FormElements/Label';
import SelectDate from '../FormElements/SelectDate';
import SelectTitle from '../FormElements/SelectTitle';
import TextArea from '../FormElements/TextArea';
import Email from '../FormElements/Email';
import PhoneNumber from '../FormElements/PhoneNumber';
import PrimaryButton from '../PrimaryButton';

const StyledForm = styled.form`
  box-sizing: border-box;
  margin-top: 10px;
  padding: 25px 25px;
  border-radius: 20px;
  background-color: var(--grey-color-100);
  @media screen and (max-width: 991px) {
    padding: 20px 20px;
  }
`;

const SubmitButtonDiv = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  @media screen and (max-width: 991px) {
    display: block;
  }
`;

const FormItem = styled.div`
  width: 100%;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
`;

export default function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    quantity,
    passengers,
    email,
    phoneNumber,
    ticketValidity,
    receiveNow,
    receiptDate,
    message,
    passengerErrors,
    errorMessage,
  } = useSelector((state) => state.passengerDetails);

  useEffect(() => {
    if (quantity && (!passengers || passengers.length === 0)) {
      dispatch(initializePassengers());
    }
  }, [dispatch, quantity, passengers]);

  const handleUpdatePassenger = (index, field, value) => {
    dispatch(
      updatePassengerData({
        type: 'UPDATE_SINGLE',
        payload: { index, field, value },
      })
    );
  };

  const handleEmailChange = (e) => {
    dispatch(updateField({ field: 'email', value: e.target.value }));
  };

  const handleValidityChange = (e) => {
    dispatch(
      updatePricing({
        type: 'SET_VALIDITY',
        validity: e.target.value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      localStorage.setItem('email', email);
      localStorage.setItem('phoneNumber', JSON.stringify(phoneNumber));

      const result = await dispatch(submitFormData());

      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/booking/review-details');
      } else {
        toast.error('An error occurred while submitting the form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('An error occurred while submitting the form');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {passengers && passengers.length > 0 && (
        <PassengerData
          passengers={passengers}
          handleUpdatePassenger={handleUpdatePassenger}
          passengerErrors={passengerErrors}
        />
      )}
      <ContactDetails
        email={email}
        handleEmailChange={handleEmailChange}
        phoneNumber={phoneNumber}
        setPhoneNumber={(value) =>
          dispatch(updateField({ field: 'phoneNumber', value }))
        }
      />
      <TicketValidityOptions
        ticketValidity={ticketValidity}
        handleValidityChange={handleValidityChange}
      />
      <ReceiptOptions
        receiveNow={receiveNow}
        setReceiveNow={(value) =>
          dispatch(updateField({ field: 'receiveNow', value }))
        }
        receiptDate={receiptDate}
        setReceiptDate={(date) =>
          dispatch(updateField({ field: 'receiptDate', value: date }))
        }
      />
      <Message
        message={message}
        setMessage={(value) =>
          dispatch(updateField({ field: 'message', value }))
        }
      />
      {errorMessage && <Error>{errorMessage}</Error>}
      <SubmitButton onClick={handleSubmit} />
    </StyledForm>
  );
}

const PassengerFields = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  margin-top: 8px;
  @media screen and (max-width: 991px) {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr;
  }
`;

const Title = styled(SelectTitle)`
  width: 20%;
  box-shadow: var(--input-box-shadow-sm);
  -webkit-box-shadow: var(--input-box-shadow-sm);
  -moz-box-shadow: var(--input-box-shadow-sm);
  @media screen and (max-width: 991px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const FirstName = styled(Input)`
  width: 100%;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
`;

const LastName = styled(Input)`
  width: 100%;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
`;

function PassengerData({ passengers, handleUpdatePassenger, passengerErrors }) {
  let adultCount = 0;
  let childCount = 0;
  let infantCount = 0;

  return (
    <FormRow>
      {passengers?.map((passenger, index) => {
        let label = '';
        if (passenger.type === 'Adult') {
          label = `Adult ${++adultCount}`;
        } else if (passenger.type === 'Child') {
          label = `Child ${++childCount}`;
        } else if (passenger.type === 'Infant') {
          label = `Infant ${++infantCount}`;
        }
        return (
          <FormItem key={index}>
            <Label>{label}</Label>
            <PassengerFields>
              <Title
                value={passenger.title}
                onChange={(e) =>
                  handleUpdatePassenger(index, 'title', e.target.value)
                }
              />
              <FirstName
                type="text"
                required
                name={`firstName${index}`}
                id={`firstName${index}`}
                placeholder="First Name"
                value={passenger.firstName}
                onChange={(e) =>
                  handleUpdatePassenger(index, 'firstName', e.target.value)
                }
              />
              <LastName
                type="text"
                required
                name={`lastName${index}`}
                id={`lastName${index}`}
                placeholder="Last Name"
                value={passenger.lastName}
                onChange={(e) =>
                  handleUpdatePassenger(index, 'lastName', e.target.value)
                }
              />
            </PassengerFields>
            {passengerErrors && passengerErrors[index] && (
              <>
                {passengerErrors[index].firstName && (
                  <Error>{passengerErrors[index].firstName}</Error>
                )}
                {passengerErrors[index].lastName && (
                  <Error>{passengerErrors[index].lastName}</Error>
                )}
              </>
            )}
          </FormItem>
        );
      })}
    </FormRow>
  );
}

function ContactDetails({
  email,
  handleEmailChange,
  phoneNumber,
  setPhoneNumber,
}) {
  return (
    <FormRow>
      <FormItem>
        <Email email={email} handleEmailChange={handleEmailChange} />
      </FormItem>
      <FormItem>
        <PhoneNumber
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      </FormItem>
    </FormRow>
  );
}

const TicketValidityWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

const TicketValidityBox = styled.div`
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: var(--input-box-shadow-sm);
  -webkit-box-shadow: var(--input-box-shadow-sm);
  -moz-box-shadow: var(--input-box-shadow-sm);
  @media screen and (max-width: 991px) {
    display: block;
  }
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: white;
  position: relative;
  flex: 1;
  & input[type='radio'] {
    position: absolute;
    opacity: 0;
  }
  & input[type='radio']:checked + div {
    background-color: var(--primary-color-500);
    color: #fff;
    border: 1px solid var(--primary-color-500);
  }
  & input[type='radio']:checked + div span {
    color: var(--primary-color-100);
  }
  &:active {
    background-color: #dee2e6;
  }
  &:hover {
    background-color: #e9ecef;
  }
`;

const TicketValidityInnerBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: transparent;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  border: 2px solid transparent;
  border-radius: 4px;
  @media screen and (max-width: 991px) {
    padding: 12.5px;
  }
`;

const Price = styled.span`
  color: var(--grey-color-600);
  font-weight: 500;
  margin-left: 3px;
`;

function TicketValidityOptions({ ticketValidity }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(
      updatePricing({
        type: 'SET_VALIDITY',
        validity: e.target.value,
      })
    );
  };

  const options = [
    { value: '48 Hours', label: '48 Hours', price: 49 },
    { value: '7 Days', label: '7 Days', price: 69 },
    { value: '14 Days', label: '14 Days', price: 79 },
  ];

  return (
    <TicketValidityWrapper>
      <Label htmlFor="ticketValidity">Choose Ticket Validity</Label>
      <TicketValidityBox>
        {options.map((option, index) => (
          <Option key={index}>
            <input
              type="radio"
              name="ticketValidity"
              value={option.value}
              checked={ticketValidity === option.value}
              onChange={handleChange} // Use the local handleChange
            />
            <TicketValidityInnerBox>
              {option.label} - <Price>AED {option?.price} / person</Price>
            </TicketValidityInnerBox>
          </Option>
        ))}
      </TicketValidityBox>
    </TicketValidityWrapper>
  );
}

const ReceiptWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
`;

const RadioGroup = styled.div`
  display: block;
`;

const RadioLabel = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  font-size: 15px;
  margin-bottom: 5px;
`;

function ReceiptOptions({
  receiveNow,
  receiptDate,
  setReceiveNow,
  setReceiptDate,
}) {
  return (
    <ReceiptWrapper>
      <Label>Receive Ticket On</Label>
      <RadioGroup>
        <RadioLabel>
          <input
            type="radio"
            name="receiveTicket"
            checked={receiveNow}
            onChange={() => setReceiveNow(true)}
          />
          <span>I need it now</span>
        </RadioLabel>
        <RadioLabel>
          <input
            type="radio"
            name="receiveTicket"
            checked={!receiveNow}
            onChange={() => setReceiveNow(false)}
          />
          <span>I need it on a later date</span>
        </RadioLabel>
      </RadioGroup>
      {!receiveNow && (
        <FormRow>
          <FormItem>
            <SelectDate
              selectedDate={receiptDate && formatDate(receiptDate)}
              onDateSelect={setReceiptDate}
              minDate={new Date()}
              placeholder="Select receipt date"
            />
          </FormItem>
        </FormRow>
      )}
    </ReceiptWrapper>
  );
}

const StyledTextarea = styled.div`
  display: flex;
  flex-direction: column;
`;

function Message({ message, setMessage }) {
  return (
    <StyledTextarea>
      <Label optional>Special Requests</Label>
      <TextArea
        value={message}
        placeholder="Special requests"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
    </StyledTextarea>
  );
}

const StyledButton = styled(PrimaryButton)`
  margin-top: 20px;
  width: 100%;
`;

function SubmitButton({ onClick }) {
  return <StyledButton onClick={onClick}>Submit</StyledButton>;
}
