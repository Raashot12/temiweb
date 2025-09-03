import { Control } from 'react-hook-form';
import { useApiServicesAppCountriesGetallGetQuery } from '@/state/services/countryApi';
import { Box, Flex, Stack, Text } from '@mantine/core';
import {
  CustomFormCountrySelect,
  CustomFormSelect,
} from '@/components/shared/CustomSelect';
import {
  CustomFormInput,
  InputErrorStyle,
} from '@/components/shared/CustomTextInput';
import IconArrowInput from '@/components/shared/IconComponents/IconArrowInput';
import { CreateFacilityDetailsSchema } from './validationSchema';
import { appColors } from '@/theme/colors';

const FacilityPhoneNumberInput = ({
  label,
  phoneCodeName,
  phoneNumberName,
  control,
  withAsterisk,
}: {
  label: string;
  phoneCodeName: `phoneCode` | `facilities.${number}.phoneCode`;
  phoneNumberName: `phoneNumber` | `facilities.${number}.phoneNumber`;
  control: Control<CreateFacilityDetailsSchema>;
  withAsterisk?: boolean;
}) => {
  const { data: countriesData = [] } = useApiServicesAppCountriesGetallGetQuery(
    {},
    {
      selectFromResult: (result) => {
        return {
          ...result,
          data: result.data?.items?.map((item) => ({
            label: `${item.country?.phoneCode} ${item.country?.name}`,
            value: `${item.country?.phoneCode}`,
          })),
        };
      },
    },
  );

  return (
    <Stack w={'100%'} gap={7}>
      <Text fz={14} fw={600} c={appColors.text}>
        {label}{' '}
        {withAsterisk && (
          <span style={{ color: appColors.red, fontSize: '14px' }}>*</span>
        )}
      </Text>
      <Flex w={'100%'} align={'flex-start'}>
        <CustomFormCountrySelect
          control={control}
          searchable
          placeholder={'Country code'}
          name={phoneCodeName}
          width="100%"
          data={countriesData}
          styles={{
            input: {
              borderRadius: '0px',
              borderTopLeftRadius: '0.625rem',
              borderBottomLeftRadius: '0.625rem',
              borderRightWidth: '2px',
            },
          }}
        />

        <CustomFormInput
          control={control}
          name={phoneNumberName}
          type="text"
          placeholder="Enter phone number"
          width="100%"
          styles={{
            input: {
              borderRadius: '0px',
              borderTopRightRadius: '0.625rem',
              borderBottomRightRadius: '0.625rem',
              borderLeft: 'none',
            },
            error: { color: appColors?.red, fontWeight: 500 },
          }}
        />
      </Flex>
    </Stack>
  );
};
export default FacilityPhoneNumberInput;
