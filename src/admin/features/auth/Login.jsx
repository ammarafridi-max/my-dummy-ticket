import { Helmet } from 'react-helmet-async';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Login | My Dummy Ticket Admin</title>
      </Helmet>
      <LoginForm />
    </>
  );
}
