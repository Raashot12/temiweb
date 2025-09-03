import { Control, useWatch } from 'react-hook-form';
import { AddPatientSchema } from './validationSchema';
import { SelectProps } from '@mantine/core';
import IconSearch from '../../IconComponents/IconSearch';
import { CustomFormSelect } from '../../CustomSelect';
import { useEffect } from 'react';

type InsuranceAdministratorInputProps = {
  control: Control<AddPatientSchema>;
  nameRef: `insuranceInformations.${number}`;
  handleChange: (name: string) => void;
} & Partial<SelectProps>;

const InsuranceAdministratorInput = ({
  control,
  nameRef,
  handleChange,
  ...others
}: InsuranceAdministratorInputProps) => {
  const insuranceType = useWatch({
    control,
    name: `${nameRef}.type`,
  });

  const selectedAdminId = useWatch({
    control,
    name: `${nameRef}.insuranceAdministratorId`,
  });

  const administratorsList: Array<{ label: string; value: string }> = [
    { label: 'NHIA', value: 'nhia' },
    { label: 'HMO A', value: 'hmo_a' },
    { label: 'HMO B', value: 'hmo_b' },
  ];

  useEffect(() => {
    if (!selectedAdminId) return;
    const name = administratorsList.find((x) => x.value === selectedAdminId)?.label;
    if (name) handleChange(name);
  }, [selectedAdminId]);

  return (
    <CustomFormSelect
      {...others}
      control={control}
      placeholder={'Insurance administrator'}
      name={`${nameRef}.insuranceAdministratorId`}
      width="100%"
      data={administratorsList}
      isLoading={false}
      disabled={insuranceType !== 'National'}
      icon={<IconSearch size={20} />}
    />
  );
};

export default InsuranceAdministratorInput;
