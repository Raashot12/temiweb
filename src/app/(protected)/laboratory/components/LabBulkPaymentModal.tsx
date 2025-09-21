import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Group,
  Alert,
  Select,
  TextInput,
  NumberInput,
  Divider,
  Stack,
  Badge,
} from '@mantine/core';
import {
  IconCheck,
  IconCash,
  IconWallet,
  IconShield,
  IconAlertTriangle,
} from '@tabler/icons-react';
import { InvestigationResponseList } from '@/types/index';
import { ExtendedInvestigationResponseList } from '@/types/custom';
import { formatCurrency } from '@/utils/constants';
import ModalLayoutWrapper from '@/components/shared/ModalLayoutWrapper';
import IconCloseModal from '@/components/shared/IconComponents/IconCloseModal';
import { showNotification } from '@mantine/notifications';

interface LabBulkPaymentModalProps {
  opened: boolean;
  onClose: () => void;
  investigations: InvestigationResponseList[];
  patientDetail: any;
  onPaymentSuccess: () => void;
  totalOutstanding: number;
}

// Coverage calculation based on service type for bulk payment
const calculateBulkInsuranceCoverage = (investigations: InvestigationResponseList[]) => {
  let totalAmount = 0;
  let totalInsuranceCovers = 0;
  let totalPatientPays = 0;
  let requiresPreAuth = false;

  investigations.forEach((investigation) => {
    const amount = investigation.amount?.amount || 0;
    const partialAmount = (investigation as any).partialAmount || 0;
    const outstandingAmount = amount - partialAmount;
    
    if (outstandingAmount <= 0) return;

    const investigationName = investigation.investigationName?.toLowerCase() || '';
    let coveragePercentage = 0;
    let needsPreAuth = false;

    // Laboratory Tests & Consultations - 100% coverage
    if (
      investigationName.includes('blood') ||
      investigationName.includes('urine') ||
      investigationName.includes('stool') ||
      investigationName.includes('test') ||
      investigationName.includes('consultation') ||
      investigationName.includes('lab')
    ) {
      coveragePercentage = 100;
      needsPreAuth = true;
    }
    // Prescription Drugs - 90% coverage
    else if (
      investigationName.includes('drug') ||
      investigationName.includes('medicine') ||
      investigationName.includes('tablet') ||
      investigationName.includes('capsule')
    ) {
      coveragePercentage = 90;
    }
    // Medical Scans - 50% coverage
    else if (
      investigationName.includes('x-ray') ||
      investigationName.includes('ct') ||
      investigationName.includes('mri') ||
      investigationName.includes('scan') ||
      investigationName.includes('ultrasound')
    ) {
      coveragePercentage = 50;
    }

    const insuranceCovers = (outstandingAmount * coveragePercentage) / 100;
    const patientPays = outstandingAmount - insuranceCovers;

    totalAmount += outstandingAmount;
    totalInsuranceCovers += insuranceCovers;
    totalPatientPays += patientPays;
    
    if (needsPreAuth) {
      requiresPreAuth = true;
    }
  });

  const overallCoveragePercentage = totalAmount > 0 ? Math.round((totalInsuranceCovers / totalAmount) * 100) : 0;

  return {
    coveragePercentage: overallCoveragePercentage,
    insuranceCovers: totalInsuranceCovers,
    patientPays: totalPatientPays,
    requiresPreAuth,
    totalAmount,
  };
};

