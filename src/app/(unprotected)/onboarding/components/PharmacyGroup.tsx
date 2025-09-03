'use client';
import React from 'react';
import CollapsibleFormWrapper from '@/components/shared/CollapsibleFormWrapper';
import { Box, Button, Flex, Grid, Loader, Stack, Text } from '@mantine/core';
import { appColors } from '@/theme/colors';
import IconUserProfile from '@/components/shared/IconComponents/IconUserProfile';
import IconCamera from '@/components/shared/IconComponents/IconCamera';
import { CustomFormInput } from '@/components/shared/CustomTextInput';
import { CustomFormSelect } from '@/components/shared/CustomSelect';
import IconArrowInput from '@/components/shared/IconComponents/IconArrowInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useApiServicesAppCountriesGetallGetQuery } from '@/state/services/countryApi';
import FacilityRegionsFormInput from './formUtils/FacilityRegionsFormInput';
import {
  createFacilityDetailsDefaultValues,
  createFacilityDetailsSchema,
  CreateFacilityDetailsSchema,
} from './formUtils/validationSchema';
import FacilityPhoneNumberInput from './formUtils/FacilityPhoneNumberInput';

const PharmacyGroup = () => {
  const { control, handleSubmit } = useForm<CreateFacilityDetailsSchema>({
    resolver: zodResolver(createFacilityDetailsSchema),
    defaultValues: createFacilityDetailsDefaultValues,
    mode: 'onTouched',
    criteriaMode: 'all',
  });
  const { data: countries = [] } = useApiServicesAppCountriesGetallGetQuery(
    {},
    {
      selectFromResult: (result) => {
        return {
          ...result,
          data: result.data?.items?.map((item) => ({
            label: `${item.country?.name}`,
            value: `${item.country?.code}`,
          })),
        };
      },
    },
  );
  return (
    <CollapsibleFormWrapper
      title="Pharmacy group"
      isDependant={false}
      isOpened={false}
      buttonText="Add pharmacy group"
      handleButtonClicked={() => {}}
    >
      <Flex align="flex-start" gap={16} mt={16}>
        <IconUserProfile />
        <Stack gap={6}>
          <Button mah={32} rightSection={<IconCamera />}>
            Upload outlet logo
          </Button>
          <Text fz={14} fw={500} c={appColors.text}>
            jpg/png. (4 x 4 in dimension)
          </Text>
        </Stack>
      </Flex>
      <Grid gutter={'xl'} style={{ flex: 1 }} mt={16}>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <CustomFormSelect
            control={control}
            name="level"
            label="Pharmacy group type"
            placeholder="Select type"
            searchable
            withAsterisk
            data={['Primary', 'Secondary', 'Tertiary']}
            rightSection={<IconArrowInput fill={appColors.lowerText} />}
            width="100%"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 8 }}>
          <CustomFormInput
            control={control}
            name="name"
            label="Pharmacy group name"
            placeholder="Enter pharmacy group name"
            withAsterisk
            width="100%"
          />
        </Grid.Col>
      </Grid>
      <Grid gutter={'lg'} mt={16}>
        <Grid.Col span={{ xs: 12, sm: 6, md: 6 }}>
          <CustomFormInput
            control={control}
            name="address"
            label="Pharmacy group address"
            placeholder="Enter outlet street address"
            withAsterisk
            width="100%"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
          <CustomFormSelect
            control={control}
            name="country"
            label="Country"
            placeholder="Select country"
            searchable
            withAsterisk
            data={countries.map((item) => `${item.label}`)}
            rightSection={<IconArrowInput fill={appColors.lowerText} />}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
          <FacilityRegionsFormInput
            country={'country'}
            region={'state'}
            control={control}
            countries={countries}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
          <CustomFormInput
            control={control}
            name="city"
            label="City/Town"
            placeholder="Example: Ikeja"
            withAsterisk
            width="100%"
          />
        </Grid.Col>
      </Grid>
      <Grid gutter={'lg'} mt={16}>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <FacilityPhoneNumberInput
            control={control}
            label="Pharmacy phone number"
            phoneCodeName="phoneCode"
            withAsterisk
            phoneNumberName="phoneNumber"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <CustomFormInput
            control={control}
            name="emailAddress"
            label="Pharmacy email address"
            placeholder="Enter email address"
            withAsterisk
            width="100%"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <CustomFormInput
            control={control}
            name="website"
            label="Pharmacy website"
            placeholder="Enter website"
            width="100%"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 2 }}>
          <CustomFormInput
            control={control}
            name="postCode"
            label="Post code"
            placeholder="Enter code"
            inputMode={'decimal'}
            type="number"
            width="100%"
          />
        </Grid.Col>
      </Grid>
    </CollapsibleFormWrapper>
  );
};

export default PharmacyGroup;
