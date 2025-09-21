import styled from '@emotion/styled';
import { BoxProps, Button, Center, Flex, FlexProps } from '@mantine/core';
import { DateInput, DatePicker } from '@mantine/dates';
import { useState } from 'react';
import { BaseSelectionModalWrapper } from './BaseSelectionModal';
import { appColors } from '@/theme/colors';
import IconDateTime from './IconComponents/IconDateTime';

type FilterAppointmentByDateProps = {
  size?: string;
  label?: string;
  openModal: boolean;
  handleModalClose: () => void;
  handleDuration?: (startDate: Date | null, endDate: Date | null) => void;
  selectedOptionType?: string;
  onFromDateChange?: (date: Date | null) => void;
  refetch?: () => void;
  onToDateChange?: (date: Date | null) => void;
  onFilterChange?: ({
    from,
    to,
  }: {
    from: Date | null;
    to: Date | null;
  }) => void;
};
type Color = {
  color?: string;
};
export const TextFontSize18FontWeight700LineHeight27 = styled.span<Color>`
  font-weight: 700;
  color: ${(prop) => prop.color};
  font-size: 18px;
  line-height: 27px;
`;
const CalendarWrapper = styled(Flex)<FlexProps>`
  flex-direction: row;
  background-color: ${appColors.text};
  max-height: 450px;
  padding: 10px 32px;
  margin: 16px 0;
  overflow: hidden;
`;

const HeaderWrapper = styled(Flex)<FlexProps>`
  flex-direction: column;
  gap: 8px;
`;
const DateWrapper = styled(Flex)<FlexProps>`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  pointer-events: none;
`;

const DoneAndCancelWrapper = styled(Flex)<FlexProps>`
  justify-content: flex-end;
  margin-top: 15px;
  gap: 10px;
`;
const FilterByDateRange = ({
  size,
  label,
  openModal,
  handleModalClose,
  handleDuration,
  onFromDateChange,
  onToDateChange,
  onFilterChange,
}: FilterAppointmentByDateProps) => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const handleOkClicked = () => {
    handleDuration?.(fromDate, toDate);
    onFromDateChange?.(fromDate);
    onToDateChange?.(toDate);
    onFilterChange?.({ from: fromDate, to: toDate });
    handleModalClose();
  };

  return (
    <BaseSelectionModalWrapper
      size={size || '40vw'}
      py="24px"
      px="0px"
      openModal={openModal}
      handleModalClose={handleModalClose}
      header={
        <HeaderWrapper px={'32px'}>
          <TextFontSize18FontWeight700LineHeight27 color={appColors.text}>
            {label || 'See appointments from:'}
          </TextFontSize18FontWeight700LineHeight27>
          <DateWrapper aria-disabled={true}>
            <DateInput
              id="fromDate"
              valueFormat="DD MMM YYYY"
              value={fromDate}
              onChange={(date) => setFromDate(date)}
              placeholder="From"
              rightSection={<IconDateTime color={appColors.text} />}
              sx={{ flexGrow: 1 }}
            />
            <TextFontSize18FontWeight700LineHeight27>
              to:
            </TextFontSize18FontWeight700LineHeight27>
            <DateInput
              id="toDate"
              valueFormat="DD MMM YYYY"
              value={toDate}
              onChange={(date) => setToDate(date)}
              placeholder="To"
              rightSection={<IconDateTime color={appColors.text} />}
              sx={{ flexGrow: 1 }}
            />
          </DateWrapper>
        </HeaderWrapper>
      }
      footer={
        <DoneAndCancelWrapper px={'32px'}>
          <Button
            variant="outline"
            w={'100px'}
            px={2}
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            w={'100px'}
            disabled={!fromDate || !toDate}
            onClick={handleOkClicked}
          >
            Done
          </Button>
        </DoneAndCancelWrapper>
      }
    >
      <CalendarWrapper>
        <Center w={'100%'}>
          <DatePicker
            type="range"
            data-autofocus
            value={[fromDate, toDate]}
            allowSingleDateInRange
            onChange={([from, to]) => {
              setFromDate(from);
              setToDate(to);
            }}
            styles={(theme) => ({
              cell: {
                border: `1px solid ${theme.colors.gray[3]}`,
              },
              day: {
                height: 40,
                width: 70,
                fontSize: theme.fontSizes.md,
                color: `${appColors.fade}`,
                fontWeight: 600,
                ':hover': {
                  backgroundColor: `${appColors.subText}`,
                },
                ':active': {
                  backgroundColor: `${appColors.subText}`,
                },
              },
              weekday: {
                fontSize: theme.fontSizes.md,
                color: 'black',
                fontWeight: 700,
              },
              weekdayCell: {
                fontSize: theme.fontSizes.xl,
                backgroundColor: theme.colors.gray[1],
                border: `1px solid ${theme.colors.gray[3]}`,
                height: 25,
              },
              weekend: {
                color: 'blue',
              },
              calendarHeaderControl: {
                color: `${appColors.fade}`,
                ':hover': {
                  backgroundColor: `${appColors.subText}`,
                },
              },
              calendarHeader: {
                maxWidth: '80%',
                margin: '0 auto',
              },
              calendarHeaderLevel: {
                color: `${appColors.fade}`,
                fontWeight: 700,
                fontSize: '18px',
                ':hover': {
                  backgroundColor: `${appColors.subText}`,
                },
              },

              monthPicker: { color: 'red' },
              monthPickerControls: { color: 'red' },
              monthPickerControl: { color: 'red' },
              monthPickerControlActive: { color: 'red' },
              month: { color: 'red' },
            })}
          />
        </Center>
      </CalendarWrapper>
    </BaseSelectionModalWrapper>
  );
};
export default FilterByDateRange;
