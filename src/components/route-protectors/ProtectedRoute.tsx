import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser, selectAuthStatus } from '../../services/authSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector(selectUser);
  const authStatus = useSelector(selectAuthStatus);

  if (authStatus === undefined) {
    return <Preloader />;
  }
  if (!user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  return children;
};
