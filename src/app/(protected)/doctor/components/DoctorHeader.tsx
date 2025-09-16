'use client';
import { Box, Flex, Select, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import IconSort from '@/components/shared/IconComponents/IconSort';
import { Pagination } from '@/components/shared/CustomPagination';
import { appColors } from '@/theme/colors';
import IconSearch from '@/components/shared/IconComponents/IconSearch';
import { SORT_DATA } from '../../receiptionist/components/constant';

const DoctorHeader = ({
  totalItems,
  onPaginationChange,
  search,
  onSearchChange,
}: {
  totalItems: number;
  onPaginationChange: ({ from, to }: { from: number; to: number }) => void;
  search: string;
  onSearchChange: (search: string) => void;
}) => {
  const isMobile = useMediaQuery('(max-width: 50rem)');

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
      <Flex justify="center" gap={20} align="center" w="100%">
        <Flex align="center" gap={20} flex={0.5}>
          <TextInput
            type="text"
            style={{
              flex: 1,
              width: '100%',
              boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
            }}
            placeholder="Find patient"
            rightSection={<IconSearch size={18} />}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Flex>
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
            Today’s patients
          </Box>
          <Flex align={'center'} columnGap={20}>
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

export default DoctorHeader;
