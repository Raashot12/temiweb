import { ComboboxData, ComboboxItem, Select } from "@mantine/core";
import styles from "./SortBy.module.css";
import IconSort from "../IconComponents/IconSort";

type SortByProps = {
  data: string[] | ComboboxData;
  handleChange: (value: string | null, option: ComboboxItem) => void;
};

const SortBy = ({ data, handleChange }: SortByProps) => {
  return (
    <Select
      leftSection={<IconSort />}
      placeholder="Sort by"
      w={"230px"}
      variant="unstyled"
      data={data}
      onChange={handleChange}
      classNames={{
        input: styles.selectInput,
      }}
      rightSection={<></>}
    />
  );
};
export default SortBy;
