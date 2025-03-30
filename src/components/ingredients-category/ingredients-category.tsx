import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '../../services/store';
import { selectConstructor } from '../../services/constructorSlice';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps>(({ title, titleRef, ingredients }, ref) => {
  // Используем стабильный селектор
  const { bun, ingredients: constructorIngredients } = useSelector(selectConstructor);
  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};
    constructorIngredients?.forEach((ingredient: TIngredient) => {
      counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
    });

    if (bun) counters[bun._id] = 2;
    return counters;
  }, [bun, constructorIngredients]); // Точные зависимости

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
