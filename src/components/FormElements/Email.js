import { FaEnvelope } from 'react-icons/fa';
import styled from 'styled-components';
import Input from './Input';
import Label from './Label';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
`;

export default function Email({ email, handleEmailChange }) {
  return (
    <Wrapper>
      <Label htmlFor="email">Email Address</Label>
      <Input
        type="email"
        value={email}
        onChange={handleEmailChange}
        required
        name="email"
        id="email"
        autoComplete="on"
        icon={<FaEnvelope />}
        placeholder="Enter email address"
      />
    </Wrapper>
  );
}
