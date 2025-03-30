import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectIngredients, selectLoading } from '../../services/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(selectIngredients);
  const isIngredientsLoading = useSelector(selectLoading);
  // Находим ингредиент по ID из URL параметров
  const ingredientData = ingredients.find((ing) => ing._id === id);

  // Показываем прелоадер если данные загружаются или ингредиент не найден
  if (isIngredientsLoading || !ingredientData) {
    return <Preloader />;
  }
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
