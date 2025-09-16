import { SortSelection } from "./StyledComponent";
import { ComboboxItem } from "@mantine/core";


export type SortItem = {
  value: string;
  label: string;
  group: string;
};

type SortProps = {
  placeHolder: string;
  onChange?: (value: string | null, option: ComboboxItem) => void;
  data: SortItem[];
};

const SortPanel = (props: SortProps) => {
  return (
    <SortSelection
      data-cy="sort-by"
      onChange={(props?.onChange)}
      placeholder={props.placeHolder}
      variant="unstyled"
      data={props.data}
      sx={{
        fontWeight: 500,
        width: '220px',
        '.mantine-Input-input': {
          paddingRight: 0,
        },
      }}
    />
  );
};
export default SortPanel;
