import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@mantine/core';
import { useMediaQuery, usePagination } from '@mantine/hooks';
import styles from './CustomPagination.module.css';
import IconArrowBackMobile from '../IconComponents/IconArrowBackMobile';
import IconArrowNextMobile from '../IconComponents/IconArrowNextMobile';
import PaginationArrowIcon from '../IconComponents/PaginationArrowIcon';
import { MOBILE_BREAKPOINT } from '@/utils/constants';
import { appColors } from '@/theme/colors';

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  handlePagination?: ({ from, to }: { from: number; to: number }) => void;
};

export const Pagination = ({
  itemsPerPage,
  totalItems,
  handlePagination,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = usePagination({ total: totalPages, initialPage: 1 });
  const [fromPages, setFromPages] = useState(1);
  const [toPages, setToPages] = useState(
    totalItems > itemsPerPage ? itemsPerPage : totalItems,
  );
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT})`);

  const updatePagination = (from: number, to: number) => {
    setFromPages(from);
    setToPages(to);

    handlePagination?.({
      from: from === 1 ? 0 : from > 1 ? from - 1 : from,
      to: from === 1 ? itemsPerPage : to,
    });
  };

  const nextPage = () => {
    if (pagination.active < totalPages) {
      const newFromPages = fromPages + itemsPerPage;
      const newToPages = Math.min(newFromPages + itemsPerPage - 1, totalItems);
      pagination.next();
      updatePagination(newFromPages, newToPages);
    }
  };

  const previousPage = () => {
    if (pagination.active > 1) {
      const newFromPages = fromPages - itemsPerPage;
      const newToPages = fromPages - 1;
      pagination.previous();
      updatePagination(newFromPages, newToPages);
    }
  };

  useEffect(() => {
    const newToPages = Math.min(fromPages + itemsPerPage - 1, totalItems);
    setToPages(newToPages);
  }, [fromPages, totalItems, itemsPerPage]);

  if (!totalItems) return null;

  return (
    <Flex className={styles.container}>
      <Flex className={styles.paginationWrapper}>
        <Box className={isMobile ? styles.mobileDisplay : styles.hidden}>
          <IconArrowBackMobile
            onclick={previousPage}
            fill={pagination.active === 1 ? '#DFE2E9' : '#051438'}
          />
        </Box>
        <Box
          className={styles.paginateColor}
          style={
            {
              '--color': isMobile ? '#051438' : '#677597',
              '--fontSize': isMobile ? '14px' : '16px',
            } as React.CSSProperties
          }
        >
          <Flex justify="center" c={appColors.black}>
            <span>{fromPages}</span>&nbsp;
            <span>-</span>
            &nbsp;<span>{toPages}</span>
          </Flex>
        </Box>
        <Box
          className={styles.paginateColor}
          c={appColors.black}
          style={
            {
              '--color': isMobile ? '#051438' : '#677597',
              '--fontSize': isMobile ? '14px' : '16px',
            } as React.CSSProperties
          }
        >
          of
        </Box>
        <Box
          className={styles.paginateColor}
          c={appColors.black}
          style={
            {
              '--color': isMobile ? '#051438' : '#677597',
              '--fontSize': isMobile ? '14px' : '16px',
            } as React.CSSProperties
          }
        >
          {totalItems}
        </Box>
        <Box className={isMobile ? styles.mobileDisplay : styles.hidden}>
          <IconArrowNextMobile
            onclick={() => {
              nextPage();
            }}
            fill={pagination.active === totalPages ? '#DFE2E9' : '#051438'}
          />
        </Box>
      </Flex>
      <Box className={isMobile ? styles.hidden : styles.paginationWrapper}>
        <PaginationArrowIcon
          onClick={previousPage}
          direction={'left'}
          disabled={pagination.active === 1}
        />
        <PaginationArrowIcon
          onClick={nextPage}
          direction={'right'}
          disabled={pagination.active === totalPages}
        />
      </Box>
    </Flex>
  );
};
