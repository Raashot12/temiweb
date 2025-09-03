import { Flex, Loader, Select, SelectProps, SimpleGrid } from '@mantine/core';
import { CustomFormSelect } from '@/components/shared/CustomSelect';
import {
  CustomFormInput,
  InputErrorStyle,
} from '@/components/shared/CustomTextInput';
import {
  BLOOD_GENOTYPE,
  BLOOD_GROUP,
  MARITAL_STATUS,
  RELIGION,
} from '@/utils/constants';
import { Control, useController, useWatch } from 'react-hook-form';
import IconArrowDownSmall from '@/components/shared/IconComponents/IconArrowDownSmall';
import { AddPatientSchema } from './validationSchema';

const LGAOfOriginFormInput = ({
  control,
}: {
  control: Control<AddPatientSchema>;
}) => {
  const {
    field: { ref, onChange, onBlur, value },
    fieldState: { error },
  } = useController<AddPatientSchema>({ name: 'districtId', control });

  const selectedStateOfOrigin = useWatch({
    control,
    name: 'stateOfOriginId',
  });

  const isStateOfOriginFieldCleared =
    selectedStateOfOrigin === undefined ||
    selectedStateOfOrigin?.length === 0 ||
    selectedStateOfOrigin === null;

  const isFetching = false;

  // Static district/LGA list
  const lgaOfOriginList: SelectProps['data'] = [
    { value: 'ikeja', label: 'Ikeja' },
    { value: 'alimosho', label: 'Alimosho' },
    { value: 'surulere', label: 'Surulere' },
    { value: 'eti-osa', label: 'Eti-Osa' },
    { value: 'mushin', label: 'Mushin' },
  ];

  return (
    <Flex style={{ gap: '4px', width: '100%' }}>
      <Select
        data-cy="lga-origin"
        ref={ref}
        value={value as string | null}
        placeholder={'LGA of origin'}
        onBlur={onBlur}
        onChange={onChange}
        searchable
        clearable
        disabled={isStateOfOriginFieldCleared}
        w={'100%'}
        data={lgaOfOriginList}
        error={error?.message}
        styles={InputErrorStyle}
        rightSection={<IconArrowDownSmall />}
      />
    </Flex>
  );
};

const OtherPersonalDetails = ({
  control,
  occupationList,
}: {
  control: Control<AddPatientSchema>;
  occupationList: SelectProps['data'];
}) => {
  const maritalStatusList = MARITAL_STATUS.map((status) => String(status));
  const religionList = RELIGION.map((status) => String(status));
  const bloodGroupList = BLOOD_GROUP.map((status) => String(status));
  const bloodGenotypeList = BLOOD_GENOTYPE.map((status) => String(status));

  return (
    <Flex style={{ width: '100%', flexDirection: 'column' }} gap={20}>
      <SimpleGrid cols={4}>
        <LGAOfOriginFormInput control={control} />
        <CustomFormInput
          data-cy="ethnicity"
          name="ethnicity"
          control={control}
          width="100%"
          placeholder="Ethnicity"
        />
        <CustomFormSelect
          data-cy="religion"
          name="religion"
          control={control}
          width="100%"
          data={religionList}
          placeholder="Religion"
        />

        <CustomFormSelect
          data-cy="marital-status"
          name="maritalStatus"
          control={control}
          width="100%"
          data={maritalStatusList}
          placeholder="Marital status"
        />

        <CustomFormSelect
          data-cy="blood-group"
          name="bloodGroup"
          control={control}
          width="100%"
          data={bloodGroupList}
          placeholder="Blood group"
        />
        <CustomFormSelect
          data-cy="genotype"
          name="bloodGenotype"
          control={control}
          width="100%"
          data={bloodGenotypeList}
          placeholder="Genotype"
        />
        <CustomFormInput
          data-cy="no-of-spouses"
          name="numberOfSpouses"
          control={control}
          width="100%"
          placeholder="No. of spouses"
        />
        <CustomFormInput
          data-cy="no-of-sibilings"
          name="numberOfSiblings"
          control={control}
          width="100%"
          placeholder="No. of siblings"
        />

        <CustomFormInput
          data-cy="position-in-family"
          name="positionInFamily"
          control={control}
          width="100%"
          placeholder="Position in family"
        />
        <CustomFormInput
          data-cy="no-of-children"
          name="numberOfChildren"
          control={control}
          width="100%"
          placeholder="No. of children"
        />
        <CustomFormInput
          data-cy="nuclear-family-size"
          name="nuclearFamilySize"
          control={control}
          width="100%"
          placeholder="Nuclear family size"
        />
        <CustomFormSelect
          data-cy="occupation"
          name="occupation"
          control={control}
          width="100%"
          searchable
          data={occupationList}
          placeholder="Occupation"
        />
      </SimpleGrid>

      <CustomFormInput
        data-cy="work-location"
        name="locationOfWork"
        control={control}
        width="100%"
        placeholder="Where do you work (Location)?"
      />
    </Flex>
  );
};
export default OtherPersonalDetails;
