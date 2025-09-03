'use client';
import {
  Stack,
  Button,
  Checkbox,
  PasswordInput,
  Select,
  TextInput,
  Flex,
  Loader,
  Anchor,
  Text,
  Group,
  Box,
  rem,
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormSetError,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setTenantName } from '@/state/features/newlyRegisteredTenant/newlyRegisteredTenantSlice';
import { useAppDispatch } from '@/state/hooks';
import InfoTip from '@/components/shared/InfoTips';
import { appColors } from '@/theme/colors';
import {
  ApiStateInterface,
  TenantCategory,
  TenantCategoryType,
} from '@/types/index';
import {
  useApiServicesAppAccountIstenantavailablePostMutation,
  useApiServicesAppTenantregistrationRegistertenantPostMutation,
} from '@/state/services/tenantApi';
import useFacilityType from './hooks/usePharmacyType';
import {
  defaultValues,
  DirtyFields,
  registrationSchema,
  RegistrationSchema,
  tenancyNameValidation,
} from './schema/schema';
import {
  BusinessCodeWrapper,
  IconWrapper,
  InValidIconWrapper,
  TipWrapper,
  ValidIconWrapper,
} from './components/signupUIChunks';
import SignUpWrapperShell from './components/SignUpWrapperShell';
import { notifications } from '@mantine/notifications';
import { DEFAULT_API_ERROR_MESSAGE } from '@/utils/constants';
import {
  CustomFormInput,
} from '@/components/shared/CustomTextInput';

const SectionHeading = ({ children, ...props }: any) => (
  <Box
    {...props}
    style={{
      textAlign: 'left',
      ...props.style,
      fontSize: '18px',
      fontWeight: '600',
    }}
  >
    {children}
  </Box>
);

const businessCodeInputStyles = {
  root: {
    flex: 1,
  },
  tenantInputRoot: {
    display: 'flex',
  },
  codeInput: {
    borderRadius: 10,
    margin: 0,
    [`@media (max-width: ${rem(576)})`]: {
      borderTopLeftRadius: rem(10),
      borderBottomLeftRadius: rem(10),
    },
  },
  codeInputWrapper: {
    borderRadius: 10,
    margin: 0,
  },
  label: {
    position: 'relative',
  },
};

