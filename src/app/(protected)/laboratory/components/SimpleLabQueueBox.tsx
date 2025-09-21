import React, { useState, useEffect, useMemo } from 'react';
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
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconUser,
  IconEdit,
  IconInfoCircle,
  IconReceipt,
  IconPrinter,
  IconFileTypePdf,
  IconCash,
  IconCreditCard,
} from '@tabler/icons-react';
import { appColors } from '@/theme/colors';
import {
  InvestigationsForLaboratoryQueueResponse,
  InvestigationResponseList,
} from '@/types/index';
import { formatCurrency } from '@/utils/constants';
import { TableGrid } from '@/components/shared/GridTableLayout';
import TiptapEditor from '@/components/shared/TiptapEditor';
import '@/components/shared/TiptapEditor.css';
import { IconThreeDots } from '@/components/shared/IconComponents/IconThreeDots';
import ModalLayoutWrapper from '@/components/shared/ModalLayoutWrapper';
import IconCloseModal from '@/components/shared/IconComponents/IconCloseModal';
import LabPaymentModal from './LabPaymentModal';
import ViewPatientInfoModal from './ViewPatientInfoModal';
import LabBulkPaymentModal from './LabBulkPaymentModal';
import { showNotification } from '@mantine/notifications';

interface SimpleLabQueueBoxProps {
  patientId: number;
  value: InvestigationsForLaboratoryQueueResponse;
  sortby?: string;
}

