'use client';
import {
  TextInput,
  Button,
  Text,
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
import {
  defaultCreateNewPasswordSchemaValues,
  CreateNewPasswordSchema,
  createNewPasswordSchema,
} from '../../schema';
import { useAlertNotification } from '@/hooks/useNotification';

const CreatePasswordForm = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const isLargeScreen = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateNewPasswordSchema>({
    resolver: zodResolver(createNewPasswordSchema),
    defaultValues: defaultCreateNewPasswordSchemaValues,
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    criteriaMode: 'all',
  });
  const { showSuccess , closeAlert } = useAlertNotification();

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showSuccess({
      title: 'Password reset successful 🎉',
      message: 'Your password has been changed successfully',
      autoClose: false,
      isProceeding: <Button mah={40} fullWidth onClick={() => {
        closeAlert();
        router.push('/login');
      }}>
        Proceed to login
      </Button>,
    });
  };
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
          onSubmit={handleClick}
          // onSubmit={handleSubmit((data) => handleResetPassword(data, router))}
        >
          <Stack>
            <Stack>
              <Text fz="1.5rem" fw={700} ta={'center'}>
                Create a new password
              </Text>
              <Text fz="1rem" fw={500} ta={'center'} c="#677597">
                Please enter a new password and conform it.
              </Text>
            </Stack>
            <Stack gap={'1.5rem'}>
              <Controller
                name="newPassword"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    data-testid={'username'}
                    label="Create new password"
                    placeholder="Enter your new password"
                    type="password"
                    error={errors.newPassword?.message}
                  />
                )}
                control={control}
              />
              <Controller
                name="confirmPassword"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    data-testid={'username'}
                    label="Confirm new password"
                    placeholder="Enter new password again"
                    type="password"
                    error={errors.newPassword?.message}
                  />
                )}
                control={control}
              />
            </Stack>

            <Button type="submit" fullWidth h={rem(40)} mt={20}>
              Create password
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
export default CreatePasswordForm;
