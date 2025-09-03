import { ComboboxItem } from '@mantine/core';

const useInsuranceProviderInput = ({
  insuranceType,
  onChangeInsuranceCoverage,
  onChangeCoverageStartDate,
  onChangeCoverageEndDate,
}: {
  insuranceType: string;
  onChangeInsuranceCoverage: (value: string) => void;
  onChangeCoverageStartDate: (value: Date | null) => void;
  onChangeCoverageEndDate: (value: Date | null) => void;
}) => {
  // Static providers list (replace/extend as needed)
  const providers: ComboboxItem[] = [
    { label: 'NHIA', value: 'nhia' },
    { label: 'HMO A', value: 'hmo_a' },
    { label: 'HMO B', value: 'hmo_b' },
    { label: 'Private Insurance', value: 'private' },
  ];

  const isProdiverLoading = false;

  const handleChange = () => {
    // Reset dependent fields when provider changes
    onChangeInsuranceCoverage('');
    onChangeCoverageStartDate(null);
    onChangeCoverageEndDate(null);
  };

  return { providers, isProdiverLoading, handleChange };
};

export default useInsuranceProviderInput;
