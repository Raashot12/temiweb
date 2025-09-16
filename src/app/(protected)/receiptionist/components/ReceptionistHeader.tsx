/* eslint-disable react/no-unescaped-entities */
'use client';
import { Box, Button, Flex, Select, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import IconSort from '@/components/shared/IconComponents/IconSort';
import { SORT_DATA } from './constant';
import IconPlusCircle from '@/components/shared/IconComponents/IconPlusCircle';
import { FaCalendarCheck } from "react-icons/fa";
import { IoFilter } from 'react-icons/io5';
import { Pagination } from '@/components/shared/CustomPagination';
import { appColors } from '@/theme/colors';
import IconSearch from '@/components/shared/IconComponents/IconSearch';
import { useRouter } from 'next/navigation';

const AddNewPatientButton = ({
  setPatientModal,
}: {
  setPatientModal?: (args: boolean) => void;
}) => {
  return (
    <>
      <Button
        data-cy={'add-patient'}
        h={'2.5rem'}
        rightSection={<IconPlusCircle color="white" />}
        onClick={() => setPatientModal?.(true)}
      >
        Add new patient
      </Button>
    </>
  );
};

const ReceptionistHeader = ({
  totalItems,
  onPaginationChange,
  setShowAddPatientModal,
}: {
  totalItems: number;
  onPaginationChange: ({ from, to }: { from: number; to: number }) => void;
  setShowAddPatientModal?: (args: boolean) => void;
}) => {
  const isMobile = useMediaQuery('(max-width: 50rem)');
  const ALL_CLINICS = { label: 'All clinics', value: '' };
  const router = useRouter();
  return (
    <Flex
      direction="column"
      gap={5}
      style={{
        position: 'sticky',
        background: '#EDF0F8',
        top: 44,
        width: '100%',
        maxHeight: 'fit-content',
        zIndex: 40,
        paddingTop: 10,
        transition: 'top 0.2s ease-in-out',
        willChange: 'transform',
      }}
    >
      <Flex justify="space-between" gap={20} align="center" w="100%">
        <AddNewPatientButton setPatientModal={setShowAddPatientModal} />
        <Flex align="center" gap={20} flex={0.5}>
          <TextInput
            type="text"
            style={{
              flex: 1,
              width: '100%',
              boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
            }}
            placeholder="Search patient"
            data-cy={'laboratory-patient-search'}
            data-testid={'search-on-lab-queue-head'}
            rightSection={<IconSearch size={18} />}
          />
        </Flex>
        <Button
          data-cy={'add-patient'}
          h={'2.5rem'}
          rightSection={<FaCalendarCheck size={20} color="white" />}
          onClick={() => router.push('/book-appointment')}
        >
          Create Appointment
        </Button>
      </Flex>
      <Flex
        direction={isMobile ? 'column' : 'row'}
        justify="space-between"
        style={{ width: '100%', margin: '0.8rem 0' }}
      >
        <Flex gap={50} align="center">
          <Box
            style={{
              fontWeight: 700,
              color: '#051438',
              fontSize: '18px',
              lineHeight: '22px',
            }}
          >
            Today's Appointments
          </Box>
          <Flex align={'center'} columnGap={20}>
            <Select
              leftSection={<IoFilter color="#3E8BCF" />}
              data={[ALL_CLINICS]}
              defaultValue=""
              variant="unstyled"
              styles={{
                input: {
                  color: '#051438',
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: '20px',
                  width: 'auto',
                },
              }}
            />
            <Select
              placeholder={'Sort by'}
              variant="unstyled"
              data={SORT_DATA ?? []}
              leftSection={<IconSort />}
              styles={{
                input: {
                  '--input-placeholder-color': appColors.black,
                  fontWeight: 500,
                  '&[data-placeholder]': {
                    color: appColors.black,
                    opacity: 1,
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: '20px',
                  },
                  '&[data-placeholder] *': {
                    color: appColors.black,
                    opacity: 1,
                  },
                },
              }}
            />
          </Flex>
        </Flex>
        <Flex justify="flex-end">
          <Pagination
            itemsPerPage={totalItems > 0 ? 20 : 0}
            totalItems={totalItems > 0 ? totalItems : 0}
            handlePagination={onPaginationChange}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ReceptionistHeader;
