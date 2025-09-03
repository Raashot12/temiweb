import { CustomFormSelect } from '../../CustomSelect';
import { ComboboxItem } from '@mantine/core';
import { Control } from 'react-hook-form';
import { AddPatientSchema } from './validationSchema';

export const InsuranceProviderCoverageInput = ({
  control,
  nameRef,
}: {
  control: Control<AddPatientSchema>;
  nameRef: `insuranceInformations.${number}`;
}) => {
  const coverageOptions: ComboboxItem[] = [
    { label: 'Inpatient', value: 'Inpatient' },
    { label: 'Outpatient', value: 'Outpatient' },
    { label: 'Emergency', value: 'Emergency' },
    { label: 'Maternity', value: 'Maternity' },
  ];

  return (
    <CustomFormSelect
      data-cy={`${nameRef}.coverage`}
      control={control}
      placeholder={'Coverage'}
      name={`${nameRef}.coverage`}
      width="100%"
      data={coverageOptions}
      isLoading={false}
    />
  );
};
