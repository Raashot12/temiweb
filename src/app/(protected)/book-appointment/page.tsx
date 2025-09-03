/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Dashboard from '@/layouts/Dashboard';
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Input,
  Modal,
  ScrollArea,
  SegmentedControl,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import {
  IconAlertCircle,
  IconCalendar,
  IconCheck,
  IconClock,
  IconSearch,
  IconX,
} from '@tabler/icons-react';
import TabPanel from '@/components/shared/TabPanel';
import { statusColors } from '@/utils/constants';

// Types
type PHCService = {
  id: string;
  name: string;
  amount: number;
  description: string;
};

type AppointmentType = 'new' | 'followup';

type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

type Booking = {
  id: string;
  service: PHCService;
  appointmentType: AppointmentType;
  date: Date;
  time: string;
  status: BookingStatus;
  amountPaid: number;
  bookingDate: Date;
};

type TimeSlot = {
  id: string;
  name: string;
  isAvailable: boolean;
};

interface Patient {
  id: string;
  hospitalNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  insuranceType: 'NHIS' | 'Private' | 'Cash' | 'Company';
}

// Utils
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
    amount,
  );

const walletKey = (patientId: string) => `patient_wallet_${patientId}`;

const loadWallet = (
  patientId: string,
): { balance: number; registrationPaid: boolean } => {
  try {
    const raw =
      typeof window !== 'undefined'
        ? localStorage.getItem(walletKey(patientId))
        : null;
    if (!raw) return { balance: 0, registrationPaid: false };
    const parsed = JSON.parse(raw);
    return {
      balance: Number(parsed.balance) || 0,
      registrationPaid: Boolean(parsed.registrationPaid),
    };
  } catch {
    return { balance: 0, registrationPaid: false };
  }
};

const saveWallet = (
  patientId: string,
  data: { balance: number; registrationPaid: boolean },
) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(walletKey(patientId), JSON.stringify(data));
    }
  } catch {
    // no-op
  }
};

// Inline SearchPatient modal
function SearchPatientModal({
  opened,
  onClose,
  onSelect,
}: {
  opened: boolean;
  onClose: () => void;
  onSelect: (patient: Patient) => void;
}) {
  const [query, setQuery] = useState('');

  const patients: Patient[] = useMemo(
    () => [
      {
        id: 'p1',
        hospitalNumber: 'PM-001',
        firstName: 'Ade',
        lastName: 'Bello',
        phone: '+2348100000001',
        insuranceType: 'Cash',
      },
      {
        id: 'p2',
        hospitalNumber: 'PM-002',
        firstName: 'Chioma',
        lastName: 'Okeke',
        phone: '+2348100000002',
        insuranceType: 'NHIS',
      },
      {
        id: 'p3',
        hospitalNumber: 'PM-003',
        firstName: 'Ibrahim',
        lastName: 'Sani',
        phone: '+2348100000003',
        insuranceType: 'Private',
      },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter(
      (p) =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
        p.hospitalNumber.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q),
    );
  }, [patients, query]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap={8}>
          <IconSearch size={18} /> <Text fw={600}>Search Patient</Text>
        </Group>
      }
      size="lg"
      radius="md"
    >
      <Stack>
        <Input
          placeholder="Search by name, hospital number or phone"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
        />
        <ScrollArea h={300} type="auto">
          <Stack gap="sm">
            {filtered.map((p) => (
              <Card key={p.id} withBorder radius="md" p="md">
                <Group justify="space-between" align="center">
                  <Stack gap={2}>
                    <Text fw={600}>
                      {p.firstName} {p.lastName}{' '}
                      <Text component="span" c="dimmed">
                        ({p.hospitalNumber})
                      </Text>
                    </Text>
                    <Group gap="xs">
                      <Badge variant="light" bg="#3E8BCF" color="white">
                        {p.insuranceType}
                      </Badge>
                      <Text fw={500} fz={14} c="dimmed">
                        {p.phone}
                      </Text>
                    </Group>
                  </Stack>
                  <Button
                    size="xs"
                    onClick={() => {
                      onSelect(p);
                      onClose();
                    }}
                  >
                    Select
                  </Button>
                </Group>
              </Card>
            ))}
            {filtered.length === 0 && (
              <Group gap={8} justify="center" c="dimmed">
                <IconAlertCircle size={16} /> <Text>No patients found</Text>
              </Group>
            )}
          </Stack>
        </ScrollArea>
      </Stack>
    </Modal>
  );
}

