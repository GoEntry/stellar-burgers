import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { selectConstructor, clearAll } from '../../services/constructorSlice';
import { selectUser } from '../../services/authSlice';
import {
  createOrder,
  selectCurrentOrder,
  resetCurrent,
  selectLoading
} from '../../services/ordersSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorDispatch = useDispatch();
  const nav = useNavigate();
  const currentLocation = useLocation();
  const burgerComponents = useSelector(selectConstructor);
  const currentUser = useSelector(selectUser);
  const currentOrderDetails = useSelector(selectCurrentOrder);
  const isOrderLoading = useSelector(selectLoading);

  const onOrderClick = () => {
    if (!burgerComponents.bun || isOrderLoading) return;
    if (!currentUser) {
      nav('/login', { replace: true, state: { from: currentLocation } });
      return;
    }
    const itemIds = [
      burgerComponents.bun._id,
      ...burgerComponents.ingredients.map((ing) => ing._id),
      burgerComponents.bun._id
    ];
    constructorDispatch(createOrder(itemIds));
  };

  const handleModalClose = () => {
    constructorDispatch(clearAll());
    constructorDispatch(resetCurrent());
  };

  const price = useMemo(
    () =>
      (burgerComponents.bun ? burgerComponents.bun.price * 2 : 0) +
      (burgerComponents.ingredients || []).reduce(
        // Защита от undefined
        (sum: number, item: TConstructorIngredient) => sum + item.price,
        0
      ),
    [burgerComponents]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isOrderLoading}
      constructorItems={{
        bun: burgerComponents.bun,
        ingredients: burgerComponents.ingredients || [] // Гарантируем массив
      }}
      orderModalData={currentOrderDetails}
      onOrderClick={onOrderClick}
      closeOrderModal={handleModalClose}
    />
  );
};
