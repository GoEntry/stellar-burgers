import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import styles from './constructor-page.module.css';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { BurgerIngredients } from '../../components';
import {
  fetchIngredients,
  selectLoading
} from '../../services/ingredientsSlice';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const areIngredientsLoad = useSelector(selectLoading);
  const ingredientsDispatch = useDispatch();
  useEffect(() => {
    ingredientsDispatch(fetchIngredients());
  }, [ingredientsDispatch]);
  return (
    <>
      {areIngredientsLoad ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
