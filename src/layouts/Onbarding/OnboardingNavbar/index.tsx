'use client';
import {
  Image,
  CloseButton,
  Box,
  useMantineTheme,
  Stack,
  Flex,
  Text,
  Group,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useRouter, usePathname } from 'next/navigation';
import {
  selectMobileNavOpened,
  toggleMobileNav,
} from '@/state/features/onboarding/onboardingSlice';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import Navbar from '@/components/shared/Navbar';
import { appColors } from '@/theme/colors';
import { ONBOARDING_SIDEBAR } from '@/utils/constants';
import React from 'react';

// Convert Mantine breakpoint value (number px or string like '48em') to px number
const bpToPx = (v: number | string): number => {
  if (typeof v === 'number') return v;
  const str = String(v).trim();
  if (str.endsWith('em')) return parseFloat(str) * 16;
  if (str.endsWith('px')) return parseFloat(str);
  return parseFloat(str);
};

const OnboardingNavbar = () => {
  const opened = useAppSelector(selectMobileNavOpened);
  const theme = useMantineTheme();
  const { width: viewportWidth } = useViewportSize();
  const isLgUp = viewportWidth >= bpToPx(theme.breakpoints.lg);

  const rootStyle = {
    backgroundColor: appColors?.lightGrayedWhite,
    borderRight: '1px solid #CDD8F3',
    borderBottom: '1px solid #CDD8F3',
    padding: '1rem',
    top: 0,
    overflow: 'hidden',
    transition: 'width 750ms ease, min-width 750ms ease, padding 750ms ease',
  } as React.CSSProperties;

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Navbar
      hiddenBreakpoint="lg"
      hidden={!opened}
      classNames={{ root: rootStyle }}
      width={{
        base: opened ? '60%' : '0rem',
        xs: opened ? '35%' : '0rem',
        lg: 'auto',
      }}
    >
      <Box
        style={{
          display: isLgUp ? 'none' : 'flex',
          background: appColors.menuBackground,
          width: '2rem',
          height: '2rem',
          borderRadius: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: '2rem',
          top: '3rem',
        }}
      >
        <CloseButton
          title="close navigation"
          style={{
            backroundColor: 'red',
            color: 'black',
            width: '100%',
            height: '100%',
          }}
          onClick={() => dispatch(toggleMobileNav())}
        />
      </Box>
      <Navbar.Section>
        <Image
          src="/images/onboarding-expression.webp"
          alt="Expression of progression"
          height={155}
          fit="contain"
        />
      </Navbar.Section>
      <Navbar.Section grow>
        <Stack style={{ marginTop: '64px' }}>
          {ONBOARDING_SIDEBAR.map(({ name, id, path }, index) => {
            const isActive = pathname === path || pathname?.startsWith(path + '/');
            return (
              <Box
                key={id}
                role="button"
                aria-current={isActive ? 'page' : undefined}
                style={{
                  background: isActive ? appColors.circleGray : appColors.white,
                  borderRadius: '8px',
                  border: isActive ? `1px solid ${appColors.blue}` : `1px solid ${appColors.halfFade}`,
                  cursor: 'pointer',
                }}
                px={10}
                py={8}
                onClick={() => router.push(path)}
              >
                <Group wrap="nowrap" gap={8}>
                  <Flex
                    w={28}
                    h={28}
                    style={{
                      borderRadius: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: isActive ? appColors.white : appColors.black,
                      background: isActive ? appColors.blue : appColors.circleGray,
                    }}
                  >
                    <Text fw={600}>{index + 1}</Text>
                  </Flex>
                  <Text fw={700} fz={14}>
                    {name}
                  </Text>
                </Group>
              </Box>
            );
          })}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default OnboardingNavbar;
