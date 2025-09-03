import {
  Flex,
  Loader,
  Select,
  Switch,
  Grid,
  Box,
  SelectProps,
} from '@mantine/core';
import { Control, FieldPath, useController, useWatch } from 'react-hook-form';
import {
  CustomFormDateSelectPastDate,
  CustomFormSelect,
} from '@/components/shared/CustomSelect';
import {
  CustomFormInput,
  InputErrorStyle,
} from '@/components/shared/CustomTextInput';
import { appColors } from '@/theme/colors';
import IconArrowDownSmall from '@/components/shared/IconComponents/IconArrowDownSmall';
import { AddPatientSchema } from './schema';

const IsNewToHospitalSwitch = ({
  control,
}: {
  control: Control<AddPatientSchema>;
}) => {
  const {
    field: { ref, value, onBlur, onChange },
    fieldState: { error },
  } = useController({ name: 'isNewToHospital', control });

  return (
    <Switch
      data-cy="switch-new-patient"
      ref={ref}
      checked={value}
      onBlur={onBlur}
      onChange={onChange}
      size="lg"
      error={error?.message}
    />
  );
};

const NationalityFormInput = ({
  control,
}: {
  control: Control<AddPatientSchema>;
}) => {
  const nationalities: SelectProps['data'] = [];

  const {
    field: { onChange: setRegion },
  } = useController({ name: 'stateOfOriginId', control });

  return (
    <CustomFormSelect
      data-cy="nationality"
      control={control}
      placeholder={'Nationality'}
      label="Nationality"
      name="countryId"
      searchable
      clearable
      width={'100%'}
      onChange={() => {
        setRegion(null);
      }}
      data={nationalities}
    />
  );
};

const StateOfOriginFormInput = ({
  control,
}: {
  control: Control<AddPatientSchema>;
}) => {
  const {
    field: { ref, onChange, onBlur, value },
    fieldState: { error },
  } = useController<AddPatientSchema>({ name: 'stateOfOriginId', control });

  const selectedNationality = useWatch({
    control,
    name: 'countryId',
  });

  const isNationalityFieldCleared =
    selectedNationality === undefined ||
    selectedNationality?.length === 0 ||
    selectedNationality === null;

  const regions: SelectProps['data'] = [
    { value: 'abia', label: 'Abia' },
    { value: 'adamawa', label: 'Adamawa' },
    { value: 'akwa-ibom', label: 'Akwa Ibom' },
    { value: 'anambra', label: 'Anambra' },
    { value: 'bauchi', label: 'Bauchi' },
    { value: 'bayelsa', label: 'Bayelsa' },
    { value: 'benue', label: 'Benue' },
    { value: 'borno', label: 'Borno' },
    { value: 'cross-river', label: 'Cross River' },
    { value: 'delta', label: 'Delta' },
    { value: 'ebonyi', label: 'Ebonyi' },
    { value: 'edo', label: 'Edo' },
    { value: 'ekiti', label: 'Ekiti' },
    { value: 'enugu', label: 'Enugu' },
    { value: 'gombe', label: 'Gombe' },
    { value: 'imo', label: 'Imo' },
    { value: 'jigawa', label: 'Jigawa' },
    { value: 'kaduna', label: 'Kaduna' },
    { value: 'kano', label: 'Kano' },
    { value: 'katsina', label: 'Katsina' },
    { value: 'kebbi', label: 'Kebbi' },
    { value: 'kogi', label: 'Kogi' },
    { value: 'kwara', label: 'Kwara' },
    { value: 'lagos', label: 'Lagos' },
    { value: 'nasarawa', label: 'Nasarawa' },
    { value: 'niger', label: 'Niger' },
    { value: 'ogun', label: 'Ogun' },
    { value: 'ondo', label: 'Ondo' },
    { value: 'osun', label: 'Osun' },
    { value: 'oyo', label: 'Oyo' },
    { value: 'plateau', label: 'Plateau' },
    { value: 'rivers', label: 'Rivers' },
    { value: 'sokoto', label: 'Sokoto' },
    { value: 'taraba', label: 'Taraba' },
    { value: 'yobe', label: 'Yobe' },
    { value: 'zamfara', label: 'Zamfara' },
    { value: 'fct', label: 'FCT (Abuja)' },
  ];
  const isFetching = false;

  return (
    <Flex style={{ gap: '4px', width: '100%' }}>
      <Select
        data-cy="state-of-origin"
        ref={ref}
        value={value as string | null}
        placeholder={'State of origin'}
        onBlur={onBlur}
        onChange={onChange}
        searchable
        label="State of origin"
        clearable
        disabled={isNationalityFieldCleared}
        w={'100%'}
        data={regions}
        error={error?.message}
        styles={InputErrorStyle}
        rightSection={
          isFetching ? <Loader size={17} /> : <IconArrowDownSmall />
        }
      />
    </Flex>
  );
};

