import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Text,
  Divider,
  Badge,
  ActionIcon,
  Button,
  Avatar,
  Grid,
  Collapse,
  Group,
  Menu,
  NumberInput,
  Modal,
  Alert,
  Checkbox,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconUser,
  IconCash,
  IconReceipt,
  IconCreditCard,
  IconWallet,
  IconCheck,
  IconX,
  IconDownload,
  IconPrinter,
  IconShield,
} from '@tabler/icons-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { appColors } from '@/theme/colors';
import {
  InvestigationsForLaboratoryQueueResponse,
  InvestigationResponseList,
} from '@/types/index';
import { ExtendedInvestigationResponseList } from '@/types/custom';
import { formatCurrency } from '@/utils/constants';
import { TableGrid } from '@/components/shared/GridTableLayout';
import { IconThreeDots } from '@/components/shared/IconComponents/IconThreeDots';
import ModalLayoutWrapper from '@/components/shared/ModalLayoutWrapper';
import IconCloseModal from '@/components/shared/IconComponents/IconCloseModal';
import FundWalletModal from './FundWalletModal';
import styled from '@emotion/styled';

export const MarkAsClearedButton = styled.button<{
  backgroundColor?: string;
  color?: string;
  withBorder?: boolean;
}>`
  background: ${(props) => props.backgroundColor || appColors.white};
  color: ${(props) => props.color || appColors.blue};
  border-radius: 8px;
  outline: 0;
  border: ${(props) =>
    props.withBorder ? `1px solid ${appColors.blue}` : 'none'};
  padding: 6px 16px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
  transition: ease-in-out 0.3s;
  &:hover {
    opacity: 0.7;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
interface CashierQueueBoxProps {
  patientId: number;
  value: InvestigationsForLaboratoryQueueResponse;
  refetch: () => void;
  sortby?: string;
}

// Payment status color mapping
const getPaymentStatusColor = (status: string) => {
  const statusColors: { [key: string]: { color: string; bg: string } } = {
    Unpaid: { color: '#DC3545', bg: '#F8D7DA' },
    'Partially Paid': { color: '#FD7E14', bg: '#FFE5CC' },
    Paid: { color: '#28A745', bg: '#D4EDDA' },
    Refunded: { color: '#6F42C1', bg: '#E2D9F3' },
    Cancelled: { color: '#6C757D', bg: '#F8F9FA' },
  };
  return statusColors[status] || { color: '#6C757D', bg: '#F8F9FA' };
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const CashierQueueBox: React.FC<CashierQueueBoxProps> = ({
  patientId,
  value,
  refetch,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [paymentModalOpened, setPaymentModalOpened] = useState(false);
  const [selectedInvestigation, setSelectedInvestigation] =
    useState<ExtendedInvestigationResponseList | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>('wallet');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInsurancePayment, setIsInsurancePayment] = useState(false);
  const [insuranceCoverage, setInsuranceCoverage] = useState<{
    patientPays: number;
    insuranceCovers: number;
    coveragePercentage: number;
    requiresPreAuth: boolean;
  }>({
    patientPays: 0,
    insuranceCovers: 0,
    coveragePercentage: 0,
    requiresPreAuth: false,
  });
  const [receiptModalOpened, setReceiptModalOpened] = useState(false);
  const [bulkPaymentModalOpened, setBulkPaymentModalOpened] = useState(false);
  const [bulkPaymentMethod, setBulkPaymentMethod] = useState<string>('cash');
  const [fundWalletModalOpened, setFundWalletModalOpened] = useState(false);
  const [localInvestigations, setLocalInvestigations] = useState<
    ExtendedInvestigationResponseList[]
  >(
    (value.investigationItems || []).map(
      (inv) => ({ ...inv }) as ExtendedInvestigationResponseList,
    ),
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const patientDetail = value.patientDetail;
  const investigations = localInvestigations;

  // Update local state when value changes
  useEffect(() => {
    setLocalInvestigations(
      (value.investigationItems || []).map(
        (inv) => ({ ...inv }) as ExtendedInvestigationResponseList,
      ),
    );
  }, [value.investigationItems]);

  // Show first 4 investigations in preview
  const previewInvestigations = investigations.slice(0, 4);
  const additionalCount = Math.max(0, investigations.length - 4);

  // Calculate totals
  const totalAmount = investigations.reduce(
    (sum, inv) => sum + (inv.amount?.amount || 0),
    0,
  );
  const unpaidAmount = investigations
    .filter((inv) => inv.paymentStatus === 'Unpaid')
    .reduce((sum, inv) => sum + (inv.amount?.amount || 0), 0);

  const partiallyPaidAmount = investigations
    .filter((inv) => inv.paymentStatus === 'Partially Paid')
    .reduce((sum, inv) => {
      const totalAmount = inv.amount?.amount || 0;
      const paidAmount = inv.partialAmount || 0;
      return sum + (totalAmount - paidAmount);
    }, 0);

  const totalOutstanding = unpaidAmount + partiallyPaidAmount;

  // Action handlers for payment processing
  const handleProcessPayment = (
    investigation: ExtendedInvestigationResponseList,
  ) => {
    setSelectedInvestigation(investigation);
    setPaymentAmount(investigation.amount?.amount || 0);
    setPaymentModalOpened(true);
  };

  // Calculate insurance coverage based on service type
  const calculateInsuranceCoverage = (
    investigation: ExtendedInvestigationResponseList,
  ) => {
    const totalAmount = investigation.amount?.amount || 0;
    const serviceName = investigation.investigationName?.toLowerCase() || '';
    const serviceCategory =
      investigation.investigationCategory?.toLowerCase() || '';

    // Check service type and apply appropriate coverage
    if (
      serviceName.includes('paracetamol') ||
      serviceName.includes('prescription') ||
      serviceCategory.includes('pharmacy') ||
      serviceCategory.includes('drug')
    ) {
      // Prescription drugs: 10% patient pays, 90% insurance covers
      const patientPays = totalAmount * 0.1;
      const insuranceCovers = totalAmount * 0.9;
      return {
        patientPays,
        insuranceCovers,
        coveragePercentage: 90,
        requiresPreAuth: false,
      };
    } else if (
      serviceName.includes('x-ray') ||
      serviceName.includes('ct scan') ||
      serviceName.includes('mri') ||
      serviceName.includes('scan') ||
      serviceCategory.includes('radiology') ||
      serviceCategory.includes('imaging')
    ) {
      // Scans: 50% patient pays, 50% insurance covers
      const patientPays = totalAmount * 0.5;
      const insuranceCovers = totalAmount * 0.5;
      return {
        patientPays,
        insuranceCovers,
        coveragePercentage: 50,
        requiresPreAuth: false,
      };
    } else {
      // Laboratory tests and consultations: 100% insurance covers - requires pre-auth
      const patientPays = 0;
      const insuranceCovers = totalAmount;
      return {
        patientPays,
        insuranceCovers,
        coveragePercentage: 100,
        requiresPreAuth: true,
      };
    }
  };

  // Handle payment method change
  const handlePaymentMethodChange = (value: string | null) => {
    if (!value) return;

    setPaymentMethod(value);
    const isInsurance = value === 'insurance';
    setIsInsurancePayment(isInsurance);

    if (selectedInvestigation && isInsurance) {
      const coverage = calculateInsuranceCoverage(selectedInvestigation);
      setInsuranceCoverage(coverage);
      setRequiresPreAuth(coverage.requiresPreAuth);
      setPaymentAmount(coverage.patientPays);
    } else if (selectedInvestigation) {
      const fullAmount = selectedInvestigation.amount?.amount || 0;
      const alreadyPaid = selectedInvestigation.partialAmount || 0;
      setPaymentAmount(fullAmount - alreadyPaid);
      setRequiresPreAuth(false);
    }
  };

  const [isPartialPayment, setIsPartialPayment] = useState(false);
  const [partialPaymentAmount, setPartialPaymentAmount] = useState<number>(0);
  const [preAuthNumber, setPreAuthNumber] = useState<string>('');
  const [requiresPreAuth, setRequiresPreAuth] = useState(false);
  const [refundModalOpened, setRefundModalOpened] = useState(false);
  const [refundAmount, setRefundAmount] = useState<number>(0);
  const [refundReason, setRefundReason] = useState<string>('');
  const [isProcessingRefund, setIsProcessingRefund] = useState(false);

  const handleViewReceipt = (
    investigation: ExtendedInvestigationResponseList,
  ) => {
    setSelectedInvestigation(investigation);
    setReceiptModalOpened(true);
  };

  const handleRefund = (investigation: ExtendedInvestigationResponseList) => {
    console.log('Process refund for:', investigation.investigationName);
    setSelectedInvestigation(investigation);

    // Set the full paid amount as default refund amount
    const paidAmount = investigation.amount?.amount || 0;
    setRefundAmount(paidAmount);
    setRefundReason('');
    setRefundModalOpened(true);
  };

  const handleCloseRefundModal = () => {
    setRefundModalOpened(false);
    setSelectedInvestigation(null);
    setRefundAmount(0);
    setRefundReason('');
  };

  const handleConfirmRefund = async () => {
    if (!selectedInvestigation) return;

    if (!refundReason.trim()) {
      alert('Please provide a reason for the refund.');
      return;
    }

    if (refundAmount <= 0) {
      alert('Please enter a valid refund amount.');
      return;
    }

    const maxRefund = selectedInvestigation.amount?.amount || 0;
    if (refundAmount > maxRefund) {
      alert(
        `Refund amount cannot exceed the paid amount of ${formatCurrency(maxRefund)}.`,
      );
      return;
    }

    setIsProcessingRefund(true);
    try {
      console.log('Processing refund:', {
        investigation: selectedInvestigation.investigationName,
        refundAmount,
        reason: refundReason,
        patientId: patientDetail?.patientId,
      });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update investigation status to refunded or adjust payment status
      const isFullRefund =
        refundAmount >= (selectedInvestigation.amount?.amount || 0);
      const newPaymentStatus = isFullRefund ? 'Refunded' : 'Partially Refunded';

      const updatedInvestigations = localInvestigations.map((inv) =>
        inv.investigationRequestId ===
        selectedInvestigation.investigationRequestId
          ? {
              ...inv,
              paymentStatus: newPaymentStatus,
              refundAmount: refundAmount,
              refundReason: refundReason,
              refundDate: new Date().toISOString(),
            }
          : inv,
      );

      setLocalInvestigations(updatedInvestigations);
      handleCloseRefundModal();
      refetch();

      alert(
        `✅ Refund processed successfully!\n\nAmount: ${formatCurrency(refundAmount)}\nReason: ${refundReason}\nStatus: ${newPaymentStatus}`,
      );
    } catch (error) {
      console.error('Error processing refund:', error);
      alert('❌ Error processing refund. Please try again.');
    } finally {
      setIsProcessingRefund(false);
    }
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpened(false);
    setSelectedInvestigation(null);
    setPaymentAmount(0);
    setPaymentMethod('wallet');
    setIsPartialPayment(false);
    setPartialPaymentAmount(0);
    setIsInsurancePayment(false);
    setPreAuthNumber('');
    setRequiresPreAuth(false);
    setInsuranceCoverage({
      patientPays: 0,
      insuranceCovers: 0,
      coveragePercentage: 0,
      requiresPreAuth: false,
    });
  };

  const handleCloseReceiptModal = () => {
    setReceiptModalOpened(false);
    setSelectedInvestigation(null);
  };

  const handleConfirmPayment = async () => {
    if (!selectedInvestigation) return;

    // Validate pre-authorization if required
    if (isInsurancePayment && requiresPreAuth && !preAuthNumber.trim()) {
      alert('Please enter the pre-authorization number for this service.');
      return;
    }

    setIsProcessing(true);
    try {
      const fullAmount = selectedInvestigation.amount?.amount || 0;
      const alreadyPaid = selectedInvestigation.partialAmount || 0;

      let currentPayment = paymentAmount;
      let totalPaid = alreadyPaid + currentPayment;
      let paymentType = 'Patient';
      let claimData = null;

      // Handle insurance payments
      if (isInsurancePayment) {
        const coverage = calculateInsuranceCoverage(selectedInvestigation);

        if (coverage.requiresPreAuth && coverage.patientPays === 0) {
          // 100% covered with pre-auth - auto-settle insurance portion
          currentPayment = 0; // Patient pays nothing
          totalPaid = fullAmount; // Full amount covered by insurance
          paymentType = 'Insurance';
          claimData = {
            preAuthNumber: preAuthNumber.trim(),
            insuranceCovers: coverage.insuranceCovers,
            coveragePercentage: coverage.coveragePercentage,
            patientPays: 0,
          };
        } else if (!isPartialPayment) {
          // Split payment - auto-settle remaining balance after patient payment
          totalPaid = fullAmount; // Always complete the payment
          claimData = {
            preAuthNumber: preAuthNumber.trim() || null,
            insuranceCovers: coverage.insuranceCovers,
            coveragePercentage: coverage.coveragePercentage,
            patientPays: coverage.patientPays,
          };
        }
      }

      console.log('Processing payment:', {
        investigation: selectedInvestigation.investigationName,
        fullAmount,
        alreadyPaid,
        currentPayment,
        totalPaid,
        isPartial: isPartialPayment,
        method: paymentMethod,
        paymentType,
        claimData,
        preAuthNumber: preAuthNumber.trim() || null,
      });

      // Determine payment status
      const isFullyPaid = totalPaid >= fullAmount;
      const newPaymentStatus = isFullyPaid ? 'Paid' : 'Partially Paid';

      // Update investigation payment status in local state
      const updatedInvestigations = investigations.map((inv) =>
        inv.investigationRequestId ===
        selectedInvestigation.investigationRequestId
          ? {
              ...inv,
              paymentStatus: newPaymentStatus,
              partialAmount: isFullyPaid ? undefined : totalPaid,
            }
          : inv,
      );

      setLocalInvestigations(updatedInvestigations);
      handleClosePaymentModal();
      refetch();

      // Show appropriate success message
      if (isInsurancePayment) {
        if (requiresPreAuth && insuranceCoverage.patientPays === 0) {
          alert(
            `🛡️ Insurance claim processed successfully!\nPre-Auth: ${preAuthNumber}\nAmount: ${formatCurrency(fullAmount)} (100% covered)`,
          );
        } else {
          alert(
            `🛡️ Payment processed successfully!\nPatient paid: ${formatCurrency(insuranceCoverage.patientPays)}\nInsurance covers: ${formatCurrency(insuranceCoverage.insuranceCovers)}\nClaim submitted for processing.`,
          );
        }
      } else if (isPartialPayment) {
        alert(
          `Partial payment of ${formatCurrency(currentPayment)} processed successfully! Remaining balance: ${formatCurrency(fullAmount - totalPaid)}`,
        );
      } else {
        alert('Full payment processed successfully!');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkPayment = () => {
    setBulkPaymentModalOpened(true);
  };

  const handleCloseBulkPaymentModal = () => {
    setBulkPaymentModalOpened(false);
    setBulkPaymentMethod('cash');
  };

  const handleConfirmBulkPayment = async () => {
    setIsProcessing(true);
    try {
      console.log('Processing bulk payment for patient:', patientId);

      // Get all unpaid and partially paid investigations
      const unpaidInvestigations = investigations.filter(
        (inv) => inv.paymentStatus === 'Unpaid',
      );
      const partiallyPaidInvestigations = investigations.filter(
        (inv) => inv.paymentStatus === 'Partially Paid',
      );

      console.log('Bulk payment details:', {
        patientId,
        totalAmount: totalOutstanding,
        method: bulkPaymentMethod,
        unpaidInvestigations: unpaidInvestigations.map((inv) => ({
          id: inv.investigationRequestId,
          name: inv.investigationName,
          amount: inv.amount?.amount,
        })),
        partiallyPaidInvestigations: partiallyPaidInvestigations.map((inv) => ({
          id: inv.investigationRequestId,
          name: inv.investigationName,
          totalAmount: inv.amount?.amount,
          paidAmount: inv.partialAmount,
          remainingAmount: (inv.amount?.amount || 0) - (inv.partialAmount || 0),
        })),
      });

      // Update all unpaid and partially paid investigations to paid status
      const updatedInvestigations = investigations.map((inv) => {
        if (
          inv.paymentStatus === 'Unpaid' ||
          inv.paymentStatus === 'Partially Paid'
        ) {
          return {
            ...inv,
            paymentStatus: 'Paid',
            partialAmount: undefined, // Clear partial amount when fully paid
          };
        }
        return inv;
      });

      setLocalInvestigations(updatedInvestigations);
      handleCloseBulkPaymentModal();
      refetch();

      alert(
        `Bulk payment of ${formatCurrency(totalOutstanding)} processed successfully!`,
      );
    } catch (error) {
      console.error('Error processing bulk payment:', error);
      alert('Error processing bulk payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleViewInvoice = (
    investigation: ExtendedInvestigationResponseList,
  ) => {
    console.log('View invoice for:', investigation.investigationName);
    // Use existing receipt modal to show invoice/receipt
    setSelectedInvestigation(investigation);
    setReceiptModalOpened(true);
  };

  const handleDownloadTransactionReceipt = (
    investigation: ExtendedInvestigationResponseList,
  ) => {
    console.log(
      'Download transaction receipt for:',
      investigation.investigationName,
    );
    // Set the investigation and trigger the existing download functionality
    setSelectedInvestigation(investigation);
    setReceiptModalOpened(true);

    // Trigger download after modal is set up (small delay to ensure modal renders)
    setTimeout(() => {
      handleDownloadReceipt();
    }, 100);
  };

  // Print receipt functionality
  const handlePrintReceipt = () => {
    if (receiptRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const receiptContent = receiptRef.current.innerHTML;
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Payment Receipt</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
                  color: #333;
                }
                .receipt-container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ddd;
                  border-radius: 8px;
                }
                .header {
                  text-align: center;
                  margin-bottom: 20px;
                  border-bottom: 2px solid #007bff;
                  padding-bottom: 10px;
                }
                .info-section {
                  margin: 15px 0;
                }
                .flex {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin: 8px 0;
                }
                .badge {
                  padding: 4px 8px;
                  border-radius: 4px;
                  font-size: 12px;
                  font-weight: 500;
                }
                .badge-paid {
                  background-color: #d4edda;
                  color: #155724;
                }
                .badge-partial {
                  background-color: #ffe5cc;
                  color: #fd7e14;
                }
                hr {
                  border: none;
                  border-top: 1px solid #ddd;
                  margin: 15px 0;
                }
                .footer {
                  text-align: right;
                  margin-top: 20px;
                  font-size: 12px;
                  color: #666;
                }
                @media print {
                  body { margin: 0; }
                  .receipt-container { border: none; box-shadow: none; }
                }
              </style>
            </head>
            <body>
              <div class="receipt-container">
                ${receiptContent}
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  // Download receipt as PDF functionality
  const handleDownloadReceipt = async () => {
    if (!receiptRef.current || !selectedInvestigation) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: receiptRef.current.scrollWidth,
        height: receiptRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 190;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `receipt_${selectedInvestigation?.investigationName?.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Box
      style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '16px',
        marginBottom: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {/* Patient Header */}
      <Grid
        mb="md"
        gutter="md"
        align="flex-start"
        style={{ overflow: 'hidden' }}
      >
        {/* Patient Info */}
        <Grid.Col
          span={{ base: 12, sm: 6, md: 4, lg: 3 }}
          style={{
            borderRight: '1px solid #E9ECEF',
            paddingRight: '16px',
          }}
        >
          <Flex align="flex-start" gap="md">
            {patientDetail?.patientImageUrl ? (
              <Avatar
                src={patientDetail.patientImageUrl}
                size="md"
                radius="md"
              />
            ) : (
              <Avatar size="md" radius="xl" bg={appColors.ghostWhite}>
                <IconUser size={20} color={appColors.blue} />
              </Avatar>
            )}

            <Box style={{ flex: 1 }}>
              <Group gap={10} mb={5}>
                <Text fz={18} w="fit-content" c={appColors.black}>
                  {patientDetail?.patientDisplayName}
                </Text>
                {patientDetail?.insuranceInfo && (
                  <Group gap={10}>
                    <Divider orientation="vertical" size="sm" />
                    <Badge
                      fz="12px"
                      c="white"
                      style={{ textTransform: 'capitalize' }}
                      fw={500}
                    >
                      Insurance:{' '}
                      {patientDetail?.insuranceInfo?.insuranceProvider}
                    </Badge>
                  </Group>
                )}
              </Group>
              <Flex align="center" gap="xs" wrap="wrap">
                <Text size="sm" c={appColors.lowerText} fw={500}>
                  {patientDetail?.patientCode}
                </Text>
                <Divider orientation="vertical" size="sm" />
                <Text size="sm" c={appColors.lowerText} fw={500}>
                  {patientDetail?.age}
                </Text>
                <Divider orientation="vertical" size="sm" />
                <Text size="sm" c={appColors.lowerText} fw={500}>
                  {patientDetail?.gender}
                </Text>
              </Flex>
              <Flex align="center" gap="xs" mt="xs">
                {/* Wallet Balance */}
                <Flex align="center" gap="xs">
                  <IconWallet size={16} color={appColors.blue} />
                  <Text size="sm" fw={500} c={appColors.blue}>
                    Wallet: {formatCurrency(patientDetail?.walletBalance || 0)}
                  </Text>
                </Flex>
                <MarkAsClearedButton
                  data-cy="fund-wallet-button"
                  style={{
                    padding: '2px 5px',
                    border: `1px solid ${appColors.blue}`,
                    borderRadius: '4px',
                    lineHeight: '14px',
                  }}
                  onClick={() => setFundWalletModalOpened(true)}
                >
                  Fund wallet
                </MarkAsClearedButton>
              </Flex>
            </Box>
          </Flex>
        </Grid.Col>

        {/* Payment Summary */}
        <Grid.Col
          span={{ base: 12, sm: 6, md: 3, lg: 2 }}
          style={{
            borderRight: '1px solid #E9ECEF',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <Box>
            <Text size="sm" c={appColors.subText} mb="xs">
              Payment Summary
            </Text>
            <Flex direction="column" gap="xs">
              <Flex justify="space-between">
                <Text size="sm">Total Amount:</Text>
                <Text size="sm" fw={600}>
                  {formatCurrency(totalAmount)}
                </Text>
              </Flex>
              <Flex justify="space-between">
                <Text size="sm" c="red">
                  Outstanding:
                </Text>
                <Text size="sm" fw={600} c="red">
                  {formatCurrency(totalOutstanding)}
                </Text>
              </Flex>
              {partiallyPaidAmount > 0 && (
                <Flex justify="space-between">
                  <Text size="sm" c="orange">
                    Partial Balances:
                  </Text>
                  <Text size="sm" fw={600} c="orange">
                    {formatCurrency(partiallyPaidAmount)}
                  </Text>
                </Flex>
              )}
              <Flex justify="space-between">
                <Text size="sm" c="green">
                  Paid:
                </Text>
                <Text size="sm" fw={600} c="green">
                  {formatCurrency(totalAmount - totalOutstanding)}
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Grid.Col>

        {/* Investigation Preview */}
        <Grid.Col
          span={{ base: 12, sm: 12, md: 4, lg: 5 }}
          style={{
            borderRight: '1px solid #E9ECEF',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <Grid columns={2} gutter="xs">
            {previewInvestigations.map((investigation, index) => (
              <Grid.Col
                span={1}
                key={investigation.investigationRequestId || index}
              >
                <Box
                  style={{
                    padding: '8px',
                    backgroundColor: '#F8F9FA',
                    borderRadius: '6px',
                    border: '1px solid #E9ECEF',
                  }}
                >
                  <Text size="xs" w={500} mb="xs" style={{ lineHeight: 1.2 }}>
                    {investigation.investigationName}
                  </Text>
                  <Flex align="center" justify="space-between">
                    <Badge
                      size="xs"
                      style={{
                        backgroundColor: getPaymentStatusColor(
                          investigation.paymentStatus || 'Unpaid',
                        ).bg,
                        color: getPaymentStatusColor(
                          investigation.paymentStatus || 'Unpaid',
                        ).color,
                        fontSize: '9px',
                      }}
                    >
                      {investigation.paymentStatus || 'Unpaid'}
                    </Badge>
                    <Box style={{ textAlign: 'right' }}>
                      <Text size="xs" fw={600}>
                        {investigation.amount
                          ? `₦${investigation.amount.amount.toLocaleString()}`
                          : '-'}
                      </Text>
                      {investigation.paymentStatus === 'Partially Paid' &&
                        investigation.partialAmount && (
                          <Text
                            size="xs"
                            c="orange"
                            style={{ fontSize: '8px' }}
                          >
                            Remaining:{' '}
                            {formatCurrency(
                              (investigation?.amount?.amount || 0) -
                                (investigation?.partialAmount || 0),
                            )}
                          </Text>
                        )}
                    </Box>
                  </Flex>
                </Box>
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>

        {/* Actions */}
        <Grid.Col
          span={{ base: 12, sm: 12, md: 2, lg: 2 }}
          style={{
            paddingLeft: '16px',
          }}
        >
          <Flex
            direction="column"
            gap="xs"
            align={{ base: 'center', md: 'flex-end' }}
          >
            <Button
              size="xs"
              leftSection={<IconCash size={14} />}
              onClick={handleBulkPayment}
              disabled={totalOutstanding === 0}
            >
              Pay All Outstanding
            </Button>
            <ActionIcon
              onClick={() => setExpanded(!expanded)}
              size="lg"
              variant="subtle"
            >
              {expanded ? (
                <IconChevronUp size={16} />
              ) : (
                <IconChevronDown size={16} />
              )}
            </ActionIcon>
          </Flex>
        </Grid.Col>
      </Grid>

      {/* Additional Items Indicator */}
      {additionalCount > 0 && (
        <Box
          style={{
            textAlign: 'center',
            padding: '8px',
            backgroundColor: '#FFF3CD',
            borderRadius: '6px',
            marginBottom: '12px',
          }}
        >
          <Text size="sm" color="#856404" w={500}>
            +{additionalCount} more investigation
            {additionalCount > 1 ? 's' : ''}
          </Text>
        </Box>
      )}

      {/* Additional Items Indicator */}
      {additionalCount > 0 && (
        <Box
          style={{
            textAlign: 'center',
            padding: '8px',
            backgroundColor: '#FFF3CD',
            borderRadius: '6px',
            marginBottom: '12px',
          }}
        >
          <Text size="sm" color="#856404" w={500}>
            +{additionalCount} more investigation
            {additionalCount > 1 ? 's' : ''}
          </Text>
        </Box>
      )}

      {/* Expanded Payment Table */}
      <Collapse in={expanded}>
        <Divider my="md" />
        <Text size="md" w={600} mb="md">
          Payment Details
        </Text>

        <TableGrid
          columns={[
            {
              label: 'Service Item',
              span: 3,
              render: (investigation: ExtendedInvestigationResponseList) => (
                <Box>
                  <Text size="sm" w={500}>
                    {investigation.investigationName}
                  </Text>
                  <Text size="xs" c={appColors.subText}>
                    {investigation.investigationCategory}
                  </Text>
                </Box>
              ),
            },
            {
              label: 'Amount',
              span: 2,
              render: (investigation: ExtendedInvestigationResponseList) => (
                <Text size="sm" w={600}>
                  {investigation.amount
                    ? `₦${investigation.amount.amount.toLocaleString()}`
                    : '-'}
                </Text>
              ),
            },
            {
              label: 'Payment Status',
              span: 2,
              render: (investigation: ExtendedInvestigationResponseList) => (
                <Box>
                  <Badge
                    size="sm"
                    style={{
                      backgroundColor: getPaymentStatusColor(
                        investigation.paymentStatus || 'Unpaid',
                      ).bg,
                      color: getPaymentStatusColor(
                        investigation.paymentStatus || 'Unpaid',
                      ).color,
                    }}
                  >
                    {investigation.paymentStatus || 'Unpaid'}
                  </Badge>
                  {investigation.paymentStatus === 'Partially Paid' &&
                    investigation.partialAmount && (
                      <Text size="xs" c="orange" mt={2}>
                        Paid: {formatCurrency(investigation.partialAmount)} |
                        Remaining:{' '}
                        {investigation.amount
                          ? formatCurrency(
                              investigation.amount.amount -
                                investigation.partialAmount,
                            )
                          : '-'}
                      </Text>
                    )}
                </Box>
              ),
            },
            {
              label: 'Date',
              span: 2,
              render: (investigation: ExtendedInvestigationResponseList) => (
                <Text size="sm">
                  {investigation.dateCreatedOrLastModified &&
                    formatDate(investigation.dateCreatedOrLastModified)}
                </Text>
              ),
            },
            {
              label: 'Actions',
              span: 2,
              render: (investigation: ExtendedInvestigationResponseList) => (
                <Group gap="xs">
                  {investigation.paymentStatus === 'Unpaid' && (
                    <Button
                      size="xs"
                      leftSection={<IconCash size={12} />}
                      onClick={() => handleProcessPayment(investigation)}
                    >
                      Pay
                    </Button>
                  )}
                  {investigation.paymentStatus === 'Partially Paid' && (
                    <Button
                      size="xs"
                      color="orange"
                      leftSection={<IconCash size={12} />}
                      onClick={() => handleProcessPayment(investigation)}
                    >
                      Complete Payment
                    </Button>
                  )}
                  {investigation.paymentStatus === 'Paid' && (
                    <Button
                      size="xs"
                      variant="light"
                      leftSection={<IconReceipt size={12} />}
                      onClick={() => handleViewReceipt(investigation)}
                    >
                      Receipt
                    </Button>
                  )}
                </Group>
              ),
            },
            {
              label: '',
              span: 1,
              render: (investigation: ExtendedInvestigationResponseList) => (
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="gray">
                      <IconThreeDots size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<IconReceipt size={14} />}
                      onClick={() => handleViewInvoice(investigation)}
                    >
                      View Invoice
                    </Menu.Item>
                    {investigation.paymentStatus === 'Paid' && (
                      <Menu.Item
                        leftSection={<IconReceipt size={14} />}
                        onClick={() =>
                          handleDownloadTransactionReceipt(investigation)
                        }
                      >
                        Download Receipt
                      </Menu.Item>
                    )}
                    {investigation.paymentStatus === 'Paid' && (
                      <Menu.Item
                        leftSection={<IconX size={14} />}
                        color="red"
                        onClick={() => handleRefund(investigation)}
                      >
                        Process Refund
                      </Menu.Item>
                    )}
                  </Menu.Dropdown>
                </Menu>
              ),
            },
          ]}
          data={investigations}
          rowKey="investigationRequestId"
        />
      </Collapse>

      {/* Payment Modal */}
      <ModalLayoutWrapper
        open={paymentModalOpened}
        title={
          <Flex justify="space-between" align="center">
            <Box>
              <Text fw={600}>Process Payment</Text>
              <Text c="dimmed" size="sm">
                {selectedInvestigation?.investigationName} •{' '}
                {patientDetail?.patientDisplayName}
              </Text>
            </Box>
            <IconCloseModal handleClose={handleClosePaymentModal} />
          </Flex>
        }
        size="50"
        footer={
          <Group justify="flex-end" mt="sm">
            <Button
              variant="light"
              onClick={handleClosePaymentModal}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              loading={isProcessing}
              onClick={handleConfirmPayment}
              disabled={
                isInsurancePayment && requiresPreAuth && !preAuthNumber.trim()
              }
              leftSection={<IconCheck size={16} />}
              color={
                isInsurancePayment
                  ? 'green'
                  : isPartialPayment
                    ? 'orange'
                    : 'blue'
              }
            >
              {isInsurancePayment
                ? requiresPreAuth && insuranceCoverage.patientPays === 0
                  ? 'Process with Pre-Auth'
                  : 'Save to Claim'
                : isPartialPayment
                  ? 'Confirm Partial Payment'
                  : 'Confirm Full Payment'}
            </Button>
          </Group>
        }
      >
        <Box p="sm">
          <Alert mb="md" color="blue">
            <Text size="sm">
              Processing payment for{' '}
              <strong>{selectedInvestigation?.investigationName}</strong>
            </Text>
          </Alert>

          {/* Investigation Details */}
          <Box
            style={{
              background: '#F8F9FA',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
            }}
          >
            <Flex justify="space-between" mb="xs">
              <Text size="sm">Total Amount:</Text>
              <Text size="sm" fw={600}>
                {selectedInvestigation?.amount
                  ? formatCurrency(selectedInvestigation.amount.amount)
                  : '-'}
              </Text>
            </Flex>

            {selectedInvestigation?.paymentStatus === 'Partially Paid' && (
              <>
                <Flex justify="space-between" mb="xs">
                  <Text size="sm">Already Paid:</Text>
                  <Text size="sm" fw={600} c="green">
                    {selectedInvestigation?.partialAmount
                      ? formatCurrency(selectedInvestigation.partialAmount)
                      : '-'}
                  </Text>
                </Flex>
                <Flex justify="space-between" mb="xs">
                  <Text size="sm" c="orange">
                    Outstanding Balance:
                  </Text>
                  <Text size="sm" fw={600} c="orange">
                    {selectedInvestigation?.amount &&
                    selectedInvestigation?.partialAmount
                      ? formatCurrency(
                          selectedInvestigation.amount.amount -
                            selectedInvestigation.partialAmount,
                        )
                      : '-'}
                  </Text>
                </Flex>
              </>
            )}
          </Box>
          <Box>
            <Text size="sm" mb="xs">
              Payment Method
            </Text>
            <Select
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              data={[
                { value: 'wallet', label: '💳 Wallet' },
                { value: 'insurance', label: '🛡️ Pay via Insurance' },
              ]}
              placeholder="Select payment method"
              styles={{
                input: {
                  height: '45px',
                  fontSize: '14px',
                },
              }}
            />
          </Box>

          {/* Insurance Coverage Information */}
          {isInsurancePayment && selectedInvestigation && (
            <Box
              style={{
                background: 'white',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #4CAF50',
              }}
              mt={14}
            >
              <Text size="sm" fw={600} c="green" mb="xs">
                🛡️ Insurance Coverage Breakdown
              </Text>
              <Flex justify="space-between" mb="xs">
                <Text size="sm" fw={500}>
                  Insurance Covers ({insuranceCoverage.coveragePercentage}%):
                </Text>
                <Text size="sm" fw={600} c="black">
                  {formatCurrency(insuranceCoverage.insuranceCovers)}
                </Text>
              </Flex>
              <Flex justify="space-between">
                <Text size="sm" fw={500}>
                  You Pay ({100 - insuranceCoverage.coveragePercentage}%):
                </Text>
                <Text
                  size="sm"
                  fw={600}
                  c={insuranceCoverage.patientPays > 0 ? 'orange' : 'green'}
                >
                  {formatCurrency(insuranceCoverage.patientPays)}
                </Text>
              </Flex>
              {insuranceCoverage.patientPays === 0 && (
                <Text
                  size="xs"
                  c="black"
                  mt="xs"
                  fw={500}
                  style={{ fontStyle: 'italic' }}
                >
                  ✅ Fully covered by insurance - No payment required!
                </Text>
              )}
            </Box>
          )}

          {/* Pre-Authorization Field */}
          {isInsurancePayment && requiresPreAuth && (
            <Box mt="md">
              <TextInput
                label="Pre-Authorization Number"
                placeholder="Enter pre-auth number from insurance provider"
                value={preAuthNumber}
                onChange={(event) =>
                  setPreAuthNumber(event.currentTarget.value)
                }
                required
                description="Required for 100% covered services"
                styles={{
                  label: { fontWeight: 500, color: '#0B0C7D' },
                  input: {
                    borderColor: preAuthNumber ? '#4CAF50' : '#E6E8EB',
                    '&:focus': { borderColor: '#0B0C7D' },
                  },
                }}
                rightSection={
                  preAuthNumber && <IconCheck size={16} color="#4CAF50" />
                }
              />
            </Box>
          )}

          {/* Payment Options */}
          <Box mb="md" mt={14}>
            <Flex align="center" mb="md">
              <Checkbox
                checked={isPartialPayment}
                onChange={(event) => {
                  setIsPartialPayment(event.currentTarget.checked);
                  if (event.currentTarget.checked) {
                    const fullAmount =
                      selectedInvestigation?.amount?.amount || 0;
                    const alreadyPaid =
                      selectedInvestigation?.partialAmount || 0;
                    const remaining = fullAmount - alreadyPaid;
                    setPartialPaymentAmount(Math.floor(remaining / 2)); // Default to half of remaining
                    setPaymentAmount(Math.floor(remaining / 2));
                  } else {
                    const fullAmount =
                      selectedInvestigation?.amount?.amount || 0;
                    const alreadyPaid =
                      selectedInvestigation?.partialAmount || 0;
                    setPaymentAmount(fullAmount - alreadyPaid);
                  }
                }}
              />
              <Text ml="sm" fw={500}>
                Make partial payment
              </Text>
            </Flex>

            <NumberInput
              label={
                isPartialPayment ? 'Partial Payment Amount' : 'Payment Amount'
              }
              description={
                isPartialPayment
                  ? 'Enter the amount you wish to pay now'
                  : undefined
              }
              value={paymentAmount}
              onChange={(value) => setPaymentAmount(Number(value) || 0)}
              min={0}
              max={
                selectedInvestigation
                  ? isInsurancePayment
                    ? insuranceCoverage.patientPays
                    : (selectedInvestigation.amount?.amount || 0) -
                      (selectedInvestigation.partialAmount || 0)
                  : 0
              }
              disabled={
                isInsurancePayment && insuranceCoverage.patientPays === 0
              }
              prefix="₦"
              thousandSeparator=","
              required
              styles={{
                input: {
                  fontSize: '1rem',
                  height: '50px',
                  borderColor: isPartialPayment ? '#FD7E14' : undefined,
                },
              }}
            />
          </Box>
        </Box>
      </ModalLayoutWrapper>

      {/* Bulk Payment Modal */}
      <ModalLayoutWrapper
        open={bulkPaymentModalOpened}
        title={
          <Flex justify="space-between" align="center">
            <Box>
              <Text fw={600}>Bulk Payment Processing</Text>
              <Text c="dimmed" size="sm">
                Pay all outstanding investigations for{' '}
                {patientDetail?.patientDisplayName}
              </Text>
            </Box>
            <IconCloseModal handleClose={handleCloseBulkPaymentModal} />
          </Flex>
        }
        size="50"
        footer={
          <Group justify="flex-end" mt="sm">
            <Button
              variant="light"
              onClick={handleCloseBulkPaymentModal}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              loading={isProcessing}
              onClick={handleConfirmBulkPayment}
              leftSection={<IconCheck size={16} />}
            >
              Process Bulk Payment
            </Button>
          </Group>
        }
      >
        <Box p="sm">
          <Alert mb="md" color="blue">
            <Text size="sm">
              You are about to process payment for{' '}
              {
                investigations.filter(
                  (inv) =>
                    inv.paymentStatus === 'Unpaid' ||
                    inv.paymentStatus === 'Partially Paid',
                ).length
              }{' '}
              outstanding investigations (
              {
                investigations.filter((inv) => inv.paymentStatus === 'Unpaid')
                  .length
              }{' '}
              unpaid,{' '}
              {
                investigations.filter(
                  (inv) => inv.paymentStatus === 'Partially Paid',
                ).length
              }{' '}
              partially paid)
            </Text>
          </Alert>

          {/* Summary of items to be paid */}
          <Box mb="lg">
            <Text size="sm" fw={600} mb="xs">
              Items to be paid:
            </Text>
            <Box
              style={{
                maxHeight: '200px',
                overflowY: 'auto',
                border: '1px solid #E9ECEF',
                borderRadius: '8px',
                padding: '12px',
                backgroundColor: '#F8F9FA',
              }}
            >
              {investigations
                .filter(
                  (inv) =>
                    inv.paymentStatus === 'Unpaid' ||
                    inv.paymentStatus === 'Partially Paid',
                )
                .map((inv) => {
                  const isPartiallyPaid =
                    inv.paymentStatus === 'Partially Paid';
                  const fullAmount = inv.amount?.amount || 0;
                  const paidAmount = inv.partialAmount || 0;
                  const remainingAmount = isPartiallyPaid
                    ? fullAmount - paidAmount
                    : fullAmount;

                  return (
                    <Flex
                      key={inv.investigationRequestId}
                      justify="space-between"
                      align="center"
                      mb="xs"
                    >
                      <Box style={{ flex: 1 }}>
                        <Text size="sm">{inv.investigationName}</Text>
                        {isPartiallyPaid && (
                          <Text size="xs" c="orange">
                            Paid: {formatCurrency(paidAmount)} | Remaining:{' '}
                            {formatCurrency(remainingAmount)}
                          </Text>
                        )}
                      </Box>
                      <Text
                        size="sm"
                        fw={600}
                        c={isPartiallyPaid ? 'orange' : 'inherit'}
                      >
                        {formatCurrency(remainingAmount)}
                      </Text>
                    </Flex>
                  );
                })}
              <Divider my="xs" />
              <Flex justify="space-between" align="center">
                <Text size="md" fw={700}>
                  Total Amount:
                </Text>
                <Text size="md" fw={700} c="blue">
                  {formatCurrency(totalOutstanding)}
                </Text>
              </Flex>
            </Box>
          </Box>

          {/* <Grid>
            <Grid.Col span={12}>
              <Text size="sm" mb="xs">
                Payment Method
              </Text>
              <Group>
                <Button
                  variant={bulkPaymentMethod === 'cash' ? 'filled' : 'light'}
                  size="sm"
                  leftSection={<IconCash size={14} />}
                  onClick={() => setBulkPaymentMethod('cash')}
                >
                  Cash
                </Button>
                <Button
                  variant={bulkPaymentMethod === 'card' ? 'filled' : 'light'}
                  size="sm"
                  leftSection={<IconCreditCard size={14} />}
                  onClick={() => setBulkPaymentMethod('card')}
                >
                  Card
                </Button>
                <Button
                  variant={
                    bulkPaymentMethod === 'transfer' ? 'filled' : 'light'
                  }
                  size="sm"
                  leftSection={<IconWallet size={14} />}
                  onClick={() => setBulkPaymentMethod('transfer')}
                >
                  Bank Transfer
                </Button>
              </Group>
            </Grid.Col>
          </Grid> */}
        </Box>
      </ModalLayoutWrapper>

      {/* Fund Wallet Modal */}
      <FundWalletModal
        open={fundWalletModalOpened}
        onClose={() => setFundWalletModalOpened(false)}
        patientInfo={{
          patientId: patientDetail?.patientId,
          patientCode: patientDetail?.patientCode || '',
          patientDisplayName: patientDetail?.patientDisplayName || '',
          age: patientDetail?.age || '',
          gender: patientDetail?.gender || '',
          walletBalance: patientDetail?.walletBalance || 0,
        }}
        onSuccess={(amount, method) => {
          // Update the local wallet balance
          if (patientDetail) {
            const updatedWalletBalance =
              (patientDetail.walletBalance || 0) + amount;
            patientDetail.walletBalance = updatedWalletBalance;
            // In a real application, you would also call an API to update the server
            console.log(`Added ${amount} to wallet using ${method}`);
          }
          refetch();
        }}
      />

      {/* Receipt Modal */}
      <ModalLayoutWrapper
        open={receiptModalOpened}
        title={
          <Flex justify="space-between" align="center">
            <Box>
              <Text fw={600}>Payment Receipt</Text>
              <Text c="dimmed" size="sm">
                {selectedInvestigation?.investigationName}
              </Text>
            </Box>
            <IconCloseModal handleClose={handleCloseReceiptModal} />
          </Flex>
        }
        size="50"
        footer={
          <Group justify="flex-end" mt="sm">
            <Button variant="light" onClick={handleCloseReceiptModal}>
              Close
            </Button>
            <Button
              leftSection={<IconDownload size={16} />}
              onClick={handleDownloadReceipt}
              loading={isDownloading}
              variant="outline"
            >
              Download Receipt
            </Button>
            <Button
              leftSection={<IconPrinter size={16} />}
              onClick={handlePrintReceipt}
            >
              Print Receipt
            </Button>
          </Group>
        }
      >
        <Box p="sm">
          <Alert color="green" mb="md">
            <Text size="sm">Payment completed successfully</Text>
          </Alert>

          <Box
            ref={receiptRef}
            style={{
              border: '1px solid #E9ECEF',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
              backgroundColor: '#ffffff',
            }}
          >
            <Flex justify="space-between" mb="md">
              <Box>
                <Text fw={600} size="md">
                  Receipt
                </Text>
                <Text size="sm" c="dimmed">
                  Transaction ID: TXN{Date.now().toString().slice(-8)}
                </Text>
              </Box>
              <Box style={{ textAlign: 'right' }}>
                <Text size="sm">Date: {new Date().toLocaleDateString()}</Text>
                <Text size="sm">Time: {new Date().toLocaleTimeString()}</Text>
              </Box>
            </Flex>

            <Divider mb="md" />

            <Box mb="md">
              <Text fw={500} size="sm" mb="xs">
                Patient Information
              </Text>
              <Grid>
                <Grid.Col span={6}>
                  <Text size="sm">
                    <strong>Name:</strong> {patientDetail?.patientDisplayName}
                  </Text>
                  <Text size="sm">
                    <strong>ID:</strong> {patientDetail?.patientCode}
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm">
                    <strong>Gender:</strong> {patientDetail?.gender}
                  </Text>
                  <Text size="sm">
                    <strong>Age:</strong> {patientDetail?.age}
                  </Text>
                </Grid.Col>
              </Grid>
            </Box>

            <Box mb="md">
              <Text fw={500} size="sm" mb="xs">
                Payment Details
              </Text>
              <Box
                style={{
                  background: '#F8F9FA',
                  padding: '12px',
                  borderRadius: '6px',
                }}
              >
                <Flex justify="space-between" mb="xs">
                  <Text size="sm">Investigation:</Text>
                  <Text size="sm" fw={500}>
                    {selectedInvestigation?.investigationName}
                  </Text>
                </Flex>
                <Flex justify="space-between" mb="xs">
                  <Text size="sm">Total Amount:</Text>
                  <Text size="sm" fw={500}>
                    {selectedInvestigation?.amount
                      ? formatCurrency(selectedInvestigation.amount.amount)
                      : '-'}
                  </Text>
                </Flex>
                <Flex justify="space-between" mb="xs">
                  <Text size="sm">Amount Paid Now:</Text>
                  <Text size="sm" fw={500} c="green">
                    {formatCurrency(paymentAmount)}
                  </Text>
                </Flex>
                {selectedInvestigation?.partialAmount &&
                  selectedInvestigation.partialAmount > 0 && (
                    <Flex justify="space-between" mb="xs">
                      <Text size="sm">Previously Paid:</Text>
                      <Text size="sm" fw={500} c="blue">
                        {formatCurrency(
                          selectedInvestigation.partialAmount - paymentAmount,
                        )}
                      </Text>
                    </Flex>
                  )}
                <Flex justify="space-between" mb="xs">
                  <Text size="sm">Payment Method:</Text>
                  <Text size="sm" fw={500}>
                    {paymentMethod.charAt(0).toUpperCase() +
                      paymentMethod.slice(1)}
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text size="sm">Status:</Text>
                  <Badge
                    size="sm"
                    style={{
                      backgroundColor:
                        selectedInvestigation?.paymentStatus === 'Paid'
                          ? '#D4EDDA'
                          : '#FFE5CC',
                      color:
                        selectedInvestigation?.paymentStatus === 'Paid'
                          ? '#155724'
                          : '#FD7E14',
                    }}
                  >
                    {selectedInvestigation?.paymentStatus || 'Paid'}
                  </Badge>
                </Flex>
              </Box>
            </Box>

            <Divider mb="md" />

            <Flex justify="flex-end" direction="column" align="flex-end">
              <Text size="sm">Issued by: CM. Tori</Text>
              <Text size="xs" c="dimmed" mt="xs">
                This is a computer-generated receipt. No signature required.
              </Text>
            </Flex>
          </Box>
        </Box>
      </ModalLayoutWrapper>

      {/* Refund Modal */}
      <ModalLayoutWrapper
        open={refundModalOpened}
        size="50"
        title={
          <Flex justify="space-between" align="center">
            <Box>
              <Text fw={600}>Process Refund</Text>
              <Text c="dimmed" size="sm">
                {selectedInvestigation?.investigationName} •{' '}
                {patientDetail?.patientDisplayName}
              </Text>
            </Box>
            <IconCloseModal handleClose={handleCloseRefundModal} />
          </Flex>
        }
        footer={
          <Group justify="space-between">
            <Button
              variant="light"
              onClick={handleCloseRefundModal}
              disabled={isProcessingRefund}
            >
              Cancel
            </Button>
            <Button
              color="red"
              loading={isProcessingRefund}
              onClick={handleConfirmRefund}
              leftSection={<IconX size={16} />}
            >
              Confirm Refund
            </Button>
          </Group>
        }
      >
        <Box p="sm">
          <Alert mb="md" color="red" variant="light">
            <Text size="sm">
              ⚠️ This action will process a refund for the patient. Please
              ensure you have proper authorization before proceeding.
            </Text>
          </Alert>

          {/* Investigation Details */}
          <Box mb="md">
            <Text fw={500} size="sm" mb="xs">
              Investigation Details
            </Text>
            <Box
              style={{
                background: '#F8F9FA',
                padding: '12px',
                borderRadius: '6px',
              }}
            >
              <Flex justify="space-between" mb="xs">
                <Text size="sm">Investigation:</Text>
                <Text size="sm" fw={500}>
                  {selectedInvestigation?.investigationName}
                </Text>
              </Flex>
              <Flex justify="space-between" mb="xs">
                <Text size="sm">Original Amount:</Text>
                <Text size="sm" fw={500}>
                  {selectedInvestigation?.amount
                    ? formatCurrency(selectedInvestigation.amount.amount)
                    : '-'}
                </Text>
              </Flex>
              <Flex justify="space-between">
                <Text size="sm">Payment Status:</Text>
                <Badge
                  color={
                    selectedInvestigation?.paymentStatus === 'Paid'
                      ? 'green'
                      : 'orange'
                  }
                  size="sm"
                >
                  {selectedInvestigation?.paymentStatus}
                </Badge>
              </Flex>
            </Box>
          </Box>

          {/* Refund Amount */}
          <NumberInput
            label="Refund Amount"
            description="Enter the amount to refund to the patient"
            value={refundAmount}
            onChange={(value) => setRefundAmount(Number(value) || 0)}
            min={0}
            max={selectedInvestigation?.amount?.amount || 0}
            prefix="₦"
            thousandSeparator=","
            required
            mb="md"
            styles={{
              input: {
                fontSize: '1rem',
              },
            }}
          />

          {/* Refund Reason */}
          <Textarea
            label="Reason for Refund"
            description="Please provide a detailed reason for processing this refund"
            placeholder="e.g., Investigation cancelled, duplicate payment, medical error, etc."
            value={refundReason}
            onChange={(event) => setRefundReason(event.currentTarget.value)}
            required
            rows={3}
            styles={{
              input: {
                fontSize: '0.9rem',
              },
            }}
          />

          {/* Refund Summary */}
          {refundAmount > 0 && refundReason.trim() && (
            <Box mt="md">
              <Text fw={500} size="sm" mb="xs" c="red">
                Refund Summary
              </Text>
              <Box
                style={{
                  background: '#FFF5F5',
                  border: '1px solid #FED7D7',
                  padding: '12px',
                  borderRadius: '6px',
                }}
              >
                <Flex justify="space-between" mb="xs">
                  <Text size="sm">Refund Amount:</Text>
                  <Text size="sm" fw={600} c="red">
                    {formatCurrency(refundAmount)}
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text size="sm">Refund Type:</Text>
                  <Text size="sm" fw={500}>
                    {refundAmount >=
                    (selectedInvestigation?.amount?.amount || 0)
                      ? 'Full Refund'
                      : 'Partial Refund'}
                  </Text>
                </Flex>
              </Box>
            </Box>
          )}
        </Box>
      </ModalLayoutWrapper>
    </Box>
  );
};

export default CashierQueueBox;