const BusinessCodeInput = ({
  control,
  errors,
  setError,
  clearErrors,
  dirtyFields,
  isTenantExists,
  setIsTenantExists,
}: {
  control: Control<RegistrationSchema>;
  errors: FieldErrors<RegistrationSchema>;
  setError: UseFormSetError<RegistrationSchema>;
  clearErrors: UseFormClearErrors<RegistrationSchema>;
  dirtyFields: DirtyFields;
  isTenantExists: boolean;
  setIsTenantExists: Dispatch<SetStateAction<boolean>>;
}) => {
  const [checkTenant, { isError, isLoading }] =
    useApiServicesAppAccountIstenantavailablePostMutation();

  const doesTenantExist = async (tenantName: string) => {
    const result = await checkTenant({
      isTenantAvailableRequest: { tenancyName: tenantName },
    }).unwrap();

    if (result.state === 1 || result.state === 2) {
      setIsTenantExists(true);
      setError('tenancyName', {
        type: 'custom',
        message: 'This unique name has already been taken',
      });
    } else {
      setIsTenantExists(false);
      clearErrors('tenancyName');
    }
  };

  return (
    <BusinessCodeWrapper>
      <TipWrapper>
        <InfoTip
          w={200}
          label="A unique business identifier, this code will be used to generate the url for your plural application"
        />
      </TipWrapper>

      <Flex style={{ padding: 0, width: '100%' }}>
        <Controller
          name="tenancyName"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label="Unique business code"
              required
              w={'100%'}
              onBlur={() => {
                field.onBlur();
                if (
                  field.value !== '' &&
                  tenancyNameValidation.safeParse(field.value).success
                ) {
                  doesTenantExist(field.value);
                }
              }}
              placeholder="https://example outlet"
              withAsterisk={true}
              styles={{
                wrapper: businessCodeInputStyles.codeInputWrapper,
                input: businessCodeInputStyles.codeInput,
              }}
              rightSection={
                <Flex style={{ color: appColors.textGray }} fw={500}>
                  .pharm.plural.health
                  {dirtyFields.tenancyName && isLoading ? (
                    <IconWrapper>
                      <Loader size={24} />
                    </IconWrapper>
                  ) : dirtyFields.tenancyName && isError ? (
                    <InValidIconWrapper>
                      <IconX size={16} color="red" />
                    </InValidIconWrapper>
                  ) : dirtyFields.tenancyName && errors.tenancyName ? (
                    <InValidIconWrapper>
                      <IconX size={16} color="red" />
                    </InValidIconWrapper>
                  ) : dirtyFields.tenancyName && !isTenantExists ? (
                    <ValidIconWrapper>
                      <IconCheck size={16} color="#27ae60" />
                    </ValidIconWrapper>
                  ) : null}
                </Flex>
              }
            />
          )}
        />
      </Flex>
    </BusinessCodeWrapper>
  );
};
const Signup = () => {
  const [isTenantExists, setisTenantExists] = useState(false);
  const { isPublic } = useFacilityType();
  const [facilityCategory, setFacilityCategory] = useState<TenantCategoryType>(
    TenantCategory.Private,
  );
  const { control, handleSubmit, formState, setError, clearErrors } =
    useForm<RegistrationSchema>({
      resolver: zodResolver(registrationSchema),
      defaultValues,
      mode: 'onTouched',
      reValidateMode: 'onSubmit',
      criteriaMode: 'all',
    });
  const dispatch = useAppDispatch();
  const { errors, dirtyFields, isValid } = formState;
  const [register, { isSuccess, isLoading, error: apiError }] =
    useApiServicesAppTenantregistrationRegistertenantPostMutation();

  const router = useRouter();
  const handleRegister = async (data: RegistrationSchema) => {
    try {
      await register({
        registerTenantInput: {
          tenancyName: data.tenancyName,
          name:
            data.category === 'Private' ? data.name : data.pharmacyGroupName,
          category: data.category,
          type:
            data.type === 'Independent Practitioner'
              ? 'Individual'
              : 'Business',
          hasSignedAgreement: true,
          adminEmailAddress: data.adminEmailAddress,
          adminName: data.adminName,
          adminSurname: data.adminSurname,
          adminPassword: data.adminPassword,
          editionId: 1,
          facilityGroupName: data.pharmacyGroupName,
        },
      }).unwrap();

      // Success notification
      notifications.show({
        title: 'Registration Successful',
        message: 'Your account has been created successfully!',
        position: 'top-right',
        color: 'green',
      });

      dispatch(setTenantName(data.adminName));
      // Redirect or handle success as needed
    } catch (error) {
      // Error notification
      notifications.show({
        title: 'Registration Failed',
        message: `${(error as ApiStateInterface)?.data?.error?.message ?? DEFAULT_API_ERROR_MESSAGE}`,
        position: 'top-right',
        color: 'red',
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/account/signup-confirm');
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (typeof isPublic === 'boolean') {
      setFacilityCategory(isPublic ? 'Public' : 'Private');
    }
  }, [isPublic]);

  if (isSuccess) {
    return null;
  }

  return (
    <SignUpWrapperShell>
      <Box
        style={{
          maxWidth: '600px',
          marginTop: '1.7rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Box
          style={{
            textAlign: 'center',
            fontSize: '20px',
            lineHeight: '24px',
            fontWeight: '600',
            margin: '0',
          }}
        >
          Get started with Plural
        </Box>
        <Box
          style={{
            textAlign: 'center',
            color: appColors.text,
            lineHeight: '1.5',
            letterSpacing: '0.02em',
          }}
          fw={500}
        >
          Creating an account is the first step to start using Plural NeoPharm
        </Box>
        <Box
          style={{
            borderRadius: 10,
            marginTop: '1.5rem',
            padding: '20px',
            background: appColors.white,
          }}
          onSubmit={handleSubmit((data) => handleRegister(data))}
        >
          <Stack>
            <Stack mb={24}>
              <SectionHeading
                style={{
                  textAlign: 'left',
                  fontSize: '18px',
                  lineHeight: '24px',
                  fontWeight: '600',
                  margin: '0',
                }}
              >
                Administrator information
              </SectionHeading>

              <Controller
                name="adminEmailAddress"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    type="email"
                    label="Email address"
                    placeholder="someone@example.com"
                    error={errors.adminEmailAddress?.message}
                    required
                  />
                )}
                control={control}
              />
              <Flex
                gap={{ lg: 'lg', md: 'md' }}
                direction={{ base: 'column', md: 'row' }}
              >
                <Controller
                  control={control}
                  name="adminName"
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      value={field.value.trim()}
                      label="Full name"
                      placeholder="First name"
                      error={errors.adminName?.message}
                      required
                      style={{ flex: 1 }}
                    />
                  )}
                />
                <Controller
                  name="adminSurname"
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      value={field.value.trim()}
                      label="Last name"
                      placeholder="Last name"
                      error={errors.adminSurname?.message}
                      required
                      withAsterisk={true}
                      style={{ flex: 1 }}
                    />
                  )}
                  control={control}
                />
              </Flex>
              <Controller
                name="adminPassword"
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    label="Password"
                    placeholder="Type your password here"
                    required
                    error={errors.adminPassword?.message}
                  />
                )}
                control={control}
              />
              <Controller
                name="adminConfirmPassword"
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    label="Confirm Password"
                    placeholder="Re-type your password here"
                    required
                    error={errors.adminConfirmPassword?.message}
                  />
                )}
                control={control}
              />
            </Stack>
            <Stack gap={16}>
              <SectionHeading>Business information</SectionHeading>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Are you an independent practitioner, hospital, standalone pharmacy or laboratory group?"
                    placeholder="Select preferred option"
                    fw={500}
                    data={[
                      {
                        value: 'Single hospital or hospital group',
                        label: 'Single hospital or hospital group',
                      },
                      {
                        value: 'Single pharmacy or pharmacy group',
                        label: 'Single pharmacy or pharmacy group',
                      },
                      {
                        value: 'Single laboratory or laboratory group',
                        label: 'Single laboratory or laboratory group',
                      },
                    ]}
                    required
                    error={errors.type?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Pharmacy type"
                    placeholder="Select outlet type"
                    data={
                      isPublic
                        ? [{ value: 'Public', label: 'Public' }]
                        : [{ value: 'Private', label: 'Private' }]
                    }
                    required
                    error={errors.category?.message}
                    onSelect={() => setFacilityCategory(field.value)}
                  />
                )}
              />
              <Controller
                name="pharmacyGroupName"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Pharmacy group name"
                    placeholder="Enter outlet or group name"
                    required
                    error={errors.pharmacyGroupName?.message}
                  />
                )}
                control={control}
              />
              <Controller
                name="outletNumber"
                render={({ field }) => (
                  <CustomFormInput
                    {...field}
                    control={control}
                    label="Number of outlets"
                    placeholder="0"
                    name="outletNumber"
                    type="number"
                    required
                    error={errors.outletNumber?.message}
                    styles={{
                      input: {
                        padding: '10px 12px',
                      },
                    }}
                    rightSection={
                      <Text style={{ color: appColors.textGray }} fw={500}>
                        Outlets
                      </Text>
                    }
                  />
                )}
                control={control}
              />

              <Controller
                name="referralCode"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Referral code"
                    placeholder="Enter referral code"
                    error={errors.referralCode?.message}
                  />
                )}
                control={control}
              />

              <BusinessCodeInput
                control={control}
                errors={errors}
                setError={setError}
                clearErrors={clearErrors}
                dirtyFields={dirtyFields}
                isTenantExists={isTenantExists}
                setIsTenantExists={setisTenantExists}
              />
              <Box mt={16}>
                <Group gap={12}>
                  <Controller
                    control={control}
                    name="hasSignedAgreement"
                    render={({ field }) => (
                      <Checkbox
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        checked={field.value}
                        radius="sm"
                        required
                      />
                    )}
                  />
                  <Text style={{ fontWeight: 500, color: appColors.text }}>
                    I agree to the{' '}
                    <Anchor
                      c={appColors.blue}
                      fw={500}
                      component="a"
                      href={'#'}
                      target="_blank"
                      style={{textDecoration: 'underline'}}
                    >
                      Terms of Use
                    </Anchor>
                    &nbsp; and{' '}
                    <Anchor
                      c={appColors.blue}
                      fw={500}
                      component="a"
                      href={'#'}
                      target="_blank"
                      style={{textDecoration: 'underline'}}
                    >
                      Privacy Policy{' '}
                    </Anchor>
                    on behalf of the facility
                  </Text>
                </Group>
                <Text fz={12} color="red.6" ml={32}>
                  {errors.hasSignedAgreement?.message}
                </Text>
              </Box>

              <Button
                type="submit"
                disabled={isLoading || !isValid || isTenantExists}
                mt={16}
              >
                Create account
                {isLoading && (
                  <Loader
                    color="white"
                    size={24}
                    style={{ marginLeft: '1rem' }}
                  />
                )}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </SignUpWrapperShell>
  );
};

export default Signup;
