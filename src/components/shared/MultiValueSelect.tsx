
import { Box, Flex, Text } from '@mantine/core';
import Select, {
  components,
  DropdownIndicatorProps,
  GroupBase,
  MultiValue,
  MultiValueGenericProps,
  MultiValueRemoveProps,
} from 'react-select';
import { InputsBadge } from './InputsBadge';
import IconClear from './IconComponents/IconClear';
import IconUpSmall from './IconComponents/IconUpSmall';
import { appColors } from '@/theme/colors';

export interface MultiSelectOption {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const MultiValueContainer = (
  props: MultiValueGenericProps<MultiSelectOption>
) => {
  return (
    <Flex pt={5}>
      <InputsBadge>
        <components.MultiValueContainer {...props} />
      </InputsBadge>
    </Flex>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps<MultiSelectOption>) => {
  return (
    <components.MultiValueRemove {...props}>
      <IconClear fill={'#677597'} size={'8'} />
    </components.MultiValueRemove>
  );
};

const IndicatorSeparator = () => null;

const DropdownIndicator = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <IconUpSmall fill={'#677597'} />
    </components.DropdownIndicator>
  );
};

const MultiValueSelect = (props: {
  dataCy?: string;
  placeholder?: string;
  options: MultiSelectOption[];
  defaultValues?: MultiSelectOption[];
  isDisabled?: boolean;
  isSearchable?: boolean;
  onChange?: (value: MultiValue<MultiSelectOption>) => void;
  value?: MultiSelectOption[];
  id?: string;
  label?: string;
  isType?: boolean;
}) => {
  const {
    label,
    placeholder,
    options,
    defaultValues = [],
    isDisabled = false,
    isSearchable = false,
    onChange = () => {},
    isType = false,
    dataCy,
    ...rest
  } = props;

  return (
    <Box>
      {label && (
        <Text sx={{ fontSize: 12, color: '#212529', fontWeight: 500 }} mb={5}>
          {label}
        </Text>
      )}
      <Select
        {...rest}
        data-cy={dataCy}
        id={props.id}
        onChange={onChange}
        isSearchable={isSearchable}
        defaultValue={defaultValues}
        isDisabled={isDisabled}
        placeholder={placeholder}
        components={{
          MultiValueContainer,
          MultiValueRemove,
          DropdownIndicator,
          IndicatorSeparator,
        }}
        isClearable={!isType}
        isMulti
        name="colors"
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderRadius: '10px',
            border: `1px solid ${appColors.halfFade}`,
            background: `${appColors.white}`,
            alignItems: 'center',
            flexGrow: 200,
            minHeight: 50,
            ...(isType && { maxHeight: 40, height: 40, overflowY: 'auto' }),
          }),
          option: (baseStyles) => ({
            ...baseStyles,
            fontWeight: 500,
          }),
          multiValueLabel: (base) => ({
            ...base,
            background: '#cdd8f3',
          }),
          multiValueRemove: (base) => ({
            ...base,
            background: '#cdd8f3',
            ':hover': { background: '#cdd8f3' },
          }),
        }}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </Box>
  );
};

export default MultiValueSelect;
