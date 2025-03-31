import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import {
  fetchOrderByNumber,
  selectFeed,
  selectUserOrders,
  selectCurrentOrder
} from '../../services/ordersSlice';
import { selectIngredients } from '../../services/ingredientsSlice';

export const OrderInfo: FC = () => {
  const infoDispatch = useDispatch();
  const { number } = useParams<{ number: string }>();
  const id = Number(number);
  // Получаем данные из Redux store
  const ingredients = useSelector(selectIngredients);
  const feedOrders = useSelector(selectFeed);
  const userOrders = useSelector(selectUserOrders);
  const currentOrder = useSelector(selectCurrentOrder);

  // Объединяем заказы из ленты и профиля
  const allOrders = useMemo(
    () => [...feedOrders, ...userOrders],
    [feedOrders, userOrders]
  );

  useEffect(() => {
    if (!id) return;
    // Проверяем существующие заказы
    const existingOrder = allOrders.find((order) => order.number === id);
    if (!existingOrder) {
      infoDispatch(fetchOrderByNumber(id));
    }
  }, [id, allOrders, infoDispatch]);

  // Мемоизация данных для отображения
  const orderInfo = useMemo(() => {
    const targetOrder =
      allOrders.find((order) => order.number === id) || currentOrder;
    if (!targetOrder || !ingredients.length) return null;
    const date = new Date(targetOrder.createdAt);
    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = targetOrder.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = { ...ingredient, count: 1 };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...targetOrder,
      ingredientsInfo,
      date,
      total
    };
  }, [allOrders, currentOrder, ingredients, id]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
