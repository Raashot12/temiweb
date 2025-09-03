import { CustomFormSelect } from '../../CustomSelect';
import { Control, useController, useWatch } from 'react-hook-form';
import { AddPatientSchema } from './validationSchema';
import useInsuranceProviderInput from './hooks/useInsuranceProviderInput';

export const InsuranceProviderInput = ({
  control,
  nameRef,
}: {
  control: Control<AddPatientSchema>;
  nameRef: `insuranceInformations.${number}`;
}) => {
  const insuranceType = useWatch({
    control,
    name: `${nameRef}.type`,
  });

  const {
    field: { onChange: onChangeInsuranceCoverage },
  } = useController({ name: `${nameRef}.coverage`, control });
  const {
    field: { onChange: onChangeCoverageStartDate },
  } = useController({ name: `${nameRef}.startDate`, control });

  const {
    field: { onChange: onChangeCoverageEndDate },
  } = useController({ name: `${nameRef}.endDate`, control });

  const { providers, isProdiverLoading, handleChange } =
    useInsuranceProviderInput({
      insuranceType,
      onChangeInsuranceCoverage,
      onChangeCoverageStartDate,
      onChangeCoverageEndDate,
    });

  return (
    <CustomFormSelect
      data-cy={`${nameRef}.insurance-provider`}
      control={control}
      placeholder="Insurance Provider"
      name={`${nameRef}.provider`}
      data={providers}
      searchable
      width="100%"
      isLoading={isProdiverLoading}
      onChange={handleChange}
    />
  );
};
