import { FC, useEffect } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/ingredientsSlice';
import { selectFeed, selectTotals, selectUserOrders } from '../../services/ordersSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const feedDispatch = useDispatch();
  // Получаем данные из хранилища
  const feedOrders = useSelector(selectFeed);
  const userOrders = useSelector(selectUserOrders);
  const { total, totalToday } = useSelector(selectTotals);
  // Объединяем заказы из разных источников
  const allOrders = [...feedOrders, ...userOrders];
  // Фильтруем заказы по статусам
  const readyOrders = getOrders(allOrders, 'done');
  const pendingOrders = getOrders(allOrders, 'pending');

  // Загружаем ингредиенты при монтировании компонента
  useEffect(() => {
    feedDispatch(fetchIngredients());
  }, [feedDispatch]);

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};
