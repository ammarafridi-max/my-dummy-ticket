import styled from 'styled-components';
import Label from './Label';
import Number from './Number';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
`;

export default function PhoneNumber({ phoneNumber, setPhoneNumber }) {
  return (
    <Wrapper>
      <Label htmlFor="number" required>
        Phone Number
      </Label>
      <Number
        codeValue={phoneNumber.code}
        codeOnChange={(e) =>
          setPhoneNumber({ ...phoneNumber, code: e.target.value })
        }
        digitsValue={phoneNumber.digits}
        digitsOnChange={(e) =>
          setPhoneNumber({ ...phoneNumber, digits: e.target.value })
        }
      />
    </Wrapper>
  );
}
