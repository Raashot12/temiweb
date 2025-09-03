import { ComboboxData, ComboboxItem, Select } from "@mantine/core";
import styles from "./FilterBy.module.css";
import IconRightSmallCaret from "../IconComponents/IconRightSmallCaret";

type FilterByProps = {
  defaultValue: string;
  width: string;
  data: string[] | ComboboxData;
  handleChange: (value: string | null, option: ComboboxItem) => void;
};

const FilterBy = ({
  width,
  defaultValue,
  data,
  handleChange,
}: FilterByProps) => {
  return (
    <Select
      rightSection={<IconRightSmallCaret />}
      w={width}
      variant="unstyled"
      data={data}
      defaultValue={defaultValue}
      onChange={handleChange}
      classNames={{
        input: styles.filterSelect,
      }}
    />
  );
};
export default FilterBy;
