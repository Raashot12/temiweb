import React, { useEffect } from 'react';
import { Control } from 'react-hook-form';
import { CustomFormDateSelect } from '../../CustomSelect';
import { AddPatientSchema } from './validationSchema';
import useNEMSASCoverage from './hooks/useNEMSASCoverage';

const InsuranceStartDate = ({
  control,
  nameRef,
}: {
  control: Control<AddPatientSchema>;
  nameRef: `insuranceInformations.${number}`;
}) => {
  const {
    isNEMSASEmergencyCoverageSet,
    nemsasCoverageStartDate,
    startDateValue,
    setCoverageStartDate,
  } = useNEMSASCoverage({
    control,
    nameRef,
  });

  useEffect(() => {
    if (
      isNEMSASEmergencyCoverageSet &&
      startDateValue !== nemsasCoverageStartDate.toDate()
    ) {
      setCoverageStartDate?.(nemsasCoverageStartDate.toDate());
    }
  }, [
    startDateValue,
    isNEMSASEmergencyCoverageSet,
    nemsasCoverageStartDate,
    setCoverageStartDate,
  ]);

  return (
    <CustomFormDateSelect
      placeholder="Start Date"
      name={`${nameRef}.startDate`}
      control={control}
      width={'100%'}
      disabled={isNEMSASEmergencyCoverageSet}
    />
  );
};

export default InsuranceStartDate;
