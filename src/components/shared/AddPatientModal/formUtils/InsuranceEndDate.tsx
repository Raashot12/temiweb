import React, { useEffect } from 'react';
import { Control } from 'react-hook-form';
import { AddPatientSchema } from './validationSchema';
import useNEMSASCoverage from './hooks/useNEMSASCoverage';
import { CustomFormDateSelect } from '../../CustomSelect';

const InsuranceEndDate = ({
  control,
  nameRef,
}: {
  control: Control<AddPatientSchema>;
  nameRef: `insuranceInformations.${number}`;
}) => {
  const {
    isNEMSASEmergencyCoverageSet,
    nemsasCoverageEndDate,
    endDateValue,
    setCoverageEndDate,
  } = useNEMSASCoverage({
    control,
    nameRef,
  });

  useEffect(() => {
    if (
      isNEMSASEmergencyCoverageSet &&
      endDateValue !== nemsasCoverageEndDate.toDate()
    ) {
      setCoverageEndDate?.(nemsasCoverageEndDate.toDate());
    }
  }, [
    endDateValue,
    isNEMSASEmergencyCoverageSet,
    nemsasCoverageEndDate,
    setCoverageEndDate,
  ]);

  return (
    <CustomFormDateSelect
      placeholder="End Date"
      name={`${nameRef}.endDate`}
      control={control}
      width={'100%'}
      disabled={isNEMSASEmergencyCoverageSet}
    />
  );
};

export default InsuranceEndDate;
