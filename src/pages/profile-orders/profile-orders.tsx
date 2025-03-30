import { ProfileOrdersUI } from '@ui-pages';
import { TIngredient, TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { selectUserOrders, fetchUserOrders } from '../../services/ordersSlice';
import { useSelector, useDispatch } from '../../services/store';
import { selectIngredients, fetchIngredients } from '../../services/ingredientsSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectUserOrders);
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const userDispatch = useDispatch();

  useEffect(() => {
    // Загружаем ингредиенты только если их нет
    if (ingredients.length === 0) {
      userDispatch(fetchIngredients());
    }
    // Всегда загружаем актуальные заказы пользователя
    userDispatch(fetchUserOrders());
  }, [userDispatch, ingredients.length]);
  return <ProfileOrdersUI orders={orders} />;
};
export default ProfileOrders;
