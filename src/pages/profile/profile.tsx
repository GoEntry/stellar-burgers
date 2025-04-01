import { ProfileUI } from '@ui-pages';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectUser, updateUser } from '../../services/authSlice';

export const Profile: FC = () => {
  const profileDispatch = useDispatch();
  const user = useSelector(selectUser);
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Синхронизация формы с данными пользователя
  useEffect(() => {
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  }, [user]);

  // Проверка изменений в форме
  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  // Обработка отправки формы
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isFormChanged) {
      profileDispatch(
        updateUser({
          name: formValue.name,
          email: formValue.email,
          password: formValue.password
        })
      );
    }
  };

  // Сброс формы
  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  };

  // Обновление состояния формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
