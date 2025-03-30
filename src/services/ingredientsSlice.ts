import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  list: TIngredient[];
  loading: boolean;
  error?: string;
};

const initialState: TIngredientsState = {
  list: [],
  loading: false,
  error: undefined
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  getIngredientsApi
);
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.list = [];
        state.error = action.error.message;
      });
  },
  selectors: {
    selectIngredients: (state) => state.list,
    selectLoading: (state) => state.loading
  }
});
export const { selectIngredients, selectLoading } = ingredientsSlice.selectors;
