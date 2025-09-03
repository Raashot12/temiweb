'use client';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { MantineEmotionProvider } from '@mantine/emotion';
import '@/styles/font.css';
import '@/styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { AlertNotificationProvider } from '@/hooks/useNotification';
import { appTheme } from '@/theme/index';
import { Provider } from 'react-redux';
import { setupStore } from '@/state/store';
import { useSetTenantFromHostName } from '@/hooks/useSetTenantFromHostName';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import Cookies from 'js-cookie';
import { ReactNode, useEffect } from 'react';
import {
  AppStartStatus,
  selectAppStartStatus,
} from '@/state/features/appStart/appStartSlice';
import { login, logOut } from '@/state/features/auth/authSlice';
import ProtectedPage from '@/layouts/ProtectedPage';
import { FullPagePlateauMedLoader } from '@/components/shared/PlateauMedLoader';
import { RootStyleRegistry } from '@/components/shared/EmotionRootStyleRegistry';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  useSetTenantFromHostName();
  const appStartStatus = useAppSelector(selectAppStartStatus);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      dispatch(login(accessToken));
    } else {
      dispatch(logOut());
    }
  }, [dispatch]);
  if (appStartStatus === AppStartStatus.ready) {
    return <>{children}</>;
  }

  return <FullPagePlateauMedLoader />;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <Provider store={setupStore()}>
          <RootStyleRegistry>
            <MantineProvider theme={appTheme} defaultColorScheme="light">
              <MantineEmotionProvider>
                {/* <AuthProvider> */}
                <ProtectedPage>
                  <Notifications position="bottom-right" zIndex={1000} />
                  <ModalsProvider>
                    <AlertNotificationProvider>
                      {children}
                    </AlertNotificationProvider>
                  </ModalsProvider>
                </ProtectedPage>
                {/* </AuthProvider> */}
              </MantineEmotionProvider>
            </MantineProvider>
          </RootStyleRegistry>
        </Provider>
      </body>
    </html>
  );
}
