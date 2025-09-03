import { ComboboxItem } from '@mantine/core';

const useInsuranceProviderType = ({
  onChangeInsuranceProvider,
  onChangeInsuranceCoverage,
  onChangeInsuranceId,
  onChangeInsuranceRegistrationType,
  onChangeCoverageStartDate,
  onChangeCoverageEndDate,
}: {
  onChangeInsuranceProvider: (value: string | null) => void;
  onChangeInsuranceCoverage: (value: string | null) => void;
  onChangeInsuranceId: (value: string | null) => void;
  onChangeInsuranceRegistrationType: (value: string | null) => void;
  onChangeCoverageStartDate: (value: Date | null) => void;
  onChangeCoverageEndDate: (value: Date | null) => void;
}) => {
  // Static Insurance Types
  const insuranceTypes: ComboboxItem[] = [
    { label: 'National', value: 'National' },
    { label: 'HMO', value: 'HMO' },
    { label: 'Private', value: 'Private' },
  ];

  const handleChange = (_value: string | null) => {
    onChangeInsuranceProvider('');
    onChangeInsuranceCoverage('');
    onChangeInsuranceId('');
    onChangeInsuranceRegistrationType('');
    onChangeCoverageStartDate(null);
    onChangeCoverageEndDate(null);
  };
  return { insuranceTypes, handleChange };
};

export default useInsuranceProviderType;
