import { appColors } from '@/theme/colors';
import {
  CustomFormSelect,
  IdFormInput,
} from '@/components/shared/CustomSelect';
import {
  Badge,
  Button,
  Flex,
  Group,
  SelectProps,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import {
  Control,
  FieldPath,
  FieldValues,
  Path,
  useController,
  useFieldArray,
  useWatch,
} from 'react-hook-form';
import { defaultGuardian, defaultNextOfKin } from './DefaultRelation';
import { AddPatientSchema } from './validationSchema';
import { CustomFormInput, InputErrorStyle } from '../CustomTextInput';
import { RELATIONSHIP } from '@/utils/constants';
import IconFingerPrint from '../IconComponents/IconFingerPrint';
import IconRemove from '../IconComponents/IconRemove';
import IconPlusCircle from '../IconComponents/IconPlusCircle';

const TitleFormInput = ({
  control,
  name,
  dataCyTitle,
}: {
  control: Control<AddPatientSchema>;
  name: FieldPath<AddPatientSchema>;
  dataCyTitle: string;
}) => {
  return (
    <CustomFormSelect
      data-cy={dataCyTitle}
      control={control}
      name={name}
      placeholder={'Title'}
      data={[]}
      width={'100px'}
      searchable
      display="flex"
    />
  );
};

const RemoveNewPatientMultipleFormFooterButton = ({
  onRemove,
}: {
  onRemove: VoidFunction;
}) => {
  return (
    <Button
      onClick={onRemove}
      bg={appColors.white}
      h={'32px'}
      px={'12px'}
      radius={'10px'}
      style={{
        '&:hover': {
          backgroundColor: appColors.white,
        },
      }}
      styles={{
        root: {
          border: `1px solid ${appColors.fadeRed}`,
        },
      }}
    >
      <Group style={{ gap: '8px' }}>
        <IconRemove />
        <Text fw={600} color={appColors.fadeRed}>
          Remove
        </Text>
      </Group>
    </Button>
  );
};

export const FormHeader = ({
  title,
  onRemove,
  showRemoveButton,
  showAddFingerprint = true,
}: {
  title: string;
  onRemove: VoidFunction;
  showRemoveButton: boolean;
  showAddFingerprint?: boolean;
}) => {
  return (
    <Flex style={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Group gap={32}>
        <Text
          style={{
            fontWeight: 600,
            color: appColors.black,
            lineHeight: '16px',
          }}
        >
          {title}
        </Text>
      </Group>

      {showRemoveButton && (
        <RemoveNewPatientMultipleFormFooterButton onRemove={onRemove} />
      )}
    </Flex>
  );
};

export const AddNewPatientMultipleFormFooterButton = ({
  labelText,
  onAddNew,
  dataCy,
}: {
  labelText: string;
  onAddNew: VoidFunction;
  dataCy: string;
}) => {
  return (
    <UnstyledButton
      onClick={onAddNew}
      style={{ alignSelf: 'flex-start' }}
      data-cy={dataCy}
    >
      <Group style={{ gap: '8px' }}>
        <IconPlusCircle color={appColors.blue} />
        <Text td={'underline'} fw={600} color={appColors.blue}>
          {labelText}
        </Text>
      </Group>
    </UnstyledButton>
  );
};

const AddressInput = <T extends FieldValues>({
  name,
  control,
  dataCyAddress,
}: {
  name: FieldPath<T>;
  control: Control<T>;
  dataCyAddress: string;
}) => {
  const {
    field: { ref, value, onBlur, onChange },
    fieldState: { error },
  } = useController<T, FieldPath<T>>({ name, control });

  const patientAddressFieldValue = useWatch({
    control,
    name: 'address' as Path<T>,
  });

  const handleSameAs = () => {
    onChange(patientAddressFieldValue);
  };

  return (
    <TextInput
      data-cy={dataCyAddress}
      ref={ref}
      value={value}
      onBlur={onBlur}
      placeholder={'Address'}
      error={error?.message}
      onChange={onChange}
      w="100%"
      miw={'180px'}
      styles={InputErrorStyle}
      rightSectionWidth={110}
    />
  );
};

const RelationshipInput = ({
  control,
  nameRef,
  dataCy,
}: {
  control: Control<AddPatientSchema>;
  nameRef: `nextOfKinForm.${number}` | `guardianForm.${number}`;
  dataCy: string;
}) => {
  const relationshipList: SelectProps['data'] = RELATIONSHIP.map((item) => ({
    label: `${item
      ?.replace(/_|([A-Z]+)/g, (match: string, group: string) => {
        return group ? ` ${group}` : ' ';
      })
      .trim()}`,
    value: item,
  }));

  return (
    <CustomFormSelect
      control={control}
      data-cy={dataCy}
      width="100%"
      name={`${nameRef}.relationship`}
      placeholder={'Relationship'}
      data={relationshipList}
      searchable
    />
  );
};

/** This is the base form for Patient's next of kin and Guardian since they have same fields and layout */
const PatientRelativesBaseForm = ({
  control,
  name,
  formLabel,
  addNewFormLabelText,
  dataCyAddNew,
}: {
  formLabel: string;
  addNewFormLabelText: string;
  name: 'nextOfKinForm' | 'guardianForm';
  control: Control<AddPatientSchema>;
  dataCyAddNew: string;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleAppend = () => {
    if (name === 'nextOfKinForm') {
      append(defaultNextOfKin);
    } else {
      append(defaultGuardian);
    }
  };

  return (
    <Flex style={{ flexDirection: 'column' }}>
      {fields.map((field, index) => {
        const nameRef = `${name}.${index}` as const;
        return (
          <Flex style={{ flexDirection: 'column' }} key={field.id}>
            <FormHeader
              title={`${formLabel}${fields.length > 1 ? ` ${index + 1}` : ''}`}
              onRemove={() => remove(fields.length - 1)}
              showRemoveButton={index > 0}
            />

            <Flex
              style={{
                gap: '15px',
                flexWrap: 'wrap',
                padding: '16px 0px',
                flexDirection: 'row',
              }}
            >
              <Flex w="100%" gap={30}>
                <CustomFormInput
                  data-cy={`${nameRef}.firstName`}
                  control={control}
                  width="100%"
                  name={`${nameRef}.firstName`}
                  placeholder={'First name'}
                />

                <CustomFormInput
                  data-cy={`${nameRef}.middleName`}
                  control={control}
                  name={`${nameRef}.middleName`}
                  placeholder={'Middle name'}
                  width="100%"
                />

                <CustomFormInput
                  data-cy={`${nameRef}.lastName`}
                  control={control}
                  name={`${nameRef}.lastName`}
                  placeholder={'Last name'}
                  width="100%"
                />
                <Flex>
                  <TitleFormInput
                    dataCyTitle={`${nameRef}.title`}
                    control={control}
                    name={`${nameRef}.title`}
                  />
                </Flex>
              </Flex>

              <Flex w="100%" gap={30}>
                <AddressInput
                  dataCyAddress={`${nameRef}.address`}
                  control={control}
                  name={`${nameRef}.address`}
                />

                <CustomFormInput
                  data-cy={`${nameRef}.phoneNumber`}
                  control={control}
                  width="100%"
                  name={`${nameRef}.phoneNumber`}
                  placeholder={'Phone number'}
                />
              </Flex>
              <Flex w="100%" gap={30}>
                <CustomFormInput
                  data-cy={`${nameRef}.emailAddress`}
                  control={control}
                  width="100%"
                  name={`${nameRef}.email`}
                  placeholder={'Email address'}
                />
                <Flex w="50%">
                  <RelationshipInput
                    control={control}
                    nameRef={nameRef}
                    dataCy={`${nameRef}.relationship`}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
      <AddNewPatientMultipleFormFooterButton
        labelText={addNewFormLabelText}
        onAddNew={handleAppend}
        dataCy={dataCyAddNew}
      />
    </Flex>
  );
};

export const NextOfKinForm = ({
  control,
}: {
  control: Control<AddPatientSchema>;
}) => {
  return (
    <PatientRelativesBaseForm
      name={'nextOfKinForm'}
      control={control}
      formLabel={'Next of kin'}
      addNewFormLabelText={'Add Next of kin'}
      dataCyAddNew="add-next-of-kin"
    />
  );
};

export const GuardianDetailsForm = ({
  control,
}: {
  control: Control<AddPatientSchema>;
}) => {
  return (
    <PatientRelativesBaseForm
      name={'guardianForm'}
      control={control}
      formLabel={'Guardian'}
      addNewFormLabelText={'Add Guardian'}
      dataCyAddNew="add-guardian"
    />
  );
};
