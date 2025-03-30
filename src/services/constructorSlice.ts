import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, PayloadAction, nanoid, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

type TConstructorState = {
  ingredients: TConstructorIngredient[];
  bun: TIngredient | null;
};
const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};
const selectConstructorState = (state: RootState) => state.burgerConstructor;

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun' 
          ? (state.bun = action.payload) 
          : state.ingredients.push(action.payload);
      },
      prepare: (item: TIngredient) => ({
        payload: { ...item, id: nanoid() } as TConstructorIngredient
      })
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        item => item.id !== action.payload
      );
    },
    updateIngredients: (state, action: PayloadAction<TConstructorIngredient[]>) => {
      state.ingredients = action.payload;
    },
    clearAll: () => initialState
  },
  selectors: {
    selectConstructor: (state) => ({
      bun: state.bun,
      ingredients: state.ingredients // Гарантированно массив
    }),
    selectIngredients: (state) => state.ingredients,
    selectBun: (state) => state.bun
  }
});
export const selectConstructor = createSelector(
  selectConstructorState,
  (state) => state
);
export const selectBun = createSelector(
  selectConstructorState,
  (state) => state.bun
);
export const selectIngredients = createSelector(
  selectConstructorState,
  (state) => state.ingredients
);
export const { addItem, removeItem, updateIngredients, clearAll } = constructorSlice.actions;
export default constructorSlice.reducer;
