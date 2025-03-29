import { Navigate, useLocation } from 'react-router-dom';

export const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = false;
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to='/profile' state={{ from: location }} replace />;
  }

  return children;
};

export default GuestRoute;
