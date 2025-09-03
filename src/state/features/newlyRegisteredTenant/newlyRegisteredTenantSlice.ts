import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

type Tenant = {
  name: string;
};

const initialState = {
  name: '',
} as Tenant;

const newlyRegisteredTenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setTenantName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setTenantName } = newlyRegisteredTenantSlice.actions;

export const selectTenantName = (state: RootState): Tenant =>
  state.newlyRegisteredTenant;

export default newlyRegisteredTenantSlice.reducer;
