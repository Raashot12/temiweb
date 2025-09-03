import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'state/store';

export enum AppStartStatus {
  pending = 'pending',
  ready = 'ready',
}

type AppStartState = {
  status: AppStartStatus;
};

const initialState = {
  status: AppStartStatus.pending,
} as AppStartState;

const appStartSlice = createSlice({
  name: 'appStart',
  initialState,
  reducers: {
    resetAppStart: () => initialState,
    setAppStatusReady: () => {
      return { status: AppStartStatus.ready };
    },
  },
});

export const { resetAppStart, setAppStatusReady } = appStartSlice.actions;

export const selectAppStartStatus = (state: RootState): AppStartStatus =>
  state.appStart.status;

export default appStartSlice.reducer;
