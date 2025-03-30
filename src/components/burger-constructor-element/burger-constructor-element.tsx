import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { selectIngredients, removeItem, updateIngredients } from '../../services/constructorSlice';
import { useDispatch, useSelector } from '../../services/store';


export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const selectedIngredients = useSelector(selectIngredients);
    const appDispatcher = useDispatch();

    const handleMoveDown = () => {
      if (index >= totalItems - 1) return;
      const updatedIngredients = [...selectedIngredients];
      [updatedIngredients[index], updatedIngredients[index + 1]] = 
        [updatedIngredients[index + 1], updatedIngredients[index]];
      appDispatcher(updateIngredients(updatedIngredients));
    };

    const handleMoveUp = () => {
      if (index <= 0) return;
      const updatedIngredients = [...selectedIngredients];
      [updatedIngredients[index], updatedIngredients[index - 1]] = 
        [updatedIngredients[index - 1], updatedIngredients[index]];
      appDispatcher(updateIngredients(updatedIngredients));
    };

    const handleClose = () => {
      appDispatcher(removeItem(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
