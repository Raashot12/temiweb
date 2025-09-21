'use client';

import { statusMappingForFilter } from '@/utils/constants';
import styled from '@emotion/styled';
import { Alert, Center, Flex, Loader, Modal, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconAlertCircle } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import { InvestigationsForLaboratoryQueueResponse } from '@/types/index';
import NoRecordFound from '../../laboratory/components/NoRecordFound';
import Dashboard from '@/layouts/Dashboard';
import CashierHeader from './CashierHeader';
import CashierQueueBox from './CashierQueueBox';

const AccordionContainer = styled.div`
  margin-top: 17px;
`;

const CashierQueueTable = () => {
  // Dummy logged in user data
  const loggedInUser = {
    role: 'cashier',
    id: 1,
    name: 'John Cashier',
    email: 'john.cashier@example.com',
  };
  const [query, setQuery] = useState('');
  const [opened, setOpened] = useState<boolean>(false);
  const [patientDetails, setPatientDetails] =
    useState<InvestigationsForLaboratoryQueueResponse>();
  const [selectedValue, setSelectedValue] = useState<string | null>('');
  const [isOpeningInvoiceModal, setIsOpeningInvoiceModal] = useState(false);
  const [selectedValueTwo, setSelectedValueTwo] = useState<string | null>('');
  const [sortby, setSortyBy] = useState<string | never>(
    'Recent Pending Payments',
  );

  const [invoiceModal, setInvoiceModal] = useState(false);
  const [debounceQuery] = useDebouncedValue(query, 500);
  const MAX_RESULT_PER_PAGE = 10;
  const [pagination, setPagination] = useState({
    numStart: 0,
    numEnd: MAX_RESULT_PER_PAGE,
  });
  const handleSortData = (args: string | never) => {
    setSortyBy(args);
  };

  // Mock data for cashier queue - focusing on billing/payment
  const [cashierData, setCashierData] = useState<{
    totalCount: number;
    items: InvestigationsForLaboratoryQueueResponse[];
  }>({ totalCount: 0, items: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Mock cashier data with payment focus
  const mockCashierData = React.useMemo(
    (): InvestigationsForLaboratoryQueueResponse[] => [
      {
        patientDetail: {
          patientId: 1,
          firstName: 'Sarah',
          lastName: 'Johnson',
          patientDisplayName: 'Sarah Johnson',
          patientCode: 'PT2024001',
          age: '34 years',
          gender: 'Female',
          ward: 'Medical Ward',
          wardBed: 'Bed 15',
          hasInsurance: true,
          phoneNumber: '+234 801 234 5678',
          patientImageUrl: null,
          lastModifiedTime: new Date().toISOString(),
          creationTime: new Date().toISOString(),
          emailAddress: 'sarah.johnson@email.com',
          walletBalance: 5500,
          insuranceInfo: {
            insuranceType: 'Private',
            insuranceNumber: 'INS123456',
            insuranceProvider: 'ABC Insurance',
          },
        },
        investigationItems: [
          {
            sampleNo: 'LAB001',
            investigationName: 'Complete Blood Count',
            investigationNote: 'Routine annual checkup',
            specimen: 'Blood',
            organism: null,
            amount: { amount: 5500, currency: 'NGN' },
            dateCreatedOrLastModified: '2024-01-15T09:30:00Z',
            investigationCategory: 'Hematology',
            investigationId: 1,
            investigationRequestId: 1,
            encounterId: 1,
            paymentStatus: 'Unpaid',
            creatorOrModifierInfo: {
              title: 'Dr.',
              name: 'Michael Chen',
              firstName: 'Michael',
              lastName: 'Chen',
              unit: 'Internal Medicine',
            },
            status: 'Invoiced',
            isSampleTaken: false,
            dataEntryUser: 'Lab Tech 1',
            reviewerFullName: null,
            invoiceItemId: 1,
            invoiceId: 1,
            investigationReviewerId: null,
            isDeleted: false,
            updateIsDisabled: false,
            reviewer: undefined,
          },
          {
            sampleNo: 'LAB002',
            investigationName: 'Liver Function Test',
            investigationNote: 'Follow-up test',
            specimen: 'Blood',
            organism: null,
            amount: { amount: 7500, currency: 'NGN' },
            dateCreatedOrLastModified: '2024-01-15T10:00:00Z',
            investigationCategory: 'Chemistry',
            investigationId: 2,
            investigationRequestId: 2,
            encounterId: 1,
            creatorOrModifierInfo: {
              title: 'Dr.',
              name: 'Michael Chen',
              firstName: 'Michael',
              lastName: 'Chen',
              unit: 'Internal Medicine',
            },
            status: 'Invoiced',
            isSampleTaken: false,
            dataEntryUser: 'Lab Tech 2',
            paymentStatus: 'Unpaid',
            reviewerFullName: null,
            invoiceItemId: 2,
            invoiceId: 1,
            investigationReviewerId: null,
            isDeleted: false,
            updateIsDisabled: false,
            reviewer: undefined,
          },
        ],
      },
      {
        patientDetail: {
          patientId: 2,
          firstName: 'John',
          lastName: 'Smith',
          patientDisplayName: 'John Smith',
          patientCode: 'PT2024002',
          age: '45 years',
          gender: 'Male',
          ward: 'Surgical Ward',
          wardBed: 'Bed 8',
          hasInsurance: false,
          phoneNumber: '+234 802 345 6789',
          patientImageUrl: null,
          lastModifiedTime: new Date().toISOString(),
          creationTime: new Date().toISOString(),
          emailAddress: 'john.smith@email.com',
          walletBalance: 12000,
          insuranceInfo: {
            insuranceType: 'Private',
            insuranceNumber: 'INS123456',
            insuranceProvider: 'Axa Mansard',
          },
        },
        investigationItems: [
          {
            sampleNo: 'LAB003',
            investigationName: 'Chest X-Ray',
            investigationNote: 'Pre-operative assessment',
            specimen: null,
            organism: null,
            amount: { amount: 12000, currency: 'NGN' },
            dateCreatedOrLastModified: '2024-01-16T08:30:00Z',
            investigationCategory: 'Radiology',
            investigationId: 3,
            investigationRequestId: 3,
            encounterId: 2,
            creatorOrModifierInfo: {
              title: 'Dr.',
              name: 'Emily Davis',
              firstName: 'Emily',
              lastName: 'Davis',
              unit: 'Surgery',
            },
            status: 'Invoiced',
            isSampleTaken: false,
            dataEntryUser: 'Radiology Tech',
            reviewerFullName: null,
            paymentStatus: 'Partially Paid',
            invoiceItemId: 3,
            invoiceId: 2,
            investigationReviewerId: null,
            isDeleted: false,
            updateIsDisabled: false,
            reviewer: undefined,
          },
        ],
      },
      {
        patientDetail: {
          patientId: 3,
          firstName: 'Mary',
          lastName: 'Williams',
          patientDisplayName: 'Mary Williams',
          patientCode: 'PT2024003',
          age: '28 years',
          gender: 'Female',
          ward: 'Pediatric Ward',
          wardBed: 'Bed 12',
          hasInsurance: true,
          phoneNumber: '+234 803 456 7890',
          patientImageUrl: null,
          lastModifiedTime: new Date().toISOString(),
          creationTime: new Date().toISOString(),
          emailAddress: 'mary.williams@email.com',
          walletBalance: 25000,
          insuranceInfo: {
            insuranceType: 'Government',
            insuranceNumber: 'NHIS789012',
            insuranceProvider: 'NHIS',
          },
        },
        investigationItems: [
          {
            sampleNo: 'LAB004',
            investigationName: 'Malaria Parasite Test',
            investigationNote: 'Fever investigation',
            specimen: 'Blood',
            organism: null,
            amount: { amount: 2500, currency: 'NGN' },
            dateCreatedOrLastModified: '2024-01-17T11:30:00Z',
            investigationCategory: 'Parasitology',
            investigationId: 4,
            investigationRequestId: 4,
            encounterId: 3,
            creatorOrModifierInfo: {
              title: 'Dr.',
              name: 'James Wilson',
              firstName: 'James',
              lastName: 'Wilson',
              unit: 'Family Medicine',
            },
            status: 'Invoiced',
            isSampleTaken: false,
            dataEntryUser: null,
            reviewerFullName: null,
            paymentStatus: 'Unpaid',
            invoiceItemId: 4,
            invoiceId: 3,
            investigationReviewerId: null,
            isDeleted: false,
            updateIsDisabled: false,
            reviewer: undefined,
          },
        ],
      },
    ],
    [],
  );

  // Filter and search logic for cashier - focus on unpaid/partially paid items
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      let filteredData = [...mockCashierData];

      // Apply search filter
      if (debounceQuery) {
        filteredData = filteredData.filter(
          (item) =>
            item.patientDetail?.patientDisplayName
              ?.toLowerCase()
              .includes(debounceQuery.toLowerCase()) ||
            item.patientDetail?.patientCode
              ?.toLowerCase()
              .includes(debounceQuery.toLowerCase()),
        );
      }

      // Apply payment status filter
      if (selectedValue && selectedValue !== 'All Payments') {
        filteredData = filteredData
          .map((patient) => ({
            ...patient,
            investigationItems:
              patient.investigationItems?.filter(
                (item) => item.paymentStatus === selectedValue,
              ) || [],
          }))
          .filter(
            (patient) =>
              patient.investigationItems &&
              patient.investigationItems.length > 0,
          );
      }

      // Apply category filter
      if (selectedValueTwo && selectedValueTwo !== 'All categories') {
        filteredData = filteredData
          .map((patient) => ({
            ...patient,
            investigationItems:
              patient.investigationItems?.filter(
                (item) => item.investigationCategory === selectedValueTwo,
              ) || [],
          }))
          .filter(
            (patient) =>
              patient.investigationItems &&
              patient.investigationItems.length > 0,
          );
      }

      // Apply pagination
      const startIndex = pagination.numStart;
      const endIndex = startIndex + MAX_RESULT_PER_PAGE;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      setCashierData({
        totalCount: filteredData.length,
        items: paginatedData,
      });
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [
    debounceQuery,
    selectedValue,
    selectedValueTwo,
    pagination.numStart,
    mockCashierData,
  ]);

  // Reset pagination when search changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, numStart: 0 }));
  }, [debounceQuery]);

  const refetch = () => {
    console.log('Refetching cashier data...');
  };

  const handleModalOpen = () => {
    setOpened(true);
  };

  const handleInvoiceModal = () => {
    setInvoiceModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handlePagination = ({ from, to }: { from: number; to: number }) => {
    setPagination({ numStart: from, numEnd: to });
  };

  // Filter for cashier - show only invoiced items that need payment
  function filterCashierInvestigations(
    cashierInvestigationItems?: InvestigationsForLaboratoryQueueResponse[],
  ) {
    return cashierInvestigationItems
      ?.map((patient) => {
        const filteredInvestigations = patient?.investigationItems?.filter(
          (item) => item.status === 'Invoiced' && item.paymentStatus !== 'Paid',
        );
        return {
          ...patient,
          investigationItems: filteredInvestigations,
        };
      })
      .filter(
        (patient) =>
          patient.investigationItems && patient.investigationItems.length > 0,
      ) ?? [];
  }

  return (
    <Dashboard title="Cashier - Payment Processing">
      <CashierHeader
        query={query}
        setSelectedValue={setSelectedValue}
        setSelectedValueTwo={setSelectedValueTwo}
        handleSortData={handleSortData}
        setQuery={setQuery}
        pagination={{
          itemsPerPage: MAX_RESULT_PER_PAGE,
          handlePagination,
          items: cashierData?.totalCount ? cashierData?.totalCount : 0,
        }}
      />
      <AccordionContainer data-cy="cashier-queue-container">
        {isLoading ? (
          <Center>
            <Loader />
          </Center>
        ) : isError ? (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Error"
            color="red.6"
            variant="outline"
            withCloseButton
          >
            Error Fetching Payment queue data
          </Alert>
        ) : (
          <>
            {query.length > 1 &&
            (filterCashierInvestigations(
              cashierData?.items as InvestigationsForLaboratoryQueueResponse[],
            )?.length as number) <= 0 ? (
              <Alert
                icon={<IconAlertCircle size="1rem" />}
                title="Database"
                color="green.6"
                variant="outline"
                withCloseButton={true}
              >
                No Search found in the database
              </Alert>
            ) : query.length <= 0 &&
              (filterCashierInvestigations(
                cashierData?.items as InvestigationsForLaboratoryQueueResponse[],
              )?.length as number) <= 0 ? (
              <NoRecordFound
                mainText="No pending payments"
                subText="Payment queue will be displayed here when available"
                wrapperStyles={{ height: '100%', padding: '40px 0' }}
              />
            ) : (
              <>
                {filterCashierInvestigations(
                  cashierData?.items as InvestigationsForLaboratoryQueueResponse[],
                )?.map((value) => {
                  return (
                    <CashierQueueBox
                      key={value?.patientDetail?.patientId}
                      value={value}
                      patientId={value.patientDetail?.patientId as number}
                      refetch={refetch}
                      sortby={sortby}
                    />
                  );
                })}
              </>
            )}
          </>
        )}
      </AccordionContainer>
      {isOpeningInvoiceModal && (
        <Modal
          sx={{
            '.mantine-Modal-content': {
              background: 'none',
              boxShadow: 'none',
            },
          }}
          opened={isOpeningInvoiceModal}
          withCloseButton={false}
          centered
          onClose={() => {}}
        >
          <Center>
            <Flex direction={'column'} align={'center'}>
              <Loader color="white" size={'md'} />
              <Text color="white" fw={600} mt={10}>
                Processing payment....
              </Text>
            </Flex>
          </Center>
        </Modal>
      )}
    </Dashboard>
  );
};

export default CashierQueueTable;
