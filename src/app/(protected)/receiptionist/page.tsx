/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useMemo, useState } from 'react';
import Dashboard from '@/layouts/Dashboard';
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Menu,
  Modal,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import ReceptionistHeader from './components/ReceptionistHeader';
import {
  TableGrid,
  TableGridColumn,
} from '@/components/shared/GridTableLayout';
import { statusColors } from '@/utils/constants';
import { IconThreeDots } from '@/components/shared/IconComponents/IconThreeDots';
import IconUserGray from '@/components/shared/IconComponents/IconUserGray';
import {
  IconTimelineEvent,
  IconAlertCircle,
  IconCheck,
  IconX,
} from '@tabler/icons-react';
import AddPatientModal from '@/components/shared/AddPatientModal';

// Types
type PatientInfo = {
  fullName: string;
  age: number;
  walletBalance: number;
  hasInsurance: boolean;
  insuranceType: string | null;
  hasPaidRegistrationFee: boolean;
  weight: number; // in kg
  height: number; // in meters
};

type Appointment = {
  patientInfo: PatientInfo;
  patientId: string;
  time: string | null;
  date: Date | null;
  status: 'Scheduled' | 'Checked-in' | 'Not scheduled';
};

const ReceiptionistPage = () => {
  // Today's appointments (mock data)
  const initialAppointments: Appointment[] = useMemo(
    () => [
      {
        patientInfo: {
          fullName: 'Mustafa Oladimeji',
          age: 29,
          walletBalance: 6500,
          hasInsurance: true,
          insuranceType: 'NHIS',
          hasPaidRegistrationFee: true,
          weight: 75,
          height: 1.78,
        },
        patientId: 'NG-LA01-2507-00123',
        time: '7:00 AM',
        date: new Date(),
        status: 'Scheduled',
      },
      {
        patientInfo: {
          fullName: 'Abida Musa',
          age: 34,
          walletBalance: 12000,
          hasInsurance: false,
          insuranceType: null,
          hasPaidRegistrationFee: true,
          weight: 68,
          height: 1.65,
        },
        patientId: 'NG-LA01-2507-00124',
        time: '9:30 AM',
        date: new Date(),
        status: 'Scheduled',
      },
      {
        patientInfo: {
          fullName: 'Chijoke Umeh',
          age: 41,
          walletBalance: 800,
          hasInsurance: false,
          insuranceType: null,
          hasPaidRegistrationFee: false,
          weight: 82,
          height: 1.72,
        },
        patientId: 'NG-LA01-2507-00125',
        time: null,
        date: null,
        status: 'Not scheduled',
      },
      {
        patientInfo: {
          fullName: 'Lilian Peters',
          age: 27,
          walletBalance: 3000,
          hasInsurance: true,
          insuranceType: 'Axa Mansard',
          hasPaidRegistrationFee: true,
          weight: 60,
          height: 1.68,
        },
        patientId: 'NG-LA01-2507-00126',
        time: '10:30 AM',
        date: new Date(),
        status: 'Scheduled',
      },
      {
        patientInfo: {
          fullName: 'Rasheed Iskilu',
          age: 36,
          walletBalance: 0,
          hasInsurance: false,
          insuranceType: null,
          hasPaidRegistrationFee: false,
          weight: 79,
          height: 1.75,
        },
        patientId: 'NG-LA01-4007-00126',
        time: null,
        date: null,
        status: 'Not scheduled',
      },
    ],
    [],
  );
  const menuListItems = [
    { value: 'Book Appointment', key: 'book' },
    { value: 'View Appointment', key: 'view' },
    { value: 'Check-in', key: 'check-in' },
    { value: 'Cancel Appointment', key: 'cancel' },
  ];
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  // Registration modal flow
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showNextOfKinModal, setShowNextOfKinModal] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const getStatusColor = (value: string) => {
    return statusColors[value] || statusColors.default;
  };
  // currency formatter for wallet display
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-NG', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  const REGISTRATION_FEE = 200;
  // Simple form fields (minimal placeholders)
  const [patientFirstName, setPatientFirstName] = useState('');
  const [patientLastName, setPatientLastName] = useState('');
  const [nokName, setNokName] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');

  // Registration fee modal state
  const [showRegistrationFeeModal, setShowRegistrationFeeModal] =
    useState(false);
  const [isPayingRegistrationFee, setIsPayingRegistrationFee] = useState(false);
  const [selectedRegPatient, setSelectedRegPatient] =
    useState<Appointment | null>(null);

  const handleCheckIn = (patientId: string) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.patientId === patientId ? { ...a, status: 'Checked-in' } : a,
      ),
    );
  };

  const resetRegistration = () => {
    setPatientFirstName('');
    setPatientLastName('');
    setNokName('');
    setInsuranceProvider('');
  };

  const handleSubmitRegistrationForm = () => {
    // Here you'd call your API. We'll just close all modals.
    setShowInsuranceModal(false);
    resetRegistration();
  };

  const handleRegistrationFeePayment = async () => {
    setIsPayingRegistrationFee(true);
    // Simulate API call
    setTimeout(() => {
      setAppointments((prev) => {
        if (!selectedRegPatient) return prev;
        return prev.map((appt) => {
          if (appt.patientId !== selectedRegPatient.patientId) return appt;
          const newBalance = Math.max(
            0,
            appt.patientInfo.walletBalance - REGISTRATION_FEE,
          );
          return {
            ...appt,
            patientInfo: {
              ...appt.patientInfo,
              walletBalance: newBalance,
              hasPaidRegistrationFee: true,
            },
          };
        });
      });
      setIsPayingRegistrationFee(false);
      setShowRegistrationFeeModal(false);
      setSelectedRegPatient(null);
    }, 800);
  };

  const columns: TableGridColumn<Appointment>[] = [
    {
      label: 'Name',
      span: 3,
      justify: 'center',
      render: (a) => (
        <Box>
          <Group>
            <IconUserGray size={28} />
            <Text fw={600} style={{ whiteSpace: 'nowrap' }}>
              {a.patientInfo.fullName}
            </Text>
          </Group>
          <Group gap={5}>
            <>
              {a.patientInfo.insuranceType && (
                <Badge
                  fz="12px"
                  c="white"
                  style={{ textTransform: 'capitalize' }}
                  fw={500}
                >
                  Insurance: {a.patientInfo.insuranceType}
                </Badge>
              )}
              {a.patientInfo.insuranceType && ' • '}
            </>
            <Badge
              fz="12px"
              c="white"
              style={{ textTransform: 'capitalize' }}
              fw={500}
            >
              Wallet balance: {formatCurrency(a.patientInfo.walletBalance)}
            </Badge>
            •
            {/* <Badge
              fz="12px"
              c="white"
              style={{ textTransform: 'capitalize' }}
              color={a.patientInfo.hasPaidRegistrationFee ? 'green' : 'red'}
              variant='filled'
              fw={500}
            >
              Reg: {a.patientInfo.hasPaidRegistrationFee ? 'Paid' : 'Unpaid'}
            </Badge> */}
            <Text
              py={4}
              px={8}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                lineHeight: '14px',
                textOverflow: 'ellipsis',
                borderRadius: '16px',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                border: `1px solid ${getStatusColor(a.patientInfo.hasPaidRegistrationFee ? 'Paid' : 'Unpaid').border}`,
                color: getStatusColor(
                  a.patientInfo.hasPaidRegistrationFee ? 'Paid' : 'Unpaid',
                ).color,
                background: getStatusColor(
                  a.patientInfo.hasPaidRegistrationFee ? 'Paid' : 'Unpaid',
                ).bg,
              }}
            >
              Reg: {a.patientInfo.hasPaidRegistrationFee ? 'Paid' : 'Unpaid'}
            </Text>
          </Group>
        </Box>
      ),
    },
    {
      label: 'Patient ID',
      justify: 'center',
      span: 3,
      render: (a) => (
        <Text size="sm" c="dimmed" fw={500}>
          {a.patientId}
        </Text>
      ),
    },
    {
      label: 'Time',
      justify: 'center',
      span: 3,
      render: (a) => (
        <>
          {!a.time && !a.date ? (
            <Text size="sm" c="dimmed" fw={500}>
              -----
            </Text>
          ) : (
            <Group gap={5}>
              <IconTimelineEvent color="#3E8BCF" />
              <Text py={6} px={8} fw={500} lineClamp={1}>
                {a.time ? a.time : ''}
                {a.date ? ` ${formatDate(a.date)}` : ''}
              </Text>
            </Group>
          )}
        </>
      ),
    },
    {
      label: 'Status',
      justify: 'center',
      span: 2,
      render: (a) => (
        <Text
          py={6}
          px={8}
          style={{
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '14px',
            width: 120,
            height: 'auto',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            borderRadius: '10px',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            border: `1px solid ${getStatusColor(a.status).border}`,
            color: getStatusColor(a.status).color,
            background: getStatusColor(a.status).bg,
          }}
        >
          {a.status}
        </Text>
      ),
    },
    {
      label: 'Action',
      span: 1,
      thJustify: 'flex-end',
      justify: 'center',
      align: 'flex-end',
      render: (a) => {
        return (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <button
                style={{
                  display: 'block',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
                onClick={() => {}}
              >
                <IconThreeDots />
              </button>
            </Menu.Target>
            <Menu.Dropdown>
              <>
                {a.status !== 'Checked-in' && (
                  <>
                    {a.patientInfo?.hasPaidRegistrationFee && (
                      <Menu.Item
                        fw={600}
                        disabled={a.status === 'Scheduled'}
                        style={{ fontSize: 14 }}
                        onClick={() => {
                          if (a.status === 'Scheduled') {
                            handleCheckIn(a.patientId);
                          }
                        }}
                      >
                        Create Appointment
                      </Menu.Item>
                    )}

                    {!a.patientInfo?.hasPaidRegistrationFee && (
                      <Menu.Item
                        fw={600}
                        // disabled={a.status === 'Checked-in'}
                        onClick={() => {
                          setSelectedRegPatient(a);
                          setShowRegistrationFeeModal(true);
                        }}
                      >
                        Pay Registration Fee
                      </Menu.Item>
                    )}
                    {a.patientInfo?.hasPaidRegistrationFee && (
                      <Menu.Item
                        fw={600}
                        disabled={a.status === 'Not scheduled'}
                        style={{ fontSize: 14 }}
                        onClick={() => {
                          if (a.status === 'Scheduled') {
                            handleCheckIn(a.patientId);
                          }
                        }}
                      >
                        Check-in
                      </Menu.Item>
                    )}
                  </>
                )}
              </>
              <Menu.Item fw={600} style={{ fontSize: 14 }} onClick={() => {}}>
                View patient info
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        );
      },
    },
  ];

  return (
    <Dashboard title="Reception">
      <Box p="md">
        {/* Actions */}
        {/* <Group justify="space-between" mb="md"> */}
        {/* <Title order={3}>Reception</Title>
          <Group>
            <Button onClick={() => setShowPatientModal(true)}>Register New Patient</Button>
            <Button variant="light">Check-in Patient</Button>
          </Group>
        </Group> */}
        <ReceptionistHeader
          totalItems={appointments.length}
          onPaginationChange={() => {}}
          setShowAddPatientModal={setShowAddPatientModal}
          
        />

        {/* Today's Appointments */}
        <Stack gap="sm">
          <Group justify="space-between" align="center">
            <Text fw={600}>Today's Appointments</Text>
          </Group>
          <TableGrid columns={columns} data={appointments} rowKey="patientId" />
        </Stack>

        {/* Patient Information Modal */}
        <Modal
          opened={showPatientModal}
          onClose={() => setShowPatientModal(false)}
          title={<Text fw={600}>Patient Information</Text>}
          radius="md"
          size="lg"
        >
          {/* <ScrollArea h={360} type="auto"> */}
          <Stack gap="sm">
            <TextInput
              label="First name"
              placeholder="e.g. Ade"
              value={patientFirstName}
              onChange={(e) => setPatientFirstName(e.currentTarget.value)}
            />
            <TextInput
              label="Last name"
              placeholder="e.g. Bello"
              value={patientLastName}
              onChange={(e) => setPatientLastName(e.currentTarget.value)}
            />
            <Group justify="end" mt="sm">
              <Button
                onClick={() => {
                  setShowPatientModal(false);
                  setShowNextOfKinModal(true);
                }}
              >
                Next: Next of Kin
              </Button>
            </Group>
          </Stack>
          {/* </ScrollArea> */}
        </Modal>

        {/* Next of Kin Modal */}
        <Modal
          opened={showNextOfKinModal}
          onClose={() => {
            setShowPatientModal(true);
            setShowNextOfKinModal(false);
          }}
          title={<Text fw={600}>Next of Kin</Text>}
          radius="md"
          size="lg"
        >
          <ScrollArea h={360} type="auto">
            <Stack gap="sm">
              <TextInput
                label="Full name"
                placeholder="e.g. Chioma Okeke"
                value={nokName}
                onChange={(e) => setNokName(e.currentTarget.value)}
              />
              <Group justify="space-between" mt="sm">
                <Button
                  variant="light"
                  onClick={() => {
                    setShowPatientModal(true);
                    setShowNextOfKinModal(false);
                  }}
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    setShowNextOfKinModal(false);
                    setShowInsuranceModal(true);
                  }}
                >
                  Next: Insurance
                </Button>
              </Group>
            </Stack>
          </ScrollArea>
        </Modal>

        {/* Insurance Information Modal */}
        <Modal
          opened={showInsuranceModal}
          onClose={() => {
            setShowNextOfKinModal(true);
            setShowInsuranceModal(false);
          }}
          title={<Text fw={600}>Insurance Information</Text>}
          radius="md"
          size="lg"
        >
          <ScrollArea h={360} type="auto">
            <Stack gap="sm">
              <TextInput
                label="Insurance Provider"
                placeholder="e.g. NHIS, Private, Company"
                value={insuranceProvider}
                onChange={(e) => setInsuranceProvider(e.currentTarget.value)}
              />
              <Group justify="space-between" mt="sm">
                <Button
                  variant="light"
                  onClick={() => {
                    setShowNextOfKinModal(true);
                    setShowInsuranceModal(false);
                  }}
                >
                  Back
                </Button>
                <Button onClick={handleSubmitRegistrationForm}>
                  Submit Registration
                </Button>
              </Group>
            </Stack>
          </ScrollArea>
        </Modal>

        {/* Registration Fee Modal */}
        <Modal
          opened={showRegistrationFeeModal}
          onClose={() => setShowRegistrationFeeModal(false)}
          radius="md"
          title={
            <Group gap={8}>
              <IconAlertCircle size={18} />{' '}
              <Text fw={600}>Registration Required</Text>
            </Group>
          }
        >
          <Stack>
            <Group justify="center">
              <IconCheck size={48} color="#4F46E5" />
            </Group>
            <Title order={5}>Welcome to Our EMR System</Title>
            <Text c="dimmed">
              As a new patient, you need to pay a one-time registration fee to
              access our services.
            </Text>

            <Card withBorder radius="md" p="md">
              <Stack gap={6}>
                <Group justify="space-between">
                  <Text fw={500}>Registration Fee:</Text>
                  <Text>₦200</Text>
                </Group>
                <Group justify="space-between">
                  <Text fw={500}>Wallet Balance:</Text>
                  <Text c="teal">
                    {formatCurrency(
                      selectedRegPatient?.patientInfo.walletBalance ?? 0,
                    )}
                  </Text>
                </Group>
              </Stack>
            </Card>

            <Group justify="space-between" mt="sm">
              <Button
                variant="light"
                leftSection={<IconX size={16} />}
                onClick={() => setShowRegistrationFeeModal(false)}
              >
                Cancel
              </Button>
              <Button
                loading={isPayingRegistrationFee}
                onClick={handleRegistrationFeePayment}
              >
                Pay Registration Fee
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Box>
      <AddPatientModal
        opened={showAddPatientModal}
        onClose={() => setShowAddPatientModal(false)}
      />
    </Dashboard>
  );
};

export default ReceiptionistPage;
