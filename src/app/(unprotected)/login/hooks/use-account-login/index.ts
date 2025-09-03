import { LoggedInUserInfo, useAppDispatch } from '@/state/hooks';
import { useApiTokenauthAuthenticatePostMutation } from '@/state/services/tokenAuthApi';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { login } from '@/state/features/auth/authSlice';
import { useSessionStorage } from '@mantine/hooks';
import { LoginSchema } from '../../components/schema';
import { DEFAULT_API_ERROR_MESSAGE } from '@/utils/constants';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ApiStateInterface } from '@/types/index';

const useAccountLogin = () => {
  const [value, setValue] = useSessionStorage<LoggedInUserInfo | undefined>({
    key: 'loggedInUser',
    defaultValue: undefined,
  });

  const dispatch = useAppDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [loginRequest, { error }] = useApiTokenauthAuthenticatePostMutation();
  const errorState = error as ApiStateInterface;

  const handleLogin = async (data: LoginSchema, router: AppRouterInstance) => {
    setIsLoggingIn(true);

    try {
      const result = await loginRequest({
        authenticateModel: {
          userNameOrEmailAddress: data.userNameOrEmailAddress,
          password: data.password,
        },
      }).unwrap();
      if (result.accessToken) {
        Cookies.set('accessToken', result.accessToken, { expires: 1 });
        dispatch(login(result.accessToken));
        router.push('/enrollees');
      } else {
        toast.error(`${DEFAULT_API_ERROR_MESSAGE}`, {
          position: 'top-right',
          closeButton: true,
        });
      }
    } catch (_) {
      toast.error(
        `${errorState?.data?.error?.message ?? DEFAULT_API_ERROR_MESSAGE}`,
        {
          position: 'top-right',
          closeButton: true,
        },
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return {
    handleLogin,
    isLoggingIn,
  };
};

export default useAccountLogin;
