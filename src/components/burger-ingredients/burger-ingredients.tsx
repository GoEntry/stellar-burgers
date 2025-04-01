import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/ingredientsSlice';
import { createSelector } from '@reduxjs/toolkit';

const selectBuns = createSelector([selectIngredients], (ingredients) =>
  ingredients.filter((item) => item.type === 'bun')
);
const selectMains = createSelector([selectIngredients], (ingredients) =>
  ingredients.filter((item) => item.type === 'main')
);
const selectSauces = createSelector([selectIngredients], (ingredients) =>
  ingredients.filter((item) => item.type === 'sauce')
);

export const BurgerIngredients: FC = () => {
  const buns = useSelector(selectBuns);
  const mains = useSelector(selectMains);
  const sauces = useSelector(selectSauces);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewFilling] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) setCurrentTab('bun');
    else if (inViewSauces) setCurrentTab('sauce');
    else if (inViewFilling) setCurrentTab('main');
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    const refs = {
      bun: titleBunRef,
      main: titleMainRef,
      sauce: titleSaucesRef
    };
    refs[tab as TTabMode].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
