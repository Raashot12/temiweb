import { SetStateAction, Dispatch, useState } from 'react';
import {
  Title,
  Button,
  TextInput,
  Flex,
  Select,
  Box,
  Loader,
  Text,
} from '@mantine/core';
import styled from '@emotion/styled';
import { IconSearch } from '@tabler/icons-react';
// import { useLoggedInUser } from '@/state/hooks';
import { appColors } from '@/theme/colors';
import IconArrowInput from '@/components/shared/IconComponents/IconArrowInput';
import IconSort from '@/components/shared/IconComponents/IconSort';
import { SORT_DATA } from '../../receiptionist/components/constant';
import { Pagination } from '@/components/shared/CustomPagination';
import { useMediaQuery } from '@mantine/hooks';
import { IoFilter } from 'react-icons/io5';

const InputSearchHeader = styled(TextInput)`
  width: 100%;
  box-shadow: '0px 0px 5px rgba(0, 0, 0, 0.1)';
`;

const TextHeading = styled(Title)`
  font-weight: 600;
  font-size: 24px;
  color: #051438;
  line-height: 29px;
`;
const HeaderSelect = styled(Select)`
  color: #051438;
  font-weight: 600 !important;
  & .mantine-Select-input {
    font-weight: 500;
  }
`;
export type SortItem = {
  value: string;
  label: string;
};
export type PaginationData = {
  itemsPerPage: number;
  handlePagination?: ({ from, to }: { from: number; to: number }) => void;
  items: number;
  firstPage?: number;
};
interface HeaderProps {
  query: string;
  setSelectedValue: Dispatch<SetStateAction<string | null>>;
  setSelectedValueTwo: Dispatch<SetStateAction<string | null>>;
  handleSortData: (args: string | never) => void;
  setQuery: Dispatch<SetStateAction<string>>;
  pagination: PaginationData;
}

const sortData: SortItem[] = [
  {
    value: 'Most Recent Investigations',
    label: 'Most recent investigations',
  },
  {
    value: 'Earliest Investigations',
    label: 'Earliest investigations',
  },
];
const Header = ({
  query,
  setSelectedValue,
  setSelectedValueTwo,
  handleSortData,
  setQuery,
  pagination,
}: HeaderProps) => {
  const [statusesValue, setStatusesValue] = useState<string | null>(
    'All Investigations',
  );
  const [typeValue, setTypeValue] = useState<string | null>('All categories');
  const [sortValue, setSortValue] = useState<string | null>(null);
  
  const isMobile = useMediaQuery('(max-width: 50rem)');
  const totalItems = pagination.items;
  const onPaginationChange = ({ from, to }: { from: number; to: number }) => {
    pagination.handlePagination?.({ from, to });
  };
  
  // Handle status change
  const handleStatusChange = (value: string | null) => {
    setStatusesValue(value);
    setSelectedValue(value); // Connect to existing filter state
  };
  
  // Handle type change
  const handleTypeChange = (value: string | null) => {
    setTypeValue(value);
    setSelectedValueTwo(value); // Connect to existing filter state
  };
  
  // Handle sort change
  const handleSortChange = (value: string | null) => {
    setSortValue(value);
    if (value) {
      handleSortData(value); // Connect to existing sort functionality
    }
  };
  
  // Dummy logged in user data
  const loggedInUser = {
    role: 'laboratory administrator',
    id: 1,
    name: 'Dr. Jane Smith',
    email: 'jane.smith@example.com',
  };

  // Static data - similar to ReceptionistHeader pattern
  const STATUSES_DATA = [
    { value: 'All Investigations', label: 'All Investigations' },
    { value: 'Requested', label: 'Requested' },
    { value: 'Result Ready', label: 'Result Ready' },
    { value: 'Image Ready', label: 'Image Ready' },
    { value: 'Awaiting Review', label: 'Awaiting Review' },
    { value: 'Report Ready', label: 'Report Ready' },
  ];

  const TYPES_DATA = [
    { value: 'All categories', label: 'All categories' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Hematology', label: 'Hematology' },
    { value: 'Microbiology', label: 'Microbiology' },
    { value: 'Radiology', label: 'Radiology' },
    { value: 'Pathology', label: 'Pathology' },
  ];

  return (
    <Box
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
      <Flex
        justify={{ sm: 'space-between' }}
        align={{ base: 'center' }}
        wrap="wrap"
        mt={10}
      >
        <Flex justify="space-between" gap={20} align="center" w="100%">
          <TextHeading>Laboratory Queue</TextHeading>
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rightSection={<IconSearch size={18} />}
            />
          </Flex>
          <Button h={'2.5rem'}>Request Investigation</Button>
        </Flex>

        <Flex
          direction={isMobile ? 'column' : 'row'}
          justify="space-between"
          style={{ width: '100%', margin: '0.8rem 0' }}
        >
          <Flex gap={50} align="center">
            <Flex align={'center'} columnGap={20}>
              <Select
                leftSection={<IoFilter color="#3E8BCF" />}
                data={TYPES_DATA}
                value={typeValue}
                onChange={handleTypeChange}
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
                placeholder={'All Investigations'}
                variant="unstyled"
                data={STATUSES_DATA ?? []}
                value={statusesValue}
                onChange={handleStatusChange}
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
              <Select
                placeholder={'Sort by'}
                variant="unstyled"
                data={sortData ?? []}
                value={sortValue}
                onChange={handleSortChange}
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
    </Box>
  );
};

export default Header;