const LabBulkPaymentModal: React.FC<LabBulkPaymentModalProps> = ({
  opened,
  onClose,
  investigations,
  patientDetail,
  onPaymentSuccess,
  totalOutstanding,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('wallet');
  const [isProcessing, setIsProcessing] = useState(false);
  const [preAuthNumber, setPreAuthNumber] = useState('');
  const [insuranceCoverage, setInsuranceCoverage] = useState({
    coveragePercentage: 0,
    insuranceCovers: 0,
    patientPays: 0,
    requiresPreAuth: false,
    totalAmount: 0,
  });

  const isInsurancePayment = paymentMethod === 'insurance';
  const requiresPreAuth = isInsurancePayment && insuranceCoverage.requiresPreAuth;
  
  // Filter outstanding investigations - memoize to prevent infinite loops
  const outstandingInvestigations = useMemo(() => 
    investigations.filter(
      (inv) => inv.paymentStatus === 'Unpaid' || inv.paymentStatus === 'Partially Paid'
    ), [investigations]
  );

  useEffect(() => {
    if (outstandingInvestigations.length > 0) {
      const coverage = calculateBulkInsuranceCoverage(outstandingInvestigations);
      setInsuranceCoverage(coverage);
    }
  }, [outstandingInvestigations]);

  const handlePaymentMethodChange = (value: string | null) => {
    if (!value) return;
    setPaymentMethod(value);
    setPreAuthNumber('');
  };

  const handleCloseModal = () => {
    setPaymentMethod('wallet');
    setPreAuthNumber('');
    setIsProcessing(false);
    onClose();
  };

  const handleConfirmBulkPayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate bulk payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // For insurance payments, automatically settle with insurance
      let finalPaymentAmount = totalOutstanding;
      if (isInsurancePayment) {
        finalPaymentAmount = insuranceCoverage.patientPays;
      }

      // Show success notification
      showNotification({
        title: 'Bulk Payment Successful',
        message: isInsurancePayment
          ? `Patient paid ${formatCurrency(
              finalPaymentAmount
            )}. Insurance will cover ${formatCurrency(
              insuranceCoverage.insuranceCovers
            )} for ${outstandingInvestigations.length} investigations.`
          : `Payment of ${formatCurrency(totalOutstanding)} completed successfully for ${outstandingInvestigations.length} investigations.`,
        color: 'green',
      });

      onPaymentSuccess();
      handleCloseModal();
    } catch (error) {
      showNotification({
        title: 'Bulk Payment Failed',
        message: 'There was an error processing the bulk payment. Please try again.',
        color: 'red',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ModalLayoutWrapper
      open={opened}
      title={
        <Flex justify="space-between" align="center">
          <Box>
            <Text fw={600}>Pay All Outstanding</Text>
            <Text c="dimmed" size="sm">
              {outstandingInvestigations.length} investigations • {patientDetail?.patientDisplayName}
            </Text>
          </Box>
          <IconCloseModal handleClose={handleCloseModal} />
        </Flex>
      }
      size="60"
      footer={
        <Group justify="flex-end" mt="sm">
          <Button
            variant="light"
            onClick={handleCloseModal}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            loading={isProcessing}
            onClick={handleConfirmBulkPayment}
            disabled={
              totalOutstanding === 0 ||
              (isInsurancePayment && requiresPreAuth && !preAuthNumber.trim())
            }
            leftSection={<IconCheck size={16} />}
            color={isInsurancePayment ? 'green' : 'blue'}
          >
            {isInsurancePayment
              ? requiresPreAuth && insuranceCoverage.patientPays === 0
                ? 'Process with Pre-Auth'
                : 'Save All to Claims'
              : `Pay ${formatCurrency(totalOutstanding)}`}
          </Button>
        </Group>
      }
    >
      <Box p="sm">
        <Alert mb="md" color="blue" icon={<IconAlertTriangle size={16} />}>
          <Text size="sm">
            Processing bulk payment for <strong>{outstandingInvestigations.length} investigations</strong>
          </Text>
        </Alert>

        {/* Outstanding Investigations Summary */}
        <Box
          style={{
            background: '#F8F9FA',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <Text size="sm" fw={600} mb="md">
            Payment Summary
          </Text>
          
          <Flex justify="space-between" mb="xs">
            <Text size="sm">Total Investigations:</Text>
            <Text size="sm" fw={600}>
              {outstandingInvestigations.length}
            </Text>
          </Flex>
          
          <Flex justify="space-between" mb="xs">
            <Text size="sm">Total Amount:</Text>
            <Text size="sm" fw={600}>
              {formatCurrency(totalOutstanding)}
            </Text>
          </Flex>

          {/* Show breakdown by payment status */}
          {outstandingInvestigations.some(inv => inv.paymentStatus === 'Partially Paid') && (
            <>
              <Divider my="xs" />
              <Text size="xs" c="dimmed" mb="xs">Breakdown by Status:</Text>
              <Flex justify="space-between" mb="xs">
                <Text size="xs">
                  Unpaid ({outstandingInvestigations.filter(inv => inv.paymentStatus === 'Unpaid').length}):
                </Text>
                <Text size="xs" c="red">
                  {formatCurrency(
                    outstandingInvestigations
                      .filter(inv => inv.paymentStatus === 'Unpaid')
                      .reduce((sum, inv) => sum + (inv.amount?.amount || 0), 0)
                  )}
                </Text>
              </Flex>
              <Flex justify="space-between">
                <Text size="xs">
                  Partial Balance ({outstandingInvestigations.filter(inv => inv.paymentStatus === 'Partially Paid').length}):
                </Text>
                <Text size="xs" c="orange">
                  {formatCurrency(
                    outstandingInvestigations
                      .filter(inv => inv.paymentStatus === 'Partially Paid')
                      .reduce((sum, inv) => {
                        const amount = inv.amount?.amount || 0;
                        const partial = (inv as any).partialAmount || 0;
                        return sum + (amount - partial);
                      }, 0)
                  )}
                </Text>
              </Flex>
            </>
          )}
        </Box>

        {/* Payment Method Selection */}
        <Box mb="md">
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
        {isInsurancePayment && (
          <Box
            style={{
              background: 'white',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #4CAF50',
            }}
            mb="md"
          >
            <Text size="sm" fw={600} c="green" mb="md">
              🛡️ Bulk Insurance Coverage Breakdown
            </Text>
            
            <Stack gap="xs">
              <Flex justify="space-between">
                <Text size="sm" fw={500}>
                  Total Amount:
                </Text>
                <Text size="sm" fw={600}>
                  {formatCurrency(totalOutstanding)}
                </Text>
              </Flex>
              
              <Flex justify="space-between">
                <Text size="sm" fw={500}>
                  Insurance Covers ({insuranceCoverage.coveragePercentage}%):
                </Text>
                <Text size="sm" fw={600} c="green">
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
            </Stack>
            
            {insuranceCoverage.patientPays === 0 && (
              <Text
                size="xs"
                c="green"
                mt="sm"
                fw={500}
                style={{ fontStyle: 'italic' }}
              >
                ✅ All investigations fully covered by insurance!
              </Text>
            )}
          </Box>
        )}

        {/* Pre-Authorization Field */}
        {isInsurancePayment && requiresPreAuth && (
          <Box>
            <TextInput
              label="Pre-Authorization Number"
              placeholder="Enter pre-auth number from insurance provider"
              value={preAuthNumber}
              onChange={(event) =>
                setPreAuthNumber(event.currentTarget.value)
              }
              required
              description="Required for investigations with 100% coverage"
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

        {/* Investigation List */}
        <Box mt="md">
          <Text size="sm" fw={600} mb="xs">
            Investigations to be Paid ({outstandingInvestigations.length})
          </Text>
          <Box
            style={{
              maxHeight: '200px',
              overflowY: 'auto',
              border: '1px solid #E9ECEF',
              borderRadius: '8px',
              padding: '8px',
            }}
          >
            <Stack gap="xs">
              {outstandingInvestigations.map((investigation, index) => {
                const amount = investigation.amount?.amount || 0;
                const partialAmount = (investigation as any).partialAmount || 0;
                const outstanding = amount - partialAmount;
                
                return (
                  <Flex
                    key={index}
                    justify="space-between"
                    align="center"
                    p="xs"
                    style={{
                      background: '#F8F9FA',
                      borderRadius: '4px',
                    }}
                  >
                    <Box flex={1}>
                      <Text size="sm" fw={500}>
                        {investigation.investigationName}
                      </Text>
                      <Badge
                        size="xs"
                        color={
                          investigation.paymentStatus === 'Partially Paid'
                            ? 'orange'
                            : 'red'
                        }
                      >
                        {investigation.paymentStatus}
                      </Badge>
                    </Box>
                    <Text size="sm" fw={600}>
                      {formatCurrency(outstanding)}
                    </Text>
                  </Flex>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Box>
    </ModalLayoutWrapper>
  );
};

export default LabBulkPaymentModal;
