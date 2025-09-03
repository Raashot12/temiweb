'use client';
import {
  TextInput,
  Button,
  Text,
  Anchor,
  Stack,
  Group,
  rem,
  Box,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PlateauMedMainLogo from '@/components/shared/IconComponents/PlateauMedMainLogo';
import Image from 'next/image';
import { appColors } from '@/theme/colors';
import {
  defaultResetPasswordSchemaValues,
  ResetPasswordSchema,
  resetPasswordSchema,
} from '../../schema';

const ResetPasswordForm = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const isLargeScreen = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: defaultResetPasswordSchemaValues,
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    criteriaMode: 'all',
  });

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
          // onSubmit={handleSubmit((data) => handleResetPassword(data, router))}
        >
          <Stack>
            <Stack>
              <Text fz="1.5rem" fw={700} ta={'center'}>
                Reset your password
              </Text>
              <Text fz="1rem" fw={500} ta={'center'} c="#677597">
                Enter your email address, and we will send you a link to reset
                your password.
              </Text>
            </Stack>
            <Stack gap={'1.5rem'}>
              <Controller
                name="emailAddress"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    data-testid={'username'}
                    label="Email address"
                    placeholder="Email address"
                    error={errors.emailAddress?.message}
                  />
                )}
                control={control}
              />
            </Stack>

            <Anchor<'a'> href="/login" c={appColors?.temiBlue} fw={600}>
              Login
            </Anchor>

            <Button type="submit" fullWidth h={rem(40)}>
              Submit email
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
export default ResetPasswordForm;
