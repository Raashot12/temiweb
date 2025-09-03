import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export enum AuthStatus {
  loggedIn = 'loggedIn',
  pending = 'pending',
  loggedOut = 'loggedOut',
}

type AuthState = {
  accessToken: string | null;
  status: AuthStatus;
};

const initialState = {
  accessToken: null,
  status: AuthStatus.pending,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      return { accessToken: action.payload, status: AuthStatus.loggedIn };
    },
    logOut: () => {
      return { accessToken: null, status: AuthStatus.loggedOut };
    },
  },
});

export const { login, logOut } = authSlice.actions;

export const selectAuth = (state: RootState): AuthState => state.auth;

export default authSlice.reducer;
