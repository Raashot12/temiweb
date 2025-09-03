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
  thAlign?: CSSProperties['alignItems'];
  thJustify?: CSSProperties['justifyContent'];
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
      <Grid
        gutter={4}
        px="12px"
        style={{ borderRadius: '10px', backgroundColor: appColors.quatreFade }}
        mb={10}
      >
        {columns.map((column, index) => (
          <Grid.Col
            key={index}
            span={{ base: 12, xs: column.span }}
            style={{
              display: 'flex',
              alignItems: column.thAlign || 'center',
              justifyContent: column.thJustify || 'flex-start',
            }}
          >
            <Text fw={600} fz={styles?.thFontSize} c={appColors?.text}>
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
          // h={'250px'}
          type="never"
          {...styles?.containerStyles}
          style={{ borderRadius: styles?.containerStyles?.radius }}
        >
          {data?.map((rowData, index: number) => (
            <Grid
              py="12px"
              px="16px"
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
