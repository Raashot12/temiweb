import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

type Side = 'HOST' | 'TENANT';

type MultiTenancyState = {
  side: Side;
};

const initialState = {
  side: 'HOST',
} as MultiTenancyState;

const multiTenancySlice = createSlice({
  name: 'multiTenancy',
  initialState,
  reducers: {
    setMultiTenancySide: (state, action: PayloadAction<Side>) => {
      state.side = action.payload;
    },
  },
});

export const { setMultiTenancySide } = multiTenancySlice.actions;

export const selectMultiTenancySide = (state: RootState): Side =>
  state.multiTenancy.side;

export default multiTenancySlice.reducer;
