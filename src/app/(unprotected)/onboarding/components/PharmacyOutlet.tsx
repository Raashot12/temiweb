import React, { useState } from 'react';
import CollapsibleFormWrapper from '@/components/shared/CollapsibleFormWrapper';
import { Checkbox, Grid, Group, Stack, Text } from '@mantine/core';
import { appColors } from '@/theme/colors';
import FacilityRegionsFormInput from './formUtils/FacilityRegionsFormInput';
import { CustomFormInput } from '@/components/shared/CustomTextInput';
import FacilityPhoneNumberInput from './formUtils/FacilityPhoneNumberInput';
import { CustomFormSelect } from '@/components/shared/CustomSelect';
import IconArrowInput from '@/components/shared/IconComponents/IconArrowInput';
import { Control, useWatch } from 'react-hook-form';
import { CreateFacilityDetailsSchema } from './formUtils/validationSchema';
import { useApiServicesAppCountriesGetallGetQuery } from '@/state/services/countryApi';

const PharmacyOutlet = ({
  index,
  control,
}: {
  index: number;
  control: Control<CreateFacilityDetailsSchema>;
}) => {
  const [checked, setChecked] = useState(false);
  const nameRef = `facilities.${index}` as const;

  const facilityName = useWatch({
    control,
    name: `facilities.${index}.name`,
  });
  const facilityId = useWatch({
    control,
    name: `facilities.${index}.facilityId`,
  });
  const facilityLogoId = useWatch({
    control,
    name: `facilities.${index}.facilityLogoId`,
  });
  const { data: countries = [] } = useApiServicesAppCountriesGetallGetQuery(
    {},
    {
      selectFromResult: (result) => {
        return {
          ...result,
          data: result.data?.items?.map((item) => ({
            label: `${item.country?.name}`,
            value: `${item.country?.code}`,
          })),
        };
      },
    },
  );
  return (
    <CollapsibleFormWrapper
      title="Outlet 1"
      isOpened={false}
      buttonText="Add Outlet"
      handleButtonClicked={() => {}}
      isDependant={false}
    >
      <Group gap={12} mt={16}>
        <Checkbox
          checked={checked}
          onChange={(event) => {
            setChecked(event.currentTarget.checked);
          }}
          size="20px"
          radius={'sm'}
          style={{
            '& .mantine-Checkbox-input': {
              backgroundColor: 'transparent',
            },
          }}
        />
        <Text fz={16} fw={500} c={appColors.text}>
          Use existing pharmacy group details
        </Text>
      </Group>
      <Stack gap={16} mt={16}>
        <Grid gutter={'lg'}>
          <Grid.Col span={{ xs: 12, sm: 4 }}>
            <CustomFormSelect
              control={control}
              name={`${nameRef}.level`}
              label="Outlet type"
              placeholder="Select type"
              searchable
              withAsterisk
              data={['Primary', 'Secondary', 'Tertiary']}
              rightSection={<IconArrowInput fill={appColors.lowerText} />}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 8 }}>
            <CustomFormInput
              control={control}
              name={`${nameRef}.name`}
              label="Outlet name"
              placeholder="Enter outlet name"
              withAsterisk
              width="100%"
            />
          </Grid.Col>
        </Grid>
        <Grid gutter={'lg'}>
          <Grid.Col span={{ xs: 12, sm: 6, md: 6 }}>
            <CustomFormInput
              control={control}
              name={`${nameRef}.address`}
              label="Outlet address"
              placeholder="Enter outlet street address"
              withAsterisk
              width="100%"
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 6, md: 2 }}>
            <CustomFormSelect
              control={control}
              name={`${nameRef}.country`}
              label="Country"
              placeholder="Select country"
              searchable
              withAsterisk
              data={countries.map((item) => `${item.label}`)}
              rightSection={<IconArrowInput fill={appColors.lowerText} />}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 6, md: 2 }}>
            <FacilityRegionsFormInput
              country={`${nameRef}.country`}
              region={`${nameRef}.state`}
              control={control}
              countries={countries}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 6, md: 2 }}>
            <CustomFormInput
              control={control}
              name={`${nameRef}.city`}
              label="City/Town"
              placeholder="Example: Ikeja"
              withAsterisk
              width="100%"
            />
          </Grid.Col>
        </Grid>

        <Grid gutter={'lg'}>
          <Grid.Col span={{ xs: 12, sm: 4 }}>
            <FacilityPhoneNumberInput
              control={control}
              label="Outlet phone number"
              phoneCodeName={`${nameRef}.phoneCode`}
              withAsterisk
              phoneNumberName={`${nameRef}.phoneNumber`}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 3 }}>
            <CustomFormInput
              control={control}
              name={`${nameRef}.emailAddress`}
              label="Outlet email address"
              placeholder="Enter email address"
              withAsterisk
              width="100%"
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 3 }}>
            <CustomFormInput
              control={control}
              name={`${nameRef}.website`}
              label="Facility website"
              placeholder="Enter website"
              width="100%"
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 2 }}>
            <CustomFormInput
              control={control}
              label="Post code"
              name={`${nameRef}.postCode`}
              inputMode={'decimal'}
              type="number"
              placeholder="Enter code"
              width="100%"
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </CollapsibleFormWrapper>
  );
};

export default PharmacyOutlet;
