import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

type Tenant = {
  name?: string;
  id?: number;
  isActive?: boolean;
};

type TenantState = {
  tenant: Tenant | null;
};

const initialState = {
  tenant: null,
} as TenantState;

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setTenant: (state, action: PayloadAction<Tenant>) => {
      state.tenant = action.payload;
    },
  },
});

export const { setTenant } = tenantSlice.actions;

export const selectTenant = (state: RootState): TenantState => state.tenant;

export default tenantSlice.reducer;
