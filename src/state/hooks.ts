import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useSessionStorage } from '@mantine/hooks';
import { RootState, AppDispatch } from './store';

export type LoggedInUserInfo = {
  role: 'front desk' | 'doctor' | 'nurse';
  loginName: string;
  facilityId: number;
  userId: number;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useLoggedInUser = () => {
  const [value] = useSessionStorage<LoggedInUserInfo | undefined>({
    key: 'loggedInUser',
    defaultValue: undefined,
  });

  return value;
};
