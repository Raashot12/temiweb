'use client';

// import { useLoggedInUser } from '@/state/hooks';
import { statusMappingForFilter } from '@/utils/constants';
import styled from '@emotion/styled';
import { Alert, Center, Flex, Loader, Modal, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconAlertCircle } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import Header from './LabQueueHeader';
import SimpleLabQueueBox from './SimpleLabQueueBox';
import { InvestigationsForLaboratoryQueueResponse } from '@/types/index';
import NoRecordFound from './NoRecordFound';
import Dashboard from '@/layouts/Dashboard';

const AccordionContainer = styled.div`
  margin-top: 17px;
`;

const LabQueueTable = () => {
  // Dummy logged in user data
  const loggedInUser = {
    role: 'laboratory scientist',
    id: 1,
    name: 'Dr. John Doe',
    email: 'john.doe@example.com',
  };
  const [query, setQuery] = useState('');
  const [opened, setOpened] = useState<boolean>(false);
  const [patientDetails, setPatientDetails] =
    useState<InvestigationsForLaboratoryQueueResponse>();
  const [selectedValue, setSelectedValue] = useState<string | null>('');
  const [isOpeningInvoiceModal, setIsOpeningInvoiceModal] = useState(false);
  const [selectedValueTwo, setSelectedValueTwo] = useState<string | null>('');
  const [sortby, setSortyBy] = useState<string | never>(
    'Most Recent Investigations',
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

  // Mock data for laboratory queue
  const [laboratoryData, setLaboratoryData] = useState<{
    totalCount: number;
    items: InvestigationsForLaboratoryQueueResponse[];
  }>({ totalCount: 0, items: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Remove duplicate mock data - using the one in useMemo below

  // Mock laboratory data - moved to useMemo to fix dependency warning
  const mockLaboratoryData = React.useMemo(
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
            status: 'Result Ready',
            isSampleTaken: true,
            dataEntryUser: 'Lab Tech 1',
            reviewerFullName: 'Dr. Sarah Wilson',
            invoiceItemId: 1,
            invoiceId: 1,
            investigationReviewerId: 1,
            isDeleted: false,
            updateIsDisabled: false,
            reviewer: {
              reviewerId: 1,
              reviewerFullname: 'Dr. Sarah Wilson',
            },
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
            status: 'Awaiting Review',
            isSampleTaken: true,
            dataEntryUser: 'Lab Tech 2',
            paymentStatus: 'Paid',
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
            status: 'Image Ready',
            isSampleTaken: false,
            dataEntryUser: 'Radiology Tech',
            reviewerFullName: 'Dr. Robert Brown',
            paymentStatus: 'Paid',
            invoiceItemId: 3,
            invoiceId: 2,
            investigationReviewerId: 2,
            isDeleted: false,
            updateIsDisabled: false,
            reviewer: {
              reviewerId: 2,
              reviewerFullname: 'Dr. Robert Brown',
            },
          },
        ],
      },
    ],
    [],
  );

  // Filter and search logic
  useEffect(() => {
    setIsLoading(true);

    // Simulate API delay
    const timer = setTimeout(() => {
      let filteredData = [...mockLaboratoryData];

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

      // Apply status filter
      if (selectedValue && selectedValue !== 'All Investigations') {
        filteredData = filteredData
          .map((patient) => ({
            ...patient,
            investigationItems:
              patient.investigationItems?.filter(
                (item) => item.status === selectedValue,
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

      setLaboratoryData({
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
    mockLaboratoryData,
  ]);

  // Reset pagination when search changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, numStart: 0 }));
  }, [debounceQuery]);

  const refetch = () => {
    // Mock refetch function
    console.log('Refetching laboratory data...');
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

  const checkScientistTechnician = [
    'laboratory scientist',
    'laboratory technician',
  ].includes(loggedInUser?.role as string);

  function filterPatientInvestigations(
    labInvestigationItems?: InvestigationsForLaboratoryQueueResponse[],
  ) {
    if (checkScientistTechnician) {
      return labInvestigationItems
        ?.map((patient) => {
          const filteredInvestigations = patient?.investigationItems?.filter(
            (item) => item.status !== 'Requested' && item.status !== 'Invoiced',
          );
          return {
            ...patient,
            investigationItems: filteredInvestigations,
          };
        })
        .filter(
          (patient) =>
            patient.investigationItems && patient.investigationItems.length > 0,
        );
    }

    return labInvestigationItems ?? [];
  }

  return (
    <Dashboard title="Laboratory">
      <Header
        query={query}
        setSelectedValue={setSelectedValue}
        setSelectedValueTwo={setSelectedValueTwo}
        handleSortData={handleSortData}
        setQuery={setQuery}
        pagination={{
          itemsPerPage: MAX_RESULT_PER_PAGE,
          handlePagination,
          items: laboratoryData?.totalCount ? laboratoryData?.totalCount : 0,
        }}
      />
      <AccordionContainer data-cy="laboratory-queue-container">
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
            Error Fetching Lab queue data
          </Alert>
        ) : (
          <>
            {query.length > 1 &&
            (filterPatientInvestigations(
              laboratoryData?.items as InvestigationsForLaboratoryQueueResponse[],
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
              (filterPatientInvestigations(
                laboratoryData?.items as InvestigationsForLaboratoryQueueResponse[],
              )?.length as number) <= 0 ? (
              <NoRecordFound
                mainText="No data recorded"
                subText="Laboratory Queue will be displayed here when available"
                wrapperStyles={{ height: '100%', padding: '40px 0' }}
              />
            ) : (
              <>
                {filterPatientInvestigations(
                  laboratoryData?.items as InvestigationsForLaboratoryQueueResponse[],
                )?.map((value) => {
                  return (
                    <SimpleLabQueueBox
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
      {/* {opened && (
        <LaboratoryRequestInvestigation
          toggleClose={() => setOpened(false)}
          opened={opened}
          refetch={refetch}
          setIsOpeningInvoiceModal={setIsOpeningInvoiceModal}
          setOpened={setOpened}
          handleOpenCheckoutModal={handleRequestInvestigationCheckoutModalOpen}
          setPatientDetails={setPatientDetails}
        />
      )}
      {invoiceModal && (
        <RequestInvestigationCreateInvoice
          patientDetails={patientDetails}
          refetch={refetch}
          invoiceModal={invoiceModal}
          setInvoiceModal={setInvoiceModal}
        />
      )} */}
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
                Please wait....
              </Text>
            </Flex>
          </Center>
        </Modal>
      )}
    </Dashboard>
  );
};

export default LabQueueTable;