// Status color mapping
const getStatusColor = (status: string) => {
  const statusColors: { [key: string]: { color: string; bg: string } } = {
    Requested: { color: '#FF8B00', bg: '#FFF4E6' },
    'Result Ready': { color: '#27AE60', bg: '#E2F8EB' },
    'Image Ready': { color: '#2F80ED', bg: '#E3F2FD' },
    'Awaiting Review': { color: '#F2994A', bg: '#FFF8E1' },
    'Report Ready': { color: '#9B51E0', bg: '#F3E5F5' },
    Processing: { color: '#2196F3', bg: '#E3F2FD' },
    Invoiced: { color: '#17A2B8', bg: '#E1F7FA' },
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

const SimpleLabQueueBox: React.FC<SimpleLabQueueBoxProps> = ({
  patientId,
  value,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [resultModalOpened, setResultModalOpened] = useState(false);
  const [previewModalOpened, setPreviewModalOpened] = useState(false);
  const [selectedInvestigation, setSelectedInvestigation] =
    useState<InvestigationResponseList | null>(null);
  const [editorContent, setEditorContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invoiceModalOpened, setInvoiceModalOpened] = useState(false);
  const [selectedInvoiceInvestigation, setSelectedInvoiceInvestigation] =
    useState<InvestigationResponseList | null>(null);
  const [paymentModalOpened, setPaymentModalOpened] = useState(false);
  const [selectedPaymentInvestigation, setSelectedPaymentInvestigation] =
    useState<InvestigationResponseList | null>(null);
  const [patientInfoModalOpened, setPatientInfoModalOpened] = useState(false);
  const [
    selectedPatientInfoInvestigation,
    setSelectedPatientInfoInvestigation,
  ] = useState<InvestigationResponseList | null>(null);
  const [bulkPaymentModalOpened, setBulkPaymentModalOpened] = useState(false);
  const [bulkPaymentMethod, setBulkPaymentMethod] = useState<string>('wallet');
  const [bulkPaymentAmount, setBulkPaymentAmount] = useState<number>(0);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [localInvestigations, setLocalInvestigations] = useState(
    value.investigationItems || [],
  );
  const patientDetail = value.patientDetail;
  const investigations = localInvestigations;

  // Update local state when value changes
  useEffect(() => {
    setLocalInvestigations(value.investigationItems || []);
  }, [value.investigationItems]);

  // Show first 4 investigations in preview
  const previewInvestigations = investigations.slice(0, 4);
  const additionalCount = Math.max(0, investigations.length - 4);

  // Calculate outstanding amounts for bulk payment - memoize to prevent unnecessary recalculations
  const outstandingInvestigations = useMemo(
    () =>
      investigations.filter(
        (inv) =>
          inv.paymentStatus === 'Unpaid' ||
          inv.paymentStatus === 'Partially Paid',
      ),
    [investigations],
  );

  const totalOutstanding = useMemo(
    () =>
      outstandingInvestigations.reduce((total, inv) => {
        const amount = inv.amount?.amount || 0;
        const partialAmount = (inv as any).partialAmount || 0;
        return total + (amount - partialAmount);
      }, 0),
    [outstandingInvestigations],
  );

  const handleCreateInvoice = () => {
    console.log('Create invoice for patient:', patientId);
    // Mock invoice creation
  };

  // Action handlers for menu items
  const handleEnterResult = (investigation: InvestigationResponseList) => {
    // Check investigation status - must be 'Processing' to enter results
    const currentStatus = investigation.status || 'Requested';

    if (currentStatus === 'Requested') {
      showNotification({
        title: 'Payment Required',
        message:
          'Investigation must be paid first. Status will change to "Processing" after payment.',
        color: 'orange',
      });
      return;
    }

    if (currentStatus !== 'Processing') {
      showNotification({
        title: 'Invalid Status',
        message: `Results can only be entered when status is "Processing". Current status: ${currentStatus}`,
        color: 'red',
      });
      return;
    }

    setSelectedInvestigation(investigation);
    setEditorContent('');
    setResultModalOpened(true);
  };

  const handleViewTestInfo = (investigation: InvestigationResponseList) => {
    setSelectedPatientInfoInvestigation(investigation);
    setPatientInfoModalOpened(true);
  };

  const handleViewInvoice = (investigation: InvestigationResponseList) => {
    setSelectedInvoiceInvestigation(investigation);
    setInvoiceModalOpened(true);
  };

  const handleCloseInvoiceModal = () => {
    setInvoiceModalOpened(false);
    setSelectedInvoiceInvestigation(null);
  };

  // Payment handlers
  const handleProcessPayment = (investigation: InvestigationResponseList) => {
    setSelectedPaymentInvestigation(investigation);
    setPaymentModalOpened(true);
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpened(false);
    setSelectedPaymentInvestigation(null);
  };

  const handlePaymentSuccess = () => {
    // Update investigation status after successful payment
    if (selectedPaymentInvestigation) {
      const investigationName =
        selectedPaymentInvestigation.investigationName?.toLowerCase() || '';

      // Check if it's a scan investigation - these go directly to 'Report Ready'
      const isScanInvestigation =
        investigationName.includes('x-ray') ||
        investigationName.includes('ct') ||
        investigationName.includes('mri') ||
        investigationName.includes('scan') ||
        investigationName.includes('ultrasound') ||
        investigationName.includes('echo') ||
        investigationName.includes('mammogram');

      const newStatus = isScanInvestigation ? 'Report Ready' : 'Processing';

      const updatedInvestigations = investigations.map((inv) =>
        inv.investigationRequestId ===
        selectedPaymentInvestigation.investigationRequestId
          ? {
              ...inv,
              paymentStatus: 'Paid',
              status: newStatus, // 'Report Ready' for scans, 'Processing' for lab tests
            }
          : inv,
      );
      setLocalInvestigations(updatedInvestigations);
    }
  };

  // Patient info handlers
  const handleClosePatientInfoModal = () => {
    setPatientInfoModalOpened(false);
    setSelectedPatientInfoInvestigation(null);
  };

  // Bulk payment handlers
  const handleBulkPayment = () => {
    if (totalOutstanding > 0) {
      setBulkPaymentAmount(totalOutstanding);
      setBulkPaymentModalOpened(true);
    }
  };

  const handleCloseBulkPaymentModal = () => {
    setBulkPaymentModalOpened(false);
    setBulkPaymentMethod('wallet');
    setBulkPaymentAmount(0);
    setIsBulkProcessing(false);
  };

  const handleBulkPaymentSuccess = () => {
    // Update all outstanding investigations status after successful bulk payment
    const updatedInvestigations = investigations.map((inv) => {
      const isOutstanding =
        inv.paymentStatus === 'Unpaid' ||
        inv.paymentStatus === 'Partially Paid';

      if (isOutstanding) {
        const investigationName = inv.investigationName?.toLowerCase() || '';

        // Check if it's a scan investigation - these go directly to 'Report Ready'
        const isScanInvestigation =
          investigationName.includes('x-ray') ||
          investigationName.includes('ct') ||
          investigationName.includes('mri') ||
          investigationName.includes('scan') ||
          investigationName.includes('ultrasound') ||
          investigationName.includes('echo') ||
          investigationName.includes('mammogram');

        const newStatus = isScanInvestigation ? 'Report Ready' : 'Processing';

        return {
          ...inv,
          paymentStatus: 'Paid',
          status: newStatus, // 'Report Ready' for scans, 'Processing' for lab tests
        };
      }

      return inv;
    });

    setLocalInvestigations(updatedInvestigations);

    handleCloseBulkPaymentModal();
  };

  const handleDownloadResult = async (
    investigation: InvestigationResponseList,
  ) => {
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

      // Generate report content
      tempContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700;">LABORATORY REPORT</h1>
          <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div style="margin-bottom: 20px; background: #f5f5f5; padding: 15px; border-radius: 5px;">
          <h3 style="margin: 0 0 15px 0; font-size: 18px;">Patient Information</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <p style="margin: 5px 0; font-size: 14px;"><strong>Name:</strong> ${patientDetail?.patientDisplayName}</p>
              <p style="margin: 5px 0; font-size: 14px;"><strong>Patient ID:</strong> ${patientDetail?.patientCode}</p>
              <p style="margin: 5px 0; font-size: 14px;"><strong>Age:</strong> ${patientDetail?.age}</p>
            </div>
            <div>
              <p style="margin: 5px 0; font-size: 14px;"><strong>Gender:</strong> ${patientDetail?.gender}</p>
              ${patientDetail?.insuranceInfo ? `<p style="margin: 5px 0; font-size: 14px;"><strong>Insurance:</strong> ${patientDetail.insuranceInfo.insuranceProvider}</p>` : ''}
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 20px; background: #e3f2fd; padding: 15px; border-radius: 5px;">
          <h3 style="margin: 0 0 15px 0; font-size: 18px;">Test Information</h3>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Investigation:</strong> ${investigation.investigationName}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Specimen:</strong> ${investigation.specimen || 'N/A'}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Status:</strong> ${investigation.status}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Date:</strong> ${investigation.dateCreatedOrLastModified ? formatDate(investigation.dateCreatedOrLastModified) : 'N/A'}</p>
        </div>
        
        <div style="margin-top: 20px;">
          <h3 style="margin: 0 0 15px 0; font-size: 18px;">Test Results</h3>
          <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; background: #fff; min-height: 200px;">
            <p style="margin: 0; font-size: 14px; color: #666;">Report content will be available when results are entered.</p>
          </div>
        </div>
        
        <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #666;">
          <p style="margin: 5px 0;">This report was generated electronically and is valid without signature.</p>
          <p style="margin: 5px 0;">Report ID: ${investigation.investigationRequestId}</p>
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

      const fileName =
        `${investigation.investigationName}_${patientDetail?.patientDisplayName}_Report.pdf`.replace(
          /[^a-zA-Z0-9]/g,
          '_',
        );
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handleCloseResultModal = () => {
    setResultModalOpened(false);
    setSelectedInvestigation(null);
    setEditorContent('');
  };

  const handlePreviewResult = () => {
    if (editorContent.trim()) {
      setPreviewModalOpened(true);
    }
  };

  const handleClosePreviewModal = () => {
    setPreviewModalOpened(false);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('preview-content');
    if (printContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Laboratory Report - ${selectedInvestigation?.investigationName}</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  margin: 20px; 
                  line-height: 1.6;
                }
                .header { 
                  text-align: center; 
                  margin-bottom: 30px; 
                  border-bottom: 2px solid #333;
                  padding-bottom: 20px;
                }
                .patient-info { 
                  margin-bottom: 20px; 
                  background: #f5f5f5;
                  padding: 15px;
                  border-radius: 5px;
                }
                .test-info { 
                  margin-bottom: 20px; 
                  background: #e3f2fd;
                  padding: 15px;
                  border-radius: 5px;
                }
                .content { 
                  margin-top: 20px; 
                }
                .footer {
                  margin-top: 40px;
                  text-align: center;
                  font-size: 12px;
                  color: #666;
                }
                @media print {
                  body { margin: 0; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleDownloadPDF = async () => {
    try {
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).jsPDF;

      const element = document.getElementById('preview-content');
      if (element) {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Add padding/margins to the PDF
        const margin = 9; // 15mm margin on all sides
        const imgWidth = 210 - margin * 2; // A4 width minus margins
        const pageHeight = 297 - margin * 2; // A4 height minus margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = margin; // Start with top margin

        // Add the first page with margins
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if needed
        while (heightLeft >= 0) {
          position = margin - (imgHeight - heightLeft); // Adjust position for continuation
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        const fileName =
          `${selectedInvestigation?.investigationName}_${patientDetail?.patientDisplayName}_Report.pdf`.replace(
            /[^a-zA-Z0-9]/g,
            '_',
          );
        pdf.save(fileName);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handleSaveResult = async () => {
    if (!selectedInvestigation) return;

    setIsSubmitting(true);
    try {
      // TODO: Implement save result API call
      console.log(
        'Saving result for:',
        selectedInvestigation.investigationName,
      );
      console.log('Result content:', editorContent);

      // Update investigation status to 'Report Ready' in local state
      const updatedInvestigations = investigations.map((inv) =>
        inv.investigationRequestId ===
        selectedInvestigation.investigationRequestId
          ? { ...inv, status: 'Report Ready' }
          : inv,
      );

      // Update local state immediately for UI feedback
      setLocalInvestigations(updatedInvestigations);

      // Close modal and refresh data
      handleCloseResultModal();
    } catch (error) {
      console.error('Error saving result:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '16px',
        marginBottom: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {/* Patient Header */}
      <Grid mb="md" gutter="md" align="flex-start">
        {/* Patient Info */}
        <Grid.Col
          span={{ base: 12, sm: 6, md: 5, lg: 4 }}
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
                {patientDetail?.walletBalance && (
                  <>
                    <Divider orientation="vertical" size="sm" />
                    <Badge
                      fz="12px"
                      c="white"
                      style={{ textTransform: 'capitalize' }}
                      fw={500}
                    >
                      Wallet balance:{' '}
                      {formatCurrency(patientDetail.walletBalance)}
                    </Badge>
                  </>
                )}
              </Flex>

              {/* Doctor Info */}
              <Flex align="center" gap="xs" mt="xs" wrap="wrap">
                <Text size="14px" w="fit-content" c={appColors.black} fw={500}>
                  {investigations[0]?.creatorOrModifierInfo?.title}{' '}
                  {investigations[0]?.creatorOrModifierInfo?.lastName}
                </Text>
                <Divider orientation="vertical" size="sm" />
                <Text size="14px" c={appColors.subText}>
                  {investigations[0]?.creatorOrModifierInfo?.unit}
                </Text>
                <Divider orientation="vertical" size="sm" />
                <Text size="14px" c={appColors.subText}>
                  {investigations[0]?.dateCreatedOrLastModified &&
                    formatDate(investigations[0].dateCreatedOrLastModified)}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Grid.Col>

        {/* Investigation Preview Grid (2x2) */}
        <Grid.Col
          span={{ base: 12, sm: 6, md: 5, lg: 6 }}
          style={{
            borderRight: '1px solid #E9ECEF',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <Grid columns={2} gutter="md">
            {previewInvestigations.map((investigation, index) => (
              <Grid.Col
                span={1}
                key={investigation.investigationRequestId || index}
              >
                <Box
                  style={{
                    padding: '12px',
                    backgroundColor: '#F8F9FA',
                    borderRadius: '8px',
                    border: '1px solid #E9ECEF',
                  }}
                >
                  <Text size="sm" w={500} mb="xs" style={{ lineHeight: 1.3 }}>
                    {investigation.investigationName}
                  </Text>
                  <Flex align="center" gap="xs">
                    <Badge
                      size="sm"
                      style={{
                        backgroundColor: getStatusColor(
                          investigation.status || 'Requested',
                        ).bg,
                        color: getStatusColor(
                          investigation.status || 'Requested',
                        ).color,
                        fontSize: '10px',
                      }}
                    >
                      {investigation.status || 'Requested'}
                    </Badge>
                    <Text size="xs" color={appColors.subText}>
                      {investigation.dateCreatedOrLastModified &&
                        formatDate(investigation.dateCreatedOrLastModified)}
                    </Text>
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
            backgroundColor: '#E3F2FD',
            borderRadius: '6px',
            marginBottom: '12px',
          }}
        >
          <Text size="sm" color="#1976D2" w={500}>
            +{additionalCount} more investigation
            {additionalCount > 1 ? 's' : ''}
          </Text>
        </Box>
      )}

      {/* Expanded Investigation Table */}
      <Collapse in={expanded}>
        <Divider my="md" />
        <Text size="md" w={600} mb="md">
          All Investigations
        </Text>

        <TableGrid
          columns={[
            {
              label: 'Test Name',
              span: 3,
              render: (investigation: InvestigationResponseList) => (
                <Box>
                  <Text size="sm" w={500}>
                    {investigation.investigationName}
                  </Text>
                  {investigation.investigationNote && (
                    <Text size="xs" color={appColors.subText}>
                      {investigation.investigationNote}
                    </Text>
                  )}
                </Box>
              ),
            },
            {
              label: 'Specimen',
              span: 2,
              render: (investigation: InvestigationResponseList) => (
                <Text size="sm">{investigation.specimen || '-'}</Text>
              ),
            },
            {
              label: 'Status',
              span: 2,
              render: (investigation: InvestigationResponseList) => (
                <Badge
                  size="sm"
                  style={{
                    backgroundColor: getStatusColor(
                      investigation.status || 'Requested',
                    ).bg,
                    color: getStatusColor(investigation.status || 'Requested')
                      .color,
                  }}
                >
                  {investigation.status || 'Requested'}
                </Badge>
              ),
            },
            {
              label: 'Date',
              span: 2,
              render: (investigation: InvestigationResponseList) => (
                <Text size="sm">
                  {investigation.dateCreatedOrLastModified &&
                    formatDate(investigation.dateCreatedOrLastModified)}
                </Text>
              ),
            },
            {
              label: 'Price',
              span: 2,
              render: (investigation: InvestigationResponseList) => (
                <Text size="sm" w={500}>
                  {investigation.amount
                    ? `₦${investigation.amount.amount.toLocaleString()}`
                    : '-'}
                </Text>
              ),
            },
            {
              label: 'Actions',
              span: 1,
              render: (investigation: InvestigationResponseList) => (
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="gray">
                      <IconThreeDots size={16} />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    {/* Only show Enter result if status is Processing (after payment) */}
                    {investigation.status === 'Processing' && (
                      <Menu.Item
                        leftSection={<IconEdit size={14} />}
                        onClick={() => handleEnterResult(investigation)}
                      >
                        Enter result
                      </Menu.Item>
                    )}

                    {/* Show Download Result if report is ready */}
                    {investigation.status === 'Report Ready' && (
                      <Menu.Item
                        leftSection={<IconFileTypePdf size={14} />}
                        onClick={() => handleDownloadResult(investigation)}
                      >
                        Download Result
                      </Menu.Item>
                    )}

                    <Menu.Item
                      leftSection={<IconInfoCircle size={14} />}
                      onClick={() => handleViewTestInfo(investigation)}
                    >
                      View test info
                    </Menu.Item>

                    {/* Payment options based on payment status */}
                    {investigation.paymentStatus === 'Unpaid' && (
                      <Menu.Item
                        leftSection={<IconCash size={14} />}
                        onClick={() => handleProcessPayment(investigation)}
                        color="blue"
                      >
                        Pay for Service
                      </Menu.Item>
                    )}

                    {investigation.paymentStatus === 'Partially Paid' && (
                      <Menu.Item
                        leftSection={<IconCreditCard size={14} />}
                        onClick={() => handleProcessPayment(investigation)}
                        color="orange"
                      >
                        Complete Payment
                      </Menu.Item>
                    )}

                    {/* Only show if test has been paid for */}
                    {investigation.paymentStatus === 'Paid' && (
                      <Menu.Item
                        leftSection={<IconReceipt size={14} />}
                        onClick={() => handleViewInvoice(investigation)}
                      >
                        View invoice
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

      {/* TinyMCE Editor Modal for Enter Result */}
      <ModalLayoutWrapper
        open={resultModalOpened}
        title={
          <Flex justify="space-between" align="center">
            <Box>
              <Text fw={600}>Enter Test Result</Text>
              <Text c="dimmed" size="sm">
                {selectedInvestigation?.investigationName} •{' '}
                {patientDetail?.patientDisplayName}
              </Text>
            </Box>
            <IconCloseModal handleClose={handleCloseResultModal} />
          </Flex>
        }
        size="85"
        footer={
          <Group justify="flex-end" mt="sm">
            <Button
              variant="light"
              onClick={handleCloseResultModal}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={handlePreviewResult}
              disabled={isSubmitting || !editorContent.trim()}
            >
              Preview on Paper
            </Button>
            <Button
              loading={isSubmitting}
              onClick={handleSaveResult}
              disabled={!editorContent.trim()}
            >
              Save (Report Ready)
            </Button>
          </Group>
        }
      >
        <Box p="sm">
          <TiptapEditor
            content={editorContent}
            onChange={setEditorContent}
            placeholder="Enter test result details..."
            height={400}
          />
        </Box>
      </ModalLayoutWrapper>

      {/* Preview Modal */}
      <ModalLayoutWrapper
        open={previewModalOpened}
        title={
          <Flex justify="space-between" align="center">
            <Box>
              <Text fw={600}>Preview Report</Text>
              <Text c="dimmed" size="sm">
                {selectedInvestigation?.investigationName} •{' '}
                {patientDetail?.patientDisplayName}
              </Text>
            </Box>
            <IconCloseModal handleClose={handleClosePreviewModal} />
          </Flex>
        }
        size="90"
        footer={
          <Group justify="flex-end" mt="sm">
            <Button variant="light" onClick={handleClosePreviewModal}>
              Close
            </Button>
            <Button
              variant="outline"
              leftSection={<IconPrinter size={16} />}
              onClick={handlePrint}
            >
              Print
            </Button>
            <Button
              leftSection={<IconFileTypePdf size={16} />}
              onClick={handleDownloadPDF}
            >
              Download PDF
            </Button>
          </Group>
        }
      >
        <Box p="md">
          <div id="preview-content">
            {/* Report Header */}
            <div className="header">
              <Text size="xl" fw={700} mb="xs">
                LABORATORY REPORT
              </Text>
              <Text size="sm" c="dimmed">
                Generated on {new Date().toLocaleDateString()}
              </Text>
            </div>

            {/* Patient Information */}
            <div className="patient-info">
              <Text size="lg" fw={600} mb="md">
                Patient Information
              </Text>
              <Grid>
                <Grid.Col span={6}>
                  <Text size="sm">
                    <strong>Name:</strong> {patientDetail?.patientDisplayName}
                  </Text>
                  <Text size="sm">
                    <strong>Patient ID:</strong> {patientDetail?.patientCode}
                  </Text>
                  <Text size="sm">
                    <strong>Age:</strong> {patientDetail?.age}
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm">
                    <strong>Gender:</strong> {patientDetail?.gender}
                  </Text>
                  {patientDetail?.insuranceInfo && (
                    <Text size="sm">
                      <strong>Insurance:</strong>{' '}
                      {patientDetail.insuranceInfo.insuranceProvider}
                    </Text>
                  )}
                </Grid.Col>
              </Grid>
            </div>

            {/* Test Information */}
            <div className="test-info">
              <Text size="lg" fw={600} mb="md">
                Test Information
              </Text>
              <Text size="sm">
                <strong>Investigation:</strong>{' '}
                {selectedInvestigation?.investigationName}
              </Text>
              <Text size="sm">
                <strong>Specimen:</strong>{' '}
                {selectedInvestigation?.specimen || 'N/A'}
              </Text>
              <Text size="sm">
                <strong>Requested by:</strong>{' '}
                {selectedInvestigation?.creatorOrModifierInfo?.title}{' '}
                {selectedInvestigation?.creatorOrModifierInfo?.lastName}
              </Text>
              <Text size="sm">
                <strong>Department:</strong>{' '}
                {selectedInvestigation?.creatorOrModifierInfo?.unit}
              </Text>
              <Text size="sm">
                <strong>Date Requested:</strong>{' '}
                {selectedInvestigation?.dateCreatedOrLastModified &&
                  formatDate(selectedInvestigation.dateCreatedOrLastModified)}
              </Text>
            </div>

            {/* Test Results */}
            <div className="content">
              <Text size="lg" fw={600} mb="md">
                Test Results
              </Text>
              <Box
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: '#fff',
                }}
                dangerouslySetInnerHTML={{ __html: editorContent }}
              />
            </div>

            {/* Footer */}
            <div className="footer">
              <Text size="xs">
                This report was generated electronically and is valid without
                signature.
              </Text>
              <Text size="xs">
                Report ID: {selectedInvestigation?.investigationRequestId}
              </Text>
            </div>
          </div>
        </Box>
      </ModalLayoutWrapper>

      {/* Invoice Modal */}
      <ModalLayoutWrapper
        open={invoiceModalOpened}
        title={
          <Flex justify="space-between" align="center">
            <Box>
              <Text fw={600}>Invoice Details</Text>
              <Text c="dimmed" size="sm">
                {selectedInvoiceInvestigation?.investigationName} •{' '}
                {patientDetail?.patientDisplayName}
              </Text>
            </Box>
            <IconCloseModal handleClose={handleCloseInvoiceModal} />
          </Flex>
        }
        size="80"
        footer={
          <Group justify="flex-end" mt="sm">
            <Button variant="light" onClick={handleCloseInvoiceModal}>
              Close
            </Button>
            <Button
              leftSection={<IconPrinter size={16} />}
              variant="outline"
              onClick={() => {
                const printContent = document.getElementById('invoice-content');
                if (printContent) {
                  const printWindow = window.open('', '_blank');
                  if (printWindow) {
                    printWindow.document.write(`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <title>Invoice - ${selectedInvoiceInvestigation?.investigationName}</title>
                          <style>
                            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
                            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
                            .invoice-info { margin-bottom: 20px; background: #f5f5f5; padding: 15px; border-radius: 5px; }
                            .patient-info { margin-bottom: 20px; background: #e3f2fd; padding: 15px; border-radius: 5px; }
                            .invoice-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                            .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                            .invoice-table th { background-color: #f2f2f2; }
                            .total-section { margin-top: 20px; text-align: right; }
                            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
                            @media print { body { margin: 0; } .no-print { display: none; } }
                          </style>
                        </head>
                        <body>
                          ${printContent.innerHTML}
                        </body>
                      </html>
                    `);
                    printWindow.document.close();
                    printWindow.print();
                  }
                }
              }}
            >
              Print Invoice
            </Button>
            <Button
              leftSection={<IconFileTypePdf size={16} />}
              onClick={async () => {
                try {
                  const html2canvas = (await import('html2canvas')).default;
                  const jsPDF = (await import('jspdf')).jsPDF;

                  const element = document.getElementById('invoice-content');
                  if (element) {
                    const canvas = await html2canvas(element, {
                      scale: 2,
                      useCORS: true,
                      allowTaint: true,
                      backgroundColor: '#ffffff',
                    });

                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');

                    const margin = 15;
                    const imgWidth = 210 - margin * 2;
                    const pageHeight = 297 - margin * 2;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    let heightLeft = imgHeight;

                    let position = margin;

                    pdf.addImage(
                      imgData,
                      'PNG',
                      margin,
                      position,
                      imgWidth,
                      imgHeight,
                    );
                    heightLeft -= pageHeight;

                    while (heightLeft >= 0) {
                      position = margin - (imgHeight - heightLeft);
                      pdf.addPage();
                      pdf.addImage(
                        imgData,
                        'PNG',
                        margin,
                        position,
                        imgWidth,
                        imgHeight,
                      );
                      heightLeft -= pageHeight;
                    }

                    const fileName =
                      `Invoice_${selectedInvoiceInvestigation?.investigationName}_${patientDetail?.patientDisplayName}.pdf`.replace(
                        /[^a-zA-Z0-9]/g,
                        '_',
                      );
                    pdf.save(fileName);
                  }
                } catch (error) {
                  console.error('Error generating PDF:', error);
                  alert('Error generating PDF. Please try again.');
                }
              }}
            >
              Download PDF
            </Button>
          </Group>
        }
      >
        <Box mt={15}>
          <Box
            id="invoice-content"
            bg="white"
            p="md"
            style={{ borderRadius: '10px' }}
          >
            {/* Invoice Header */}
            <div className="header">
              <Text size="xl" fw={700} mb="xs">
                INVOICE
              </Text>
              <Text size="sm" c="dimmed">
                Invoice Date: {new Date().toLocaleDateString()}
              </Text>
              <Text size="sm" c="dimmed">
                Invoice ID: INV-
                {selectedInvoiceInvestigation?.investigationRequestId}
              </Text>
            </div>

            {/* Patient Information */}
            <div className="patient-info">
              <Text size="lg" fw={600} mb="md">
                Patient Information
              </Text>
              <Grid>
                <Grid.Col span={6}>
                  <Text size="sm">
                    <strong>Name:</strong> {patientDetail?.patientDisplayName}
                  </Text>
                  <Text size="sm">
                    <strong>Patient ID:</strong> {patientDetail?.patientCode}
                  </Text>
                  <Text size="sm">
                    <strong>Age:</strong> {patientDetail?.age}
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm">
                    <strong>Gender:</strong> {patientDetail?.gender}
                  </Text>
                  {patientDetail?.insuranceInfo && (
                    <Text size="sm">
                      <strong>Insurance:</strong>{' '}
                      {patientDetail.insuranceInfo.insuranceProvider}
                    </Text>
                  )}
                </Grid.Col>
              </Grid>
            </div>

            {/* Invoice Details */}
            <div className="invoice-info">
              <Text size="lg" fw={600} mb="md">
                Service Details
              </Text>
              <Text size="sm">
                <strong>Investigation:</strong>{' '}
                {selectedInvoiceInvestigation?.investigationName}
              </Text>
              <Text size="sm">
                <strong>Specimen:</strong>{' '}
                {selectedInvoiceInvestigation?.specimen || 'N/A'}
              </Text>
              <Text size="sm">
                <strong>Status:</strong> {selectedInvoiceInvestigation?.status}
              </Text>
              <Text size="sm">
                <strong>Date Requested:</strong>{' '}
                {selectedInvoiceInvestigation?.dateCreatedOrLastModified &&
                  formatDate(
                    selectedInvoiceInvestigation.dateCreatedOrLastModified,
                  )}
              </Text>
              <Text size="sm">
                <strong>Payment Status:</strong>{' '}
                {selectedInvoiceInvestigation?.paymentStatus || 'Pending'}
              </Text>
            </div>

            {/* Invoice Items Table */}
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedInvoiceInvestigation?.investigationName}</td>
                  <td>1</td>
                  <td>
                    {selectedInvoiceInvestigation?.amount
                      ? formatCurrency(
                          selectedInvoiceInvestigation.amount.amount,
                        )
                      : '₦0.00'}
                  </td>
                  <td>
                    {selectedInvoiceInvestigation?.amount
                      ? formatCurrency(
                          selectedInvoiceInvestigation.amount.amount,
                        )
                      : '₦0.00'}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Total Section */}
            <div className="total-section">
              <Text size="lg" fw={600}>
                Total Amount:{' '}
                {selectedInvoiceInvestigation?.amount
                  ? formatCurrency(selectedInvoiceInvestigation.amount.amount)
                  : '₦0.00'}
              </Text>
              <Text size="sm" c="dimmed" mt="xs">
                Payment Status:{' '}
                {selectedInvoiceInvestigation?.paymentStatus || 'Pending'}
              </Text>
            </div>

            {/* Footer */}
            <div className="footer">
              <Text size="xs">
                This invoice was generated electronically and is valid without
                signature.
              </Text>
              <Text size="xs">
                For inquiries, please contact the billing department.
              </Text>
            </div>
          </Box>
        </Box>
      </ModalLayoutWrapper>

      {/* Payment Modal */}
      <LabPaymentModal
        opened={paymentModalOpened}
        onClose={handleClosePaymentModal}
        selectedInvestigation={selectedPaymentInvestigation}
        patientDetail={patientDetail}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Patient Info Modal */}
      <ViewPatientInfoModal
        opened={patientInfoModalOpened}
        onClose={handleClosePatientInfoModal}
        patientDetail={patientDetail}
        investigationDetails={selectedPatientInfoInvestigation}
      />

      {/* Bulk Payment Modal */}
      <LabBulkPaymentModal
        opened={bulkPaymentModalOpened}
        onClose={handleCloseBulkPaymentModal}
        investigations={investigations}
        patientDetail={patientDetail}
        onPaymentSuccess={handleBulkPaymentSuccess}
        totalOutstanding={totalOutstanding}
      />
    </Box>
  );
};

export default SimpleLabQueueBox;
