'use client';
import { MantineProvider } from '@mantine/core';
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
import { Provider } from 'react-redux';
import { setupStore } from '@/state/store';
import { appTheme } from '@/theme/index';
import { useAppSelector } from '@/state/hooks';
import { useSetTenantFromHostName } from '@/hooks/useSetTenantFromHostName';
import { ReactNode } from 'react';
import {
  AppStartStatus,
  selectAppStartStatus,
} from '@/state/features/appStart/appStartSlice';
import { FullPagePlateauMedLoader } from '@/components/shared/PlateauMedLoader';

const TenantCheckProvider = ({ children }: { children: ReactNode }) => {
  useSetTenantFromHostName();
  const appStartStatus = useAppSelector(selectAppStartStatus);

  if (appStartStatus === AppStartStatus.ready) {
    return <>{children}</>;
  }

  return <FullPagePlateauMedLoader />;
};

export default function UnprotectedLayout({
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
      </head>
      <body>
        <Provider store={setupStore()}>
          <MantineProvider theme={appTheme} defaultColorScheme="light">
            <TenantCheckProvider>
              <Notifications position={'top-right'} zIndex={1000} />
              <ModalsProvider>
                <AlertNotificationProvider>
                  {children}
                </AlertNotificationProvider>
              </ModalsProvider>
            </TenantCheckProvider>
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
