'use client';
import {
  TextInput,
  PasswordInput,
  Button,
  Text,
  Anchor,
  Stack,
  Group,
  rem,
  Loader,
  Box,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { defaultLoginSchemaValues, loginSchema, LoginSchema } from '../schema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAccountLogin from '../../hooks/use-account-login';
import PlateauMedMainLogo from '@/components/shared/IconComponents/PlateauMedMainLogo';
import Image from 'next/image';
import { appColors } from '@/theme/colors';

const Authentication = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const isLargeScreen = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginSchemaValues,
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    criteriaMode: 'all',
  });

  const { handleLogin, isLoggingIn } = useAccountLogin();

  return (
    <Stack justify={'space-between'} h={'100%'} p={'32px'} w={'100%'}>
      <Group gap={8} justify={'flex-end'} style={{ visibility: 'hidden' }}>
        <Image
          src="/images/pharmacygroup.webp"
          width={60}
          height={60}
          alt="Pharmacy group Logo"
        />
      </Group>
      <Group justify={'center'} w={'100%'}>
        <Box
          component="form"
          style={{
            width: isLargeScreen ? '60%' : '100%',
          }}
          onSubmit={handleSubmit((data) => handleLogin(data, router))}
        >
          <Stack>
            <Stack>
              <Text fz="1.5rem" fw={700} ta={'center'}>
                Welcome
              </Text>
              <Text fz="1rem" fw={500} ta={'center'} c="#677597">
                Please enter your email address and password
              </Text>
            </Stack>
            <Stack gap={'1.5rem'}>
              <Controller
                name="userNameOrEmailAddress"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    data-testid={'username'}
                    label="Email address"
                    placeholder="Email address"
                    error={errors.userNameOrEmailAddress?.message}
                  />
                )}
                control={control}
              />
              <Controller
                name="password"
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    data-cy={'password'}
                    label="Password"
                    placeholder="Enter password"
                    error={errors.password?.message}
                  />
                )}
                control={control}
              />
            </Stack>

            <Anchor<'a'> href="/reset-password" c={appColors?.temiBlue} fw={600}>
              Forgot password?
            </Anchor>

            <Button type="submit" fullWidth h={rem(40)} className="no-hover">
              Login{' '}
              {isLoggingIn && (
                <Loader
                  color="white"
                  size={24}
                  style={{ marginLeft: '1rem' }}
                />
              )}
            </Button>
          </Stack>
        </Box>
      </Group>
      <Group justify={'flex-end'}>
        <PlateauMedMainLogo />
      </Group>
    </Stack>
  );
};
export default Authentication;
