import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logOut } from '../../services/authSlice';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const profileDispatch = useDispatch();
  const handleLogout = () => {
    profileDispatch(logOut())
      .unwrap()
      .then(() => {
        nav('/login', { replace: true });
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };
  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
