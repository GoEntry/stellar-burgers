import React from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${styles.link} ${isActive ? styles.link_active : ''}`;

export const AppHeaderUI = ({ userName }: TAppHeaderUIProps) => {
  const linksConfig = [
    {
      to: '/',
      icon: <BurgerIcon type='primary' />,
      text: 'Конструктор',
      id: 1,
      className: styles.menu_part_left
    },
    {
      to: '/feed',
      icon: <ListIcon type='primary' />,
      text: 'Лента заказов',
      id: 2,
      className: styles.menu_part_left
    },
    {
      to: '/profile',
      icon: <ProfileIcon type='primary' />,
      text: userName || 'Личный кабинет',
      id: 3,
      className: styles.menu_part_right
    }
  ];

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          {linksConfig.slice(0, 2).map(({ to, icon, text, id }) => (
            <NavLink key={id} to={to} className={getNavLinkClass}>
              {icon}
              <p className='text text_type_main-default ml-2 mr-10'>{text}</p>
            </NavLink>
          ))}
        </div>
        <div className={styles.logo}>
          <Logo className={''} />
        </div>
        <div className={styles.menu_part_right}>
          <NavLink to='/profile' className={getNavLinkClass}>
            <ProfileIcon type='primary' />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
