import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { selectAuthStatus, login } from '../../services/authSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAuth = useSelector(selectAuthStatus);
  const loginDispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    loginDispatch(login({ email, password }));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
