
import { Flex, Grid } from '@mantine/core';
import { Control, useFieldArray } from 'react-hook-form';
import { defaultPatientInsurance } from './DefaultRelation';
import {
  AddNewPatientMultipleFormFooterButton,
  FormHeader,
} from './RelationsForm';
import { InsuranceProviderCoverageInput } from './formUtils/InsuranceProviderCoverageInput';
import { InsuranceProviderInput } from './formUtils/InsuranceProviderInput';
import { InsuranceProviderTypeInput } from './formUtils/InsuranceProviderTypeInput';
import { AddPatientSchema } from './formUtils/validationSchema';
import InsuranceAdministratorInput from './formUtils/InsuranceAdministratorInput';
import InsuranceStartDate from './formUtils/InsuranceStartDate';
import InsuranceEndDate from './formUtils/InsuranceEndDate';
import { CustomFormInput } from '../CustomTextInput';
import { CustomFormSelect } from '../CustomSelect';

export const PatientInsuranceForm = ({
  control,
  handleInsuranceAdministratorName,
}: {
  control: Control<AddPatientSchema>;
  handleInsuranceAdministratorName: (index: number, name: string) => void;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'insuranceInformations',
  });

  const handlePatientInsurer = async (index: number) => {
    remove(index);
  };

  return (
    <Flex direction={'column'} rowGap={'md'}>
      {fields.map((field, index) => {
        const nameRef = `insuranceInformations.${index}` as const;

        return (
          <Flex direction={'column'} rowGap={'sm'} key={field.id}>
            <FormHeader
              title={`Insurance provider ${index + 1}`}
              onRemove={() => handlePatientInsurer(index)}
              showRemoveButton={fields.length > 1}
              showAddFingerprint={false}
            />

            <Grid>
              <Grid.Col span={3}>
                <InsuranceProviderTypeInput
                  control={control}
                  nameRef={nameRef}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <InsuranceProviderInput control={control} nameRef={nameRef} />
              </Grid.Col>
              <Grid.Col span={3}>
                <InsuranceProviderCoverageInput
                  control={control}
                  nameRef={nameRef}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <CustomFormInput
                  control={control}
                  name={`${nameRef}.insuranceId`}
                  data-cy={`${nameRef}.insuranceId`}
                  placeholder={'Insurance ID'}
                  width="100%"
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <CustomFormSelect
                  control={control}
                  data-cy={`${nameRef}.registrationType`}
                  width="100%"
                  name={`${nameRef}.registrationType`}
                  placeholder={'Registration type'}
                  data={[
                    {
                      label: 'Primary',
                      value: 'Primary',
                    },
                    {
                      label: 'Beneficiary',
                      value: 'Dependent',
                    },
                  ]}
                  searchable
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <InsuranceStartDate control={control} nameRef={nameRef} />
              </Grid.Col>
              <Grid.Col span={3}>
                <InsuranceEndDate control={control} nameRef={nameRef} />
              </Grid.Col>
              <Grid.Col span={3}>
                <InsuranceAdministratorInput
                  control={control}
                  nameRef={nameRef}
                  data-cy={`${nameRef}.administrator-name`}
                  handleChange={(value) =>
                    handleInsuranceAdministratorName(index, value)
                  }
                />
              </Grid.Col>
            </Grid>
          </Flex>
        );
      })}

      <AddNewPatientMultipleFormFooterButton
        labelText={'Add Provider'}
        onAddNew={() => append(defaultPatientInsurance)}
        dataCy="add-insurance-provider"
      />
    </Flex>
  );
};
