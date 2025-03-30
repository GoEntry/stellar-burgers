import { FC, SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';
import { register, selectAuthStatus } from '../../services/authSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const regDispatch = useDispatch();
  const isAuth = useSelector(selectAuthStatus);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (userName && email && password) {
      regDispatch(
        register({
          name: userName,
          email: email,
          password: password
        })
      );
    }
  };

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <RegisterUI
      errorText=""
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
