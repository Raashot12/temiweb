'use client';
import PageLabel from '@/components/shared/PageLabel';
import OnboardingShell from '@/layouts/Onbarding/OnboardingShell';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import PharmacyGroup from '../components/PharmacyGroup';
import { Box } from '@mantine/core';
import PharmacyOutlet from '../components/PharmacyOutlet';
import {
  createFacilityDetailsDefaultValues,
  CreateFacilityDetailsSchema,
  createFacilityDetailsSchema,
} from '../components/formUtils/validationSchema';
import { useForm } from 'react-hook-form';

const InsurerDetailsPage = () => {
  const { control } = useForm<CreateFacilityDetailsSchema>({
    defaultValues: {
      ...createFacilityDetailsDefaultValues,
      category: '',
    },
    resolver: zodResolver(createFacilityDetailsSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  return (
    <OnboardingShell
      title="Insurer Details"
      handleContinue={() => {}}
      btnText={'Continue'}
      first={true}
      isLoading={false}
      isRequired={false}
      updateOnboardingStatus={[]}
    >
      <PageLabel
        title="Pharmacy group and outlet details"
        description="Complete your outlet information in the fields provided below. Fields marked as asterisk are required"
      />
      <Box mt={12}>
        <PharmacyGroup />
      </Box>
      <Box mt={12}>
        <PharmacyOutlet index={0} control={control} />
      </Box>
    </OnboardingShell>
  );
};

export default InsurerDetailsPage;
