import { FaEnvelope } from 'react-icons/fa';
import Label from './Label';
import InputWithIcon from './InputWithIcon';

export default function Email({ email, handleEmailChange }) {
  return (
    <div className="w-full mt-3 flex flex-col">
      <Label htmlFor="email">Email Address</Label>
      <InputWithIcon
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
    </div>
  );
}
