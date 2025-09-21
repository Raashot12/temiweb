/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import {
  IconPlus,
  IconSearch,
  IconCash,
  IconReceipt,
  IconFileExcel,
} from '@tabler/icons-react';
import { appColors } from '@/theme/colors';
import { Pagination } from '@/components/shared/CustomPagination';
import DownloadClaimsModal from '@/components/shared/SpreedSheetTable/DownloadClaimsModal';
import DownloadClaimsTable from '@/components/shared/SpreedSheetTable/DownloadClaimsTable';
import ModalLayoutWrapper from '@/components/shared/ModalLayoutWrapper';
import { DownloadSpreedSheet } from '@/components/shared/SpreedSheetTable/DownloadSpreedSheet';
import { downloadClaimsData } from '@/components/shared/SpreedSheetTable/SpreedSheetData';
import { useAlertNotification } from '@/hooks/useNotification';

interface CashierHeaderProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedValueTwo: React.Dispatch<React.SetStateAction<string | null>>;
  handleSortData: (args: string) => void;
  pagination: {
    itemsPerPage: number;
    handlePagination: ({ from, to }: { from: number; to: number }) => void;
    items: number;
  };
}

const CashierHeader: React.FC<CashierHeaderProps> = ({
  query,
  setQuery,
  setSelectedValue,
  setSelectedValueTwo,
  handleSortData,
  pagination,
}) => {
  // Claims modal states
  const [showClaimsModal, setShowClaimsModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadClaims, setDownloadClaims] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [insuranceName, setInsuranceName] = useState<string>('');

  const handleViewClaims = () => {
    setShowClaimsModal(true);
  };

  const handleCloseDownloadModal = () => {
    setShowDownloadModal(false);
    setDownloadClaims(false);
    setFromDate(null);
    setToDate(null);
    setInsuranceName('');
  };
  const handleGenerateReport = async () => {
    try {
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).jsPDF;

      // Create a temporary container for the report content
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = '210mm';
      tempContainer.style.backgroundColor = 'white';
      tempContainer.style.padding = '20px';
      tempContainer.style.fontFamily = 'Arial, sans-serif';

      // Generate current date and time
      const now = new Date();
      const reportDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const reportTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });

      // Generate report content
      tempContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700;">CASHIER PAYMENT REPORT</h1>
          <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">Generated on ${reportDate} at ${reportTime}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #333;">Daily Summary</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div style="background: #FFF3CD; padding: 15px; border-radius: 8px; border: 1px solid #FFC107;">
              <h3 style="margin: 0 0 10px 0; color: #856404; font-size: 16px;">Pending Payments</h3>
              <p style="margin: 0; font-size: 24px; font-weight: 700; color: #856404;">${pagination.items || 0}</p>
            </div>
            <div style="background: #D1ECF1; padding: 15px; border-radius: 8px; border: 1px solid #17A2B8;">
              <h3 style="margin: 0 0 10px 0; color: #0C5460; font-size: 16px;">Today's Collections</h3>
              <p style="margin: 0; font-size: 24px; font-weight: 700; color: #0C5460;">₦245,000</p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div style="background: #D4EDDA; padding: 15px; border-radius: 8px; border: 1px solid #28A745;">
              <h3 style="margin: 0 0 10px 0; color: #155724; font-size: 16px;">Completed Payments</h3>
              <p style="margin: 0; font-size: 24px; font-weight: 700; color: #155724;">28</p>
            </div>
            <div style="background: #F8D7DA; padding: 15px; border-radius: 8px; border: 1px solid #DC3545;">
              <h3 style="margin: 0 0 10px 0; color: #721C24; font-size: 16px;">Outstanding Amount</h3>
              <p style="margin: 0; font-size: 24px; font-weight: 700; color: #721C24;">₦125,500</p>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #333;">Payment Methods Breakdown</h2>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #dee2e6;">
            <thead>
              <tr style="background-color: #f8f9fa;">
                <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Payment Method</th>
                <th style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">Transactions</th>
                <th style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6;">Cash</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">15</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">₦125,000</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6;">Card/POS</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">10</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">₦85,000</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6;">Bank Transfer</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">3</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">₦35,000</td>
              </tr>
              <tr style="background-color: #f8f9fa; font-weight: bold;">
                <td style="padding: 12px; border: 1px solid #dee2e6;">Total</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">28</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">₦245,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #333;">Top Investigation Categories</h2>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #dee2e6;">
            <thead>
              <tr style="background-color: #f8f9fa;">
                <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Category</th>
                <th style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">Count</th>
                <th style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6;">Hematology</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">8</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">₦44,000</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6;">Chemistry</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">6</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">₦45,000</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6;">Radiology</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">5</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">₦60,000</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6;">Parasitology</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">4</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">₦10,000</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6;">Others</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">5</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">₦86,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #dee2e6; padding-top: 20px;">
          <p style="margin: 5px 0;">This report was generated electronically by the Cashier System.</p>
          <p style="margin: 5px 0;">Generated by: Cashier System | Report ID: RPT${Date.now()}</p>
        </div>
      `;

      document.body.appendChild(tempContainer);

      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      document.body.removeChild(tempContainer);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const margin = 15;
      const imgWidth = 210 - margin * 2;
      const pageHeight = 297 - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = margin;

      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = margin - (imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `Cashier_Report_${reportDate.replace(/\s/g, '_')}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report. Please try again.');
    }
  };
  const paymentStatusOptions = [
    { value: 'All Payments', label: 'All Payments' },
    { value: 'Unpaid', label: 'Unpaid' },
    { value: 'Partially Paid', label: 'Partially Paid' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Refunded', label: 'Refunded' },
  ];

  const categoryOptions = [
    { value: 'All categories', label: 'All Categories' },
    { value: 'Hematology', label: 'Hematology' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Radiology', label: 'Radiology' },
    { value: 'Parasitology', label: 'Parasitology' },
    { value: 'Microbiology', label: 'Microbiology' },
    { value: 'Immunology', label: 'Immunology' },
  ];

  const sortOptions = [
    { value: 'Recent Pending Payments', label: 'Recent Pending Payments' },
    { value: 'Highest Amount First', label: 'Highest Amount First' },
    { value: 'Lowest Amount First', label: 'Lowest Amount First' },
    { value: 'Patient Name A-Z', label: 'Patient Name A-Z' },
    { value: 'Patient Name Z-A', label: 'Patient Name Z-A' },
  ];
  const { showError, showSuccess } = useAlertNotification();

  const [isDownloadingClaims, setIsDownloadingClaims] = React.useState(false);

  const handleDownloadClaims = async () => {
    try {
      setIsDownloadingClaims(true);

      // Create CSV content
      const headers = [
        'S/N',
        'DATE',
        'NAME',
        'PATIENT NUMBER',
        'PATIENT TYPE',
        'PHONE NUMBER',
        'HMO NUMBER',
        'HMO INSURANCE NAME',
        'AUTHORIZED ADMINISTRATOR',
        'AUTHORIZATION CODE',
        'CLINIC',
        'DIAGNOSIS',
        'SERVICE CATEGORY',
        'SERVICE NAME',
        'AMOUNT',
      ];

      const csvRows = [
        headers.join(','),
        ...downloadClaimsData.map((item, index) =>
          [
            index + 1,
            item.date,
            `"${item.patientName}"`,
            `"${item.fileNo}"`,
            `"${item.patientType}"`,
            `"${item.phoneNo}"`,
            `"${item.nhisNo}"`,
            `"${item.hmoInsuranceName}"`,
            `"${item.authorizedAdministrator}"`,
            `"${item.authorizationCode}"`,
            `"${item.clinic}"`,
            `"${item.diagnosis}"`,
            `"${item.serviceCategory}"`,
            `"${item.serviceName}"`,
            item.amount,
          ].join(','),
        ),
      ];

      const csvContent = csvRows.join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `Claims_Summary_${insuranceName}_${fromDate?.toDateString()}_to_${toDate?.toDateString()}.csv`,
      );
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showSuccess({
        title: 'Success!',
        message: 'Claims summary downloaded successfully!',
      });
    } catch (error) {
      console.error('Error downloading claims:', error);
      showError({
        title: 'Error',
        message: 'Error downloading claims. Please try again.',
      });
    } finally {
      setIsDownloadingClaims(false);
    }
  };
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
        paddingBottom: '10px',
      }}
    >
      {/* Header Title and Action Buttons */}
      <Flex justify="space-between" align="center" mb="lg">
        <Box>
          <Text size="xl" fw={600} c={appColors.black}>
            Payment Queue
          </Text>
          <Text size="sm" c={appColors.subText} mt={4}>
            Process payments for laboratory investigations and services
          </Text>
        </Box>
        <Group>
          <Button
            leftSection={<IconReceipt size={16} />}
            variant="light"
            color="blue"
            onClick={handleGenerateReport}
          >
            Generate Report
          </Button>
          <Button
            leftSection={<IconFileExcel size={16} />}
            variant="light"
            color="blue"
            onClick={handleViewClaims}
          >
            View claims
          </Button>
        </Group>
      </Flex>

      {/* Search and Filters */}
      <Grid gutter="md">
        {/* Search Input */}
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <TextInput
            placeholder="Search by patient name or ID..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftSection={<IconSearch size={16} />}
            style={{
              '& .mantine-TextInput-input': {
                backgroundColor: '#F8F9FA',
                border: '1px solid #E9ECEF',
                borderRadius: '8px',
              },
            }}
          />
        </Grid.Col>

        {/* Payment Status Filter */}
        <Grid.Col span={{ base: 12, sm: 6, md: 2.5 }}>
          <Select
            placeholder="Payment Status"
            data={paymentStatusOptions}
            defaultValue="All Payments"
            onChange={setSelectedValue}
            style={{
              '& .mantine-Select-input': {
                backgroundColor: '#F8F9FA',
                border: '1px solid #E9ECEF',
                borderRadius: '8px',
              },
            }}
          />
        </Grid.Col>

        {/* Category Filter */}
        <Grid.Col span={{ base: 12, sm: 6, md: 2.5 }}>
          <Select
            placeholder="Category"
            data={categoryOptions}
            defaultValue="All categories"
            onChange={setSelectedValueTwo}
            style={{
              '& .mantine-Select-input': {
                backgroundColor: '#F8F9FA',
                border: '1px solid #E9ECEF',
                borderRadius: '8px',
              },
            }}
          />
        </Grid.Col>

        {/* Sort By */}
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Select
            placeholder="Sort by"
            data={sortOptions}
            defaultValue="Recent Pending Payments"
            onChange={(value) => value && handleSortData(value)}
            style={{
              '& .mantine-Select-input': {
                backgroundColor: '#F8F9FA',
                border: '1px solid #E9ECEF',
                borderRadius: '8px',
              },
            }}
          />
        </Grid.Col>
      </Grid>

      {/* Summary Stats */}
      <Grid mt="lg" gutter="md">
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Box
            style={{
              padding: '16px',
              backgroundColor: '#FFF3CD',
              borderRadius: '8px',
              border: '1px solid #FFC107',
            }}
          >
            <Text size="sm" c="#856404" fw={500}>
              Pending Payments
            </Text>
            <Text size="xl" fw={700} c="#856404">
              {pagination.items || 0}
            </Text>
          </Box>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Box
            style={{
              padding: '16px',
              backgroundColor: '#D1ECF1',
              borderRadius: '8px',
              border: '1px solid #17A2B8',
            }}
          >
            <Text size="sm" c="#0C5460" fw={500}>
              Today's Collections
            </Text>
            <Text size="xl" fw={700} c="#0C5460">
              ₦245,000
            </Text>
          </Box>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Box
            style={{
              padding: '16px',
              backgroundColor: '#D4EDDA',
              borderRadius: '8px',
              border: '1px solid #28A745',
            }}
          >
            <Text size="sm" c="#155724" fw={500}>
              Completed Payments
            </Text>
            <Text size="xl" fw={700} c="#155724">
              28
            </Text>
          </Box>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Box
            style={{
              padding: '16px',
              backgroundColor: '#F8D7DA',
              borderRadius: '8px',
              border: '1px solid #DC3545',
            }}
          >
            <Text size="sm" c="#721C24" fw={500}>
              Outstanding Amount
            </Text>
            <Text size="xl" fw={700} c="#721C24">
              ₦125,500
            </Text>
          </Box>
        </Grid.Col>
      </Grid>

      {/* Pagination */}
      {pagination.items > 0 && (
        <Flex justify="flex-end" mt="lg">
          <Pagination
            itemsPerPage={pagination.itemsPerPage}
            handlePagination={pagination.handlePagination}
            totalItems={pagination.items}
          />
        </Flex>
      )}

      {/* Claims Modal */}
      {showClaimsModal && (
        <DownloadClaimsModal
          isOpen={showClaimsModal}
          setIsOpen={setShowClaimsModal}
          setOpenDownloadModal={setShowDownloadModal}
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          setInsuranceName={setInsuranceName}
          setDownloadClaims={setDownloadClaims}
        />
      )}

      {/* Download Claims Table Modal */}
      {showDownloadModal && (
        <ModalLayoutWrapper
          open={showDownloadModal}
          size="95%"
          title={
            <DownloadSpreedSheet
              title={'Claims Summary'}
              subText="Preview claims summary"
              isLoading={isDownloadingClaims}
              handleClose={() => setShowDownloadModal(false)}
              showDownload={(downloadClaimsData || [])?.length > 0}
              onDownloadClick={handleDownloadClaims}
            />
          }
        >
          <DownloadClaimsTable insuranceProviderName={insuranceName} />
        </ModalLayoutWrapper>
      )}
    </Box>
  );
};

export default CashierHeader;
