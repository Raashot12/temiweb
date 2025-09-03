import { useEffect, useState, useMemo, useCallback } from 'react';
import { Combobox, InputBase, useCombobox } from '@mantine/core';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { appColors } from '@/theme/colors';
import { useDebouncedValue } from '@mantine/hooks';

type SelectCreatableProps<T extends FieldValues> = {
  initialData: { label: string; value: string }[];
  placeholder?: string;
  onCreate?: (newValue: { label: string; value: string }) => void;
  label: string;
  control: Control<T>;
  name: Path<T>;
};

export const SelectCreatable = <T extends FieldValues>({
  initialData = [],
  placeholder,
  onCreate,
  label,
  control,
  name,
}: SelectCreatableProps<T>) => {
  const { field, fieldState } = useController({ control, name });
  const [data, setData] = useState(initialData);
  const [inputValue, setInputValue] = useState('');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [debouncedInput] = useDebouncedValue(inputValue, 300);

  useEffect(() => {
    if (field.value) {
      setInputValue(field.value.label || '');
    }
  }, [field.value]);

  useEffect(() => {
    if (initialData?.length) {
      setData(initialData);
    }
  }, [initialData]);

  const filteredData = useMemo(() => {
    if (data?.some((item) => item.label === debouncedInput)) {
      return data;
    }
    return data?.filter((item) =>
      item.label.toLowerCase().includes(debouncedInput.toLowerCase().trim())
    );
  }, [debouncedInput, data]);

  const handleCreateOption = useCallback(() => {
    const newItem = { label: inputValue.trim(), value: inputValue.trim() };
    setData((prev) => [...prev, newItem]);
    setInputValue(newItem.label);
    onCreate?.(newItem);
    field.onChange(newItem);
  }, [inputValue, field, onCreate]);

  const handleOptionSubmit = useCallback(
    (selected: string) => {
      if (selected === '$create') {
        handleCreateOption();
      } else {
        const selectedItem = data?.find((item) => item.label === selected);
        if (selectedItem) {
          setInputValue(selectedItem.label);
          field.onChange(selectedItem);
        }
      }
      combobox.closeDropdown();
    },
    [data, field, combobox, handleCreateOption]
  );

  return (
    <div>
      <Combobox store={combobox} onOptionSubmit={handleOptionSubmit}>
        <Combobox.Target>
          <InputBase
            aria-label={label}
            label={label}
            value={inputValue}
            placeholder={placeholder}
            rightSection={<Combobox.Chevron />}
            onChange={(e) => {
              setInputValue(e.currentTarget.value);
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
            rightSectionPointerEvents="none"
            error={fieldState?.error?.message}
            styles={{
              label: {
                fontWeight: '600',
                marginBottom: '4px',
                fontSize: '14px',
                color: appColors.text,
              },
            }}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {filteredData?.map((item) => (
              <Combobox.Option key={item.value} value={item.label}>
                {item.label}
              </Combobox.Option>
            ))}
            {!filteredData?.some((item) => item.label === inputValue) &&
              inputValue.trim() && (
                <Combobox.Option value="$create">
                  + Create {inputValue}
                </Combobox.Option>
              )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
};
