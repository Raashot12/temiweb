import { CustomFormSelect } from '../../CustomSelect';
import { Control, useController } from 'react-hook-form';
import { AddPatientSchema } from './validationSchema';
import useInsuranceProviderType from './hooks/useInsuranceProviderType';

export const InsuranceProviderTypeInput = ({
  control,
  nameRef,
}: {
  control: Control<AddPatientSchema>;
  nameRef: `insuranceInformations.${number}`;
}) => {
  const {
    field: { onChange: onChangeInsuranceProvider },
  } = useController({ name: `${nameRef}.provider`, control });
  const {
    field: { onChange: onChangeInsuranceCoverage },
  } = useController({ name: `${nameRef}.coverage`, control });
  const {
    field: { onChange: onChangeInsuranceId },
  } = useController({ name: `${nameRef}.insuranceId`, control });
  const {
    field: { onChange: onChangeInsuranceRegistrationType },
  } = useController({ name: `${nameRef}.registrationType`, control });
  const {
    field: { onChange: onChangeCoverageStartDate },
  } = useController({ name: `${nameRef}.startDate`, control });

  const {
    field: { onChange: onChangeCoverageEndDate },
  } = useController({ name: `${nameRef}.endDate`, control });

  const { insuranceTypes, handleChange } = useInsuranceProviderType({
    onChangeInsuranceProvider,
    onChangeInsuranceCoverage,
    onChangeInsuranceId,
    onChangeInsuranceRegistrationType,
    onChangeCoverageStartDate,
    onChangeCoverageEndDate,
  });

  return (
    <CustomFormSelect
      data-cy={`${nameRef}.insurance-type-dropdown`}
      control={control}
      placeholder="Insurance Provider type"
      name={`${nameRef}.type`}
      width="100%"
      data={insuranceTypes}
      onChange={handleChange}
    />
  );
};
