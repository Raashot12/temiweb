import React, { useState, useEffect } from 'react';
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
  Checkbox,
} from '@mantine/core';
import {
  IconCheck,
  IconCash,
  IconCreditCard,
  IconShield,
  IconWallet,
} from '@tabler/icons-react';
import { InvestigationResponseList } from '@/types/index';
import { ExtendedInvestigationResponseList } from '@/types/custom';
import { formatCurrency } from '@/utils/constants';
import ModalLayoutWrapper from '@/components/shared/ModalLayoutWrapper';
import IconCloseModal from '@/components/shared/IconComponents/IconCloseModal';
import { showNotification } from '@mantine/notifications';

interface LabPaymentModalProps {
  opened: boolean;
  onClose: () => void;
  selectedInvestigation: ExtendedInvestigationResponseList | null;
  patientDetail: any;
  onPaymentSuccess: () => void;
}

// Coverage calculation based on service type
const calculateInsuranceCoverage = (investigation: InvestigationResponseList) => {
  const amount = investigation.amount?.amount || 0;
  const investigationName = investigation.investigationName?.toLowerCase() || '';

  // Service-based coverage logic
  let coveragePercentage = 0;
  let requiresPreAuth = false;

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
    requiresPreAuth = true;
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

  const insuranceCovers = (amount * coveragePercentage) / 100;
  const patientPays = amount - insuranceCovers;

  return {
    coveragePercentage,
    insuranceCovers,
    patientPays,
    requiresPreAuth,
  };
};

const LabPaymentModal: React.FC<LabPaymentModalProps> = ({
  opened,
  onClose,
  selectedInvestigation,
  patientDetail,
  onPaymentSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('wallet');
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [isPartialPayment, setIsPartialPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preAuthNumber, setPreAuthNumber] = useState('');
  const [insuranceCoverage, setInsuranceCoverage] = useState({
    coveragePercentage: 0,
    insuranceCovers: 0,
    patientPays: 0,
    requiresPreAuth: false,
  });

  const isInsurancePayment = paymentMethod === 'insurance';
  const requiresPreAuth = isInsurancePayment && insuranceCoverage.requiresPreAuth;

  // Calculate amounts
  const totalAmount = selectedInvestigation?.amount?.amount || 0;
  const partialAmount = selectedInvestigation?.partialAmount || 0;
  const outstandingBalance = totalAmount - partialAmount;
  const isPartiallyPaid = selectedInvestigation?.paymentStatus === 'Partially Paid';

  useEffect(() => {
    if (selectedInvestigation) {
      const coverage = calculateInsuranceCoverage(selectedInvestigation);
      setInsuranceCoverage(coverage);
      
      // Set initial payment amount
      if (isPartiallyPaid) {
        setPaymentAmount(outstandingBalance);
      } else {
        setPaymentAmount(totalAmount);
      }
    }
  }, [selectedInvestigation, isPartiallyPaid, outstandingBalance, totalAmount]);

  const handlePaymentMethodChange = (value: string | null) => {
    if (!value) return;
    setPaymentMethod(value);
    setPreAuthNumber('');
  };

  const handleCloseModal = () => {
    setPaymentMethod('wallet');
    setPaymentAmount(0);
    setIsPartialPayment(false);
    setPreAuthNumber('');
    setIsProcessing(false);
    onClose();
  };

  const handleConfirmPayment = async () => {
    if (!selectedInvestigation) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For insurance payments, automatically settle with insurance
      let finalPaymentStatus = 'Paid';
      let patientPaymentAmount = paymentAmount;

      if (isInsurancePayment) {
        patientPaymentAmount = insuranceCoverage.patientPays;
        // Auto-settle the insurance portion
        finalPaymentStatus = 'Paid';
      }

      // Show success notification
      showNotification({
        title: 'Payment Successful',
        message: isInsurancePayment
          ? `Patient paid ${formatCurrency(
              patientPaymentAmount
            )}. Insurance will cover ${formatCurrency(
              insuranceCoverage.insuranceCovers
            )}.`
          : `Payment of ${formatCurrency(paymentAmount)} completed successfully.`,
        color: 'green',
      });

      onPaymentSuccess();
      handleCloseModal();
    } catch (error) {
      showNotification({
        title: 'Payment Failed',
        message: 'There was an error processing the payment. Please try again.',
        color: 'red',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selectedInvestigation) return null;

  return (
    <ModalLayoutWrapper
      open={opened}
      title={
        <Flex justify="space-between" align="center">
          <Box>
            <Text fw={600}>Process Payment</Text>
            <Text c="dimmed" size="sm">
              {selectedInvestigation.investigationName} •{' '}
              {patientDetail?.patientDisplayName}
            </Text>
          </Box>
          <IconCloseModal handleClose={handleCloseModal} />
        </Flex>
      }
      size="50"
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
            <strong>{selectedInvestigation.investigationName}</strong>
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
              {formatCurrency(totalAmount)}
            </Text>
          </Flex>

          {isPartiallyPaid && (
            <>
              <Flex justify="space-between" mb="xs">
                <Text size="sm">Already Paid:</Text>
                <Text size="sm" fw={600} c="green">
                  {formatCurrency(partialAmount)}
                </Text>
              </Flex>
              <Flex justify="space-between" mb="xs">
                <Text size="sm" c="orange">
                  Outstanding Balance:
                </Text>
                <Text size="sm" fw={600} c="orange">
                  {formatCurrency(outstandingBalance)}
                </Text>
              </Flex>
            </>
          )}
        </Box>

        {/* Payment Method Selection */}
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
        {isInsurancePayment && (
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

        {/* Payment Amount Input - Only for wallet payments or if partial payment enabled */}
        {!isInsurancePayment && (
          <Box mt="md">
            <Checkbox
              label="Partial Payment"
              checked={isPartialPayment}
              onChange={(event) => setIsPartialPayment(event.currentTarget.checked)}
              mb="sm"
            />
            <NumberInput
              label="Payment Amount"
              value={paymentAmount}
              onChange={(value) => setPaymentAmount(value as number)}
              min={0}
              max={isPartiallyPaid ? outstandingBalance : totalAmount}
              disabled={!isPartialPayment && !isPartiallyPaid}
              prefix="₦"
              thousandSeparator=","
              styles={{
                input: {
                  height: '45px',
                  fontSize: '14px',
                },
              }}
            />
          </Box>
        )}
      </Box>
    </ModalLayoutWrapper>
  );
};

export default LabPaymentModal;
