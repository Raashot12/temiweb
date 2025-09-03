'use client';
import CollapsibleFormWrapper from '@/components/shared/CollapsibleFormWrapper';
import PageLabel from '@/components/shared/PageLabel';
import OnboardingShell from '@/layouts/Onbarding/OnboardingShell';
import React from 'react';
import { Box, Text } from '@mantine/core';
import PharmacyGroupReviewDetails from '../components/PharmacyGroupReviewDetails';
import PharmacyOutletReviewDetails from '../components/PharmacyOutletReviewDetails';

const ReviewDetailsPage = () => {
  return (
    <OnboardingShell
      title="Review details"
      handleContinue={() => {}}
      btnText={'Continue'}
      first={true}
      isLoading={false}
      isRequired={false}
      updateOnboardingStatus={[]}
    >
      <PageLabel
        title="Review details"
        description="Review the information provided in each section of the outlet setup"
      />
      <Box mt={16}>
        <CollapsibleFormWrapper
          title="Pharmacy group and outlet details"
          isOpened={false}
          buttonText="Add Outlet"
          handleButtonClicked={() => {}}
          isDependant={false}
        >
          <PharmacyGroupReviewDetails />
          <PharmacyOutletReviewDetails />
        </CollapsibleFormWrapper>
      </Box>
    </OnboardingShell>
  );
};

export default ReviewDetailsPage;
