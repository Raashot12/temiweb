import { momentBrowserTimezone } from '@/utils/utils';
import styled from '@emotion/styled';
import { Button, Flex, Select, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import IconArrowInput from '../IconComponents/IconArrowInput';
import CloseIcon from '../IconComponents/IconClose';
import FilterByDateRange from '../FilterByDateRange';
import ModalLayoutWrapper from '../ModalLayoutWrapper';
import IconCalendarAppointment from '../IconComponents/IconCalendarAppointment';
import { FacilityDto } from '@/types/custom';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  facility?: FacilityDto;
  setOpenDownloadModal?: (value: boolean) => void;
  fromDate: Date | null;
  toDate: Date | null;
  setFromDate: (value: Date | null) => void;
  setToDate: (value: Date | null) => void;
  setInsuranceName: (value: string) => void;
  setDownloadClaims?: (args: boolean) => void;
};

export const CustomSelect = styled(Select)<{
  bgcolor?: string;
}>`
  & input {
    font-weight: 500;
    background: ${(props) =>
      props.bgcolor ? `${props.bgcolor}` : 'rgb(11, 12, 125)'};
    color: #051438;
    &:hover {
      border: none;
    }
    &:disabled {
      background: rgb(11, 12, 125, 0.25);
      color: linen;
      opacity: 1;
    }
    &::placeholder {
      color: #a6afc2;
    }
  }
`;
const DownloadClaimsModal = ({
  isOpen,
  setIsOpen,
  setOpenDownloadModal,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  setInsuranceName,
  setDownloadClaims,
}: ModalProps) => {
  // Static insurance providers data
  const insurancesData = [
    {
      label: 'Medicare Health',
      value: '1',
    },
    {
      label: 'LifeCare Insurance',
      value: '2',
    },
    {
      label: 'Wellness Assurance',
      value: '3',
    },
    {
      label: 'TrustPlus Health',
      value: '4',
    },
  ];

  const [selectedInsuranceProvider, setSelectedInsuranceProvider] = useState<
    string | undefined
  >(undefined);
  const [openCalenderModal, setOpenCalenderModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const convertedFromDate =
    fromDate &&
    momentBrowserTimezone(fromDate.toISOString()).format('DD MMM YYYY');
  const convertedToDate =
    toDate && momentBrowserTimezone(toDate.toISOString()).format('DD MMM YYYY');

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setIsOpen(false);
      setOpenDownloadModal?.(true);
      setDownloadClaims?.(true);
      setLoading(false);
    }, 700);
  };

  return (
    <>
      {openCalenderModal && (
        <FilterByDateRange
          label="Select duration"
          onFromDateChange={(value: Date | null) => {
            setFromDate(value);
          }}
          onToDateChange={(value: Date | null) => {
            setToDate(value);
          }}
          openModal={openCalenderModal}
          handleModalClose={() => {
            setOpenCalenderModal(false);
          }}
        />
      )}
      <ModalLayoutWrapper
        open={isOpen}
        size="40"
        footer={
          <Flex align={'center'} justify={'flex-end'}>
            <Button
              type={'submit'}
              data-testid={'close_button'}
              disabled={!fromDate || !toDate}
              loading={loading}
              sx={{
                backgroundColor: '#0B0C7D',
                border: 'none',
                color: '#FFF',
                '&:hover': {
                  backgroundOpacity: 0.8,
                  color: '#ffff',
                },
                '&::disabled': {
                  backgroundColor: '#E6E8EB',
                },
              }}
              onClick={handleSubmit}
            >
              Preview claims summary
            </Button>
          </Flex>
        }
        title={
          <Flex w={'100%'} align={'center'} justify={'space-between'}>
            <Flex direction={'column'} align={'start'}>
              <Text size={'xl'} fw={600} color="#051438">
                Select parameters
              </Text>
              <Text size={'14px'} fw={500}>
                Select insurance provider and the duration
              </Text>
            </Flex>
            <CloseIcon
              handleClose={() => {
                setIsOpen(false);
              }}
            />
          </Flex>
        }
      >
        <Flex mt={15} gap={'40px'} direction={'column'}>
          <CustomSelect
            data={insurancesData ?? []}
            value={selectedInsuranceProvider}
            label="Pick Insurance provider"
            onChange={(arg) => {
              setSelectedInsuranceProvider(arg as string);
              const findName = insurancesData.find(
                (item) => item.value === arg,
              );
              if (findName) setInsuranceName(findName?.label ?? '');
            }}
            fw={500}
            mah={40}
            placeholder="Select insurance provider"
            rightSection={<IconArrowInput fill="#A6AFC2" />}
            bgcolor="#FFF"
          />

          <TextInput
            label="Pick date range"
            sx={{
              '.mantine-15qa7t6': {
                fontWeight: 500,
                cursor: 'pointer',
              },
            }}
            onClick={() => setOpenCalenderModal(true)}
            value={
              fromDate && toDate
                ? `${convertedFromDate} to ${convertedToDate}`
                : ''
            }
            placeholder={'Select duration'}
            mah={40}
            rightSection={<IconCalendarAppointment fill="#A6AFC2" />}
          />
        </Flex>
      </ModalLayoutWrapper>
    </>
  );
};

export default DownloadClaimsModal;
