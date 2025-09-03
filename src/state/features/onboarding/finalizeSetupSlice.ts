import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

type OnboardingState = {
  paymentGateway: {
    gatewayName: string;
    id: number;
  };
};

const initialState = {} as OnboardingState;

const finalizeSetupSlice = createSlice({
  name: 'finalize-setup',
  initialState,
  reducers: {
    setPaymentGateway: (state, action) => {
      state.paymentGateway = action.payload;
    },
  },
});

export const { setPaymentGateway } = finalizeSetupSlice.actions;

export const selectPaymentGateway = (
  state: RootState
): {
  gatewayName: string;
  id: number;
} => state.finalize.paymentGateway;

export default finalizeSetupSlice.reducer;
