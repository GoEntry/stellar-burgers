import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

type TOrdersState = {
  current: TOrder | null;
  feed: TOrder[];
  userOrders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error?: string;
};

const initialState: TOrdersState = {
  current: null,
  feed: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: undefined
};

export const createOrder = createAsyncThunk(
  'orders/create',
  async (ids: string[]) => (await orderBurgerApi(ids)).order
);

export const fetchFeed = createAsyncThunk('orders/feed', getFeedsApi);
export const fetchUserOrders = createAsyncThunk('orders/user', getOrdersApi);
export const fetchOrderByNumber = createAsyncThunk(
  'orders/byNumber',
  getOrderByNumberApi
);

const handleRejected = (state: TOrdersState, action: AnyAction) => {
  state.isLoading = false;
  state.error = action.error?.message || 'Unknown error';
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload;
      })
      .addCase(createOrder.rejected, handleRejected);

    builder
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.feed = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, handleRejected);

    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserOrders.rejected, handleRejected);

    builder.addCase(fetchOrderByNumber.fulfilled, (state, action) => {
      state.current = action.payload.orders[0];
    });
  },
  selectors: {
    selectCurrentOrder: (state) => state.current,
    selectFeed: (state) => state.feed,
    selectUserOrders: (state) => state.userOrders,
    selectTotals: (state) => ({
      total: state.total,
      totalToday: state.totalToday
    }),
    selectLoading: (state) => state.isLoading
  }
});

export const { resetCurrent } = ordersSlice.actions;
export const { selectCurrentOrder, selectFeed, selectUserOrders, selectTotals, selectLoading } = ordersSlice.selectors;