// Main page
const ReceiptionistPage = () => {
  // Tabs
  const [currentView, setCurrentView] = useState<'book' | 'bookings'>('book');

  // Patient & wallet
  const [showSearchPatient, setShowSearchPatient] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedPatientWallet, setSelectedPatientWallet] = useState<{
    balance: number;
    registrationPaid: boolean;
  }>({ balance: 0, registrationPaid: false });
  const [hasRegistrationFee, setHasRegistrationFee] = useState(false);
  const [showRegistrationFeeModal, setShowRegistrationFeeModal] =
    useState(false);
  const [isPayingRegistrationFee, setIsPayingRegistrationFee] = useState(false);

  // Booking form
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );
  const [appointmentType, setAppointmentType] =
    useState<AppointmentType>('new');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Bookings
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const getStatusColor = (value: string) => {
    return statusColors[value] || statusColors.default;
  };
  // Services
  const phcServices: PHCService[] = useMemo(
    () => [
      {
        id: '1',
        name: 'General Consultation',
        amount: 2000,
        description: 'Basic medical examination and consultation',
      },
      {
        id: '2',
        name: 'Antenatal Care',
        amount: 3000,
        description: 'Pregnancy care and monitoring',
      },
      {
        id: '3',
        name: 'Family Planning',
        amount: 1500,
        description: 'Contraceptive services and counseling',
      },
      {
        id: '4',
        name: 'Immunization',
        amount: 1000,
        description: 'Routine and travel vaccinations',
      },
      {
        id: '5',
        name: 'Child Welfare',
        amount: 2500,
        description: 'Pediatric care and growth monitoring',
      },
      {
        id: '6',
        name: 'Malaria Treatment',
        amount: 3500,
        description: 'Malaria diagnosis and treatment',
      },
      {
        id: '7',
        name: 'Hypertension Care',
        amount: 4000,
        description: 'Blood pressure monitoring and management',
      },
      {
        id: '8',
        name: 'Diabetes Care',
        amount: 4500,
        description: 'Blood sugar monitoring and management',
      },
      {
        id: '9',
        name: 'Wound Dressing',
        amount: 1200,
        description: 'Wound care and dressing services',
      },
      {
        id: '10',
        name: 'Laboratory Tests',
        amount: 2800,
        description: 'Basic laboratory investigations',
      },
      {
        id: '11',
        name: 'Health Education',
        amount: 800,
        description: 'Health promotion and education',
      },
      {
        id: '12',
        name: 'TB Screening',
        amount: 2200,
        description: 'Tuberculosis screening and treatment',
      },
    ],
    [],
  );

  const selectedService = useMemo(
    () => phcServices.find((s) => s.id === selectedServiceId) || null,
    [phcServices, selectedServiceId],
  );

  const timeSlots: TimeSlot[] = useMemo(
    () => [
      { id: '08:00 AM', name: '08:00 AM', isAvailable: true },
      { id: '10:00 AM', name: '10:00 AM', isAvailable: true },
      { id: '12:00 PM', name: '12:00 PM', isAvailable: false },
      { id: '02:00 PM', name: '02:00 PM', isAvailable: true },
      { id: '04:00 PM', name: '04:00 PM', isAvailable: true },
    ],
    [],
  );

  // Effects
  useEffect(() => {
    // mock booking
    setBookings([
      {
        id: '1',
        service: phcServices[0],
        appointmentType: 'new',
        date: new Date(),
        time: '10:00 AM',
        status: 'confirmed',
        amountPaid: 2000,
        bookingDate: new Date(),
      },
    ]);
  }, [phcServices]);

  useEffect(() => {
    if (selectedPatient) {
      const w = loadWallet(selectedPatient.id);
      setSelectedPatientWallet(w);
      setHasRegistrationFee(w.registrationPaid);
    } else {
      setSelectedPatientWallet({ balance: 0, registrationPaid: false });
      setHasRegistrationFee(false);
    }
  }, [selectedPatient]);

  // Derived
  const appointmentCost = useMemo(() => {
    if (!selectedService) return 0;
    return appointmentType === 'followup'
      ? selectedService.amount * 0.5
      : selectedService.amount;
  }, [selectedService, appointmentType]);

  // Handlers
  const handleRegistrationFeePayment = async () => {
    const REG_FEE = 200;
    if (!selectedPatient) return;
    if (selectedPatientWallet.balance < REG_FEE) {
      // keep modal open, show nothing (user can cancel)
      return;
    }
    setIsPayingRegistrationFee(true);
    try {
      const newData = {
        balance: selectedPatientWallet.balance - REG_FEE,
        registrationPaid: true,
      };
      saveWallet(selectedPatient.id, newData);
      setSelectedPatientWallet(newData);
      setHasRegistrationFee(true);
      setShowRegistrationFeeModal(false);
    } finally {
      setIsPayingRegistrationFee(false);
    }
  };

  const handleBookAppointment = () => {
    if (!selectedService || !selectedTime || !selectedDate) return;
    if (!selectedPatient) {
      setShowSearchPatient(true);
      return;
    }

    // require registration for new patients
    if (appointmentType === 'new' && !hasRegistrationFee) {
      setShowRegistrationFeeModal(true);
      return;
    }

    if (
      appointmentType === 'new' &&
      selectedPatientWallet.balance < appointmentCost
    ) {
      // not enough funds
      return;
    }

    // deduct for new visit
    if (appointmentType === 'new') {
      const newData = {
        balance: selectedPatientWallet.balance - appointmentCost,
        registrationPaid: selectedPatientWallet.registrationPaid,
      };
      saveWallet(selectedPatient.id, newData);
      setSelectedPatientWallet(newData);
    }

    const booking: Booking = {
      id: Date.now().toString(),
      service: selectedService,
      appointmentType,
      date: selectedDate,
      time: selectedTime,
      status: 'confirmed',
      amountPaid: appointmentType === 'new' ? appointmentCost : 0,
      bookingDate: new Date(),
    };

    setBookings((prev) => [booking, ...prev]);
    // reset
    setSelectedServiceId(null);
    setAppointmentType('new');
    setSelectedDate(new Date());
    setSelectedTime('');
    setShowSuccessModal(true);
    setCurrentView('bookings');
  };

  return (
    <Dashboard title="Appointments">
      <Box p="md">
        {/* Header */}
        <Group justify="space-between" mb="md">
          <Title order={3}>Book Appointment</Title>
        </Group>

        <Stack gap="md">
          {/* Patient */}
          <Card withBorder radius="md" p="md">
            <Group justify="space-between" align="center">
              <Stack gap={4}>
                <Text fw={600}>Patient</Text>
                {selectedPatient ? (
                  <Group gap="xs" wrap="wrap">
                    <Text fw={500} fz={15}>
                      {selectedPatient.firstName} {selectedPatient.lastName} (
                      {selectedPatient.hospitalNumber})
                    </Text>
                    <Badge color="#3E8BCF" variant="filled">
                      Wallet: {formatCurrency(selectedPatientWallet.balance)}
                    </Badge>
                    {!hasRegistrationFee && (
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
                          border: `1px solid ${getStatusColor('Registration fee not paid').border}`,
                          color: getStatusColor('Registration fee not paid')
                            .color,
                          background: getStatusColor(
                            'Registration fee not paid',
                          ).bg,
                        }}
                      >
                        Registration fee not paid
                      </Text>
                    )}
                  </Group>
                ) : (
                  <Text c="dimmed" size="sm">
                    Select patient to continue
                  </Text>
                )}
              </Stack>
              <Group>
                <Button
                  variant="light"
                  leftSection={<IconSearch size={16} />}
                  onClick={() => setShowSearchPatient(true)}
                >
                  {selectedPatient ? 'Change' : 'Select'}
                </Button>
              </Group>
            </Group>
          </Card>

          {/* Service */}
          <Card withBorder radius="md" p="md">
            <Stack gap="sm">
              <Text fw={600}>Select PHC Service</Text>
              <Select
                placeholder="Choose a service"
                value={selectedServiceId}
                onChange={setSelectedServiceId}
                data={phcServices.map((s) => ({
                  value: s.id,
                  label: `${s.name} — ${formatCurrency(s.amount)}`,
                }))}
                searchable
                nothingFoundMessage="No service found"
              />
            </Stack>
          </Card>

          {/* Appointment type */}
          <Card withBorder radius="md" p="md">
            <Stack gap="sm">
              <Text fw={600}>Appointment Type</Text>
              <SegmentedControl
                value={appointmentType}
                onChange={(v: string) => setAppointmentType(v as AppointmentType)}
                data={[
                  { label: 'New Visit (Full fee)', value: 'new' },
                  { label: 'Follow-up (50%)', value: 'followup' },
                ]}
                color="#3E8BCF"
              />
              {selectedService && (
                <Group
                  justify="space-between"
                  bg="blue.6"
                  c="white"
                  p="md"
                  style={{ borderRadius: 12 }}
                >
                  <Text fw={600}>Appointment Cost</Text>
                  <Text fw={700}>{formatCurrency(appointmentCost)}</Text>
                </Group>
              )}
            </Stack>
          </Card>

          {/* Date & time */}
          <Card withBorder radius="md" p="md">
            <Stack gap="sm">
              <Text fw={600}>Preferred Date</Text>
              <DatePickerInput
                leftSection={<IconCalendar size={16} />}
                placeholder="Pick date"
                value={selectedDate}
                onChange={setSelectedDate}
                minDate={new Date()}
              />

              <Divider my="xs" />
              <Text fw={600}>Available Time</Text>
              <TabPanel
                tabPanel={timeSlots}
                scrollable={false}
                handleTabChange={(value) => setSelectedTime(value)}
                color="#EFF1F4"
                buttonElement={true}
              />
            </Stack>
          </Card>

          <Group justify="flex-end" mt="md">
            <Button
              onClick={handleBookAppointment}
              disabled={!selectedService || !selectedTime || !selectedDate}
            >
              Book Appointment
            </Button>
          </Group>
        </Stack>

        {/* Modals */}
        <SearchPatientModal
          opened={showSearchPatient}
          onClose={() => setShowSearchPatient(false)}
          onSelect={(p) => setSelectedPatient(p)}
        />

        <Modal
          opened={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          radius="md"
          title={
            <Group gap={8}>
              <IconCheck size={18} /> <Text fw={600}>Appointment Booked!</Text>
            </Group>
          }
        >
          <Stack gap="sm">
            <Text>
              Your appointment has been successfully booked. Check your SMS or
              email for booking details.
            </Text>
            <Group justify="end">
              <Button
                onClick={() => {
                  setShowSuccessModal(false);
                  setCurrentView('bookings');
                }}
              >
                View Bookings
              </Button>
            </Group>
          </Stack>
        </Modal>

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
                    {formatCurrency(selectedPatientWallet.balance)}
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

        <Modal
          opened={showBookingDetails}
          onClose={() => setShowBookingDetails(false)}
          radius="md"
          title={<Text fw={600}>Booking Details</Text>}
          size="lg"
        >
          {selectedBooking && (
            <Stack>
              <Group justify="space-between">
                <Text fw={600}>Service</Text>
                <Text>{selectedBooking.service.name}</Text>
              </Group>
              <Group justify="space-between">
                <Text fw={600}>Description</Text>
                <Text ta="right" maw={420}>
                  {selectedBooking.service.description}
                </Text>
              </Group>
              <Group justify="space-between">
                <Text fw={600}>Appointment Type</Text>
                <Text>
                  {selectedBooking.appointmentType === 'new'
                    ? 'New Visit'
                    : 'Follow-up Visit'}
                </Text>
              </Group>
              <Group justify="space-between">
                <Text fw={600}>Date & Time</Text>
                <Text>
                  {selectedBooking.date.toLocaleDateString('en-NG', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  at {selectedBooking.time}
                </Text>
              </Group>
              <Group justify="space-between" align="center">
                <Text fw={600}>Status</Text>
                <Badge
                  color={
                    selectedBooking.status === 'confirmed'
                      ? 'green'
                      : selectedBooking.status === 'pending'
                        ? 'yellow'
                        : 'red'
                  }
                  variant="light"
                >
                  {selectedBooking.status.toUpperCase()}
                </Badge>
              </Group>
              {selectedBooking.amountPaid > 0 && (
                <Group justify="space-between">
                  <Text fw={600}>Amount Paid</Text>
                  <Text>{formatCurrency(selectedBooking.amountPaid)}</Text>
                </Group>
              )}
              <Group justify="space-between">
                <Text fw={600}>Booking ID</Text>
                <Text>{selectedBooking.id}</Text>
              </Group>
            </Stack>
          )}
        </Modal>
      </Box>
    </Dashboard>
  );
};

export default ReceiptionistPage;
