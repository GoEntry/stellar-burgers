import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredientsSlice';
import { authSlice } from './authSlice';
import { constructorSlice } from './constructorSlice';
import { ordersSlice } from './ordersSlice';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
