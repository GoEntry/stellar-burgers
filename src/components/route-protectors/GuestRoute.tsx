import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser, selectAuthStatus } from '../../services/authSlice';

type GuestRouteProps = {
  children: React.ReactElement;
};

export const GuestRoute = ({ children }: GuestRouteProps) => {
  const location = useLocation();
  const user = useSelector(selectUser);
  const authStatus = useSelector(selectAuthStatus);

  if (authStatus === undefined) {
    return <Preloader />;
  }
  if (user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }
  return children;
};
