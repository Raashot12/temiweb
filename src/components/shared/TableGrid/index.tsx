import {
  Grid,
  Text,
  Box,
  ScrollArea,
  MantineStyleProps,
  CSSProperties,
} from '@mantine/core';
import classes from './TableGrid.module.css';
import { appColors } from '@/theme/colors';
import { EmptyTable } from './EmptyTable';

export type TableGridColumn<T> = {
  label: string;
  span: number;
  render: (data: T) => React.ReactNode;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
};

export type TableGridStyles = {
  rowBackgroundColor?: MantineStyleProps['bg'];
  containerStyles?: TableGridContainerStyles;
  thFontSize?: number;
};

type TableGridContainerStyles = MantineStyleProps & {
  radius?: CSSProperties['borderRadius'];
};

type TableGridProps<T> = {
  columns: TableGridColumn<T>[];
  data: T[];
  styles?: TableGridStyles;
  rowKey: keyof T;
  EmptyStateComponent?: React.ReactNode;
};

export const TableGrid = <T,>({
  columns,
  data,
  rowKey,
  EmptyStateComponent,
  styles = { rowBackgroundColor: appColors.white, thFontSize: 16 },
}: TableGridProps<T>) => {
  return (
    <Box>
      {/* Table header */}
      <Grid gutter={4} pl={15} mb={5} px="lg">
        {columns.map((column, index) => (
          <Grid.Col key={index} span={{ base: 12, xs: column.span }}>
            <Text fw={600} fz={styles?.thFontSize} c="#A6AFC2">
              {column.label}
            </Text>
          </Grid.Col>
        ))}
      </Grid>
      {/* Table body */}
      {data?.length === 0 ? (
        <>{EmptyStateComponent || <EmptyTable />}</>
      ) : (
        <ScrollArea
          h={'calc(100vh - 200px)'}
          type="never"
          {...styles?.containerStyles}
          style={{ borderRadius: styles?.containerStyles?.radius }}
        >
          {data?.map((rowData, index: number) => (
            <Grid
              py="sm"
              px="lg"
              bg={styles?.rowBackgroundColor}
              style={{
                border: '1px solid #eaeaea',
                borderRadius: '10px',
              }}
              key={`${rowData[rowKey]}-${index}`}
              gutter={4}
              mb={10}
            >
              {columns.map((column, colIndex) => (
                <Grid.Col
                  key={`${column.label}-${colIndex}`}
                  span={{ base: 12, xs: Math.min(column.span, 12) }}
                  className={classes.rowStyle}
                  style={{
                    alignItems: column.align || 'flex-start',
                    justifyContent: column.justify || 'flex-start',
                  }}
                >
                  {column.render(rowData)}
                </Grid.Col>
              ))}
            </Grid>
          ))}
        </ScrollArea>
      )}
    </Box>
  );
};