const TitleFormInput = ({
  control,
  name,
  label,
}: {
  control: Control<AddPatientSchema>;
  name: FieldPath<AddPatientSchema>;
  label?: string;
}) => {
  const titles: SelectProps['data'] = [
    { value: 'Mr', label: 'Mr' },
    { value: 'Mrs', label: 'Mrs' },
    { value: 'Ms', label: 'Ms' },
    { value: 'Dr', label: 'Dr' },
  ];

  return (
    <CustomFormSelect
      control={control}
      name={name}
      label={label}
      data={titles}
      placeholder="Title"
      searchable
    />
  );
};

const PersonalDetails = ({
  control,
}: {
  control: Control<AddPatientSchema>;
}) => {
  return (
    <Box
      style={{
        gap: 16,
        flexWrap: 'wrap',
        margin: '10px 0px',
        '.mantine-Popover-dropdown[data-position="top-start"]': {
          marginTop: '100px',
        },
      }}
    >
      <Grid>
        <Grid.Col span={{ lg: 7, md: 12 }}>
          <Flex gap={20} w={'100%'}>
            <CustomFormInput
              data-cy="first-name"
              control={control}
              placeholder="First name"
              label="First name"
              name="firstName"
              width="100%"
              required
            />
            <CustomFormInput
              data-cy="middle-name"
              label="Middle name"
              control={control}
              placeholder="Middle name"
              width="100%"
              name="middleName"
            />
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ lg: 5, md: 12 }}>
          <Flex gap={20} w={'100%'}>
            <CustomFormInput
              data-cy="last-name"
              control={control}
              placeholder="Last name"
              label="Last name"
              name="lastName"
              width="100%"
              required
            />
            <Flex>
              <TitleFormInput control={control} name={'title'} label="Title" />
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ lg: 3, md: 6 }}>
          <CustomFormDateSelectPastDate
            control={control}
            placeholder="Date of birth"
            label="Date of birth"
            name="dateOfBirth"
            width="100%"
          />
        </Grid.Col>
        <Grid.Col span={{ lg: 3, md: 6 }}>
          <CustomFormSelect
            data-cy="gender"
            label="Gender"
            control={control}
            placeholder={'Gender'}
            name="genderType"
            width="100%"
            data={['Male', 'Female', 'Other']}
            required
  
          />
        </Grid.Col>
        <Grid.Col span={{ lg: 3, md: 6 }}>
          <CustomFormInput
            data-cy="phone-number"
            label="Phone Number"
            control={control}
            placeholder="Phone Number"
            name="phoneNumber"
            width="100%"
            required
            type="number"
          />
        </Grid.Col>
        <Grid.Col span={{ lg: 3, md: 6 }}>
          <CustomFormInput
            data-cy="email-address"
            label="Email Address"
            control={control}
            placeholder="Email address"
            name="emailAddress"
            required
            width="100%"
          />
        </Grid.Col>
        {/* <PatientdentitesForm control={control} name={'patientIdentities'} /> */}
        <Grid.Col span={{ lg: 6, md: 12 }}>
          <CustomFormInput
            data-cy="house-address"
            label="Address"
            control={control}
            placeholder="Address"
            name={'address'}
            width="100%"
          />
        </Grid.Col>
        <Grid.Col span={{ lg: 3, md: 6 }}>
          <NationalityFormInput control={control} />
        </Grid.Col>
        <Grid.Col span={{ lg: 3, md: 6 }}>
          <StateOfOriginFormInput control={control} />
        </Grid.Col>{' '}
      </Grid>
    </Box>
  );
};
export default PersonalDetails;
