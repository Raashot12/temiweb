
import { Control, useWatch } from 'react-hook-form';
import { CreateFacilityDetailsSchema } from './validationSchema';
import { CustomFormSelect } from '@/components/shared/CustomSelect';
import IconArrowInput from '@/components/shared/IconComponents/IconArrowInput';
import { appColors } from '@/theme/colors';
import { useApiServicesAppRegionsGetallGetQuery } from '@/state/services/regionsApi';


const FacilityRegionsFormInput = ({
  control,
  countries,
  country,
  region,
}: {
  region: `state` | `facilities.${number}.state`;
  country: `country` | `facilities.${number}.country`;
  countries: {value: string; label: string}[];
  control: Control<CreateFacilityDetailsSchema>;
}) => {
  const selectedCountry = useWatch({
    control,
    name: country,
  });

  const countryCodeFilter = countries.find(
    (item) => item.label?.toLowerCase() === selectedCountry?.toLowerCase()
  )?.value;

  const skipApi = selectedCountry === '' || !countryCodeFilter;
  const { data: regions = [] } = useApiServicesAppRegionsGetallGetQuery(
    {
      countryCodeFilter,
    },
    {
      skip: skipApi,
      selectFromResult: (result) => {
        return {
          ...result,
          data: result.data?.items?.map((item) => `${item.region?.name}`),
        };
      },
    }
  );

  return (
    <CustomFormSelect
      control={control}
      name={region}
      label="State/Province"
      placeholder="Select state"
      searchable
      withAsterisk
      disabled={skipApi}
      data={regions}
      rightSection={<IconArrowInput fill={appColors.lowerText} />}
    />
  );
};

export default FacilityRegionsFormInput;
