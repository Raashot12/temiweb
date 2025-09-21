import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Flex,
  Text,
  TextInput,
  Autocomplete,
  Button,
  Divider,
  Group,
  Stack,
  Avatar,
  Badge,
  ActionIcon,
} from '@mantine/core';
import { IconSearch, IconPlus, IconUser } from '@tabler/icons-react';
import ModalLayoutWrapper from '@/components/shared/ModalLayoutWrapper';
import IconCloseModal from '@/components/shared/IconComponents/IconCloseModal';
import { showNotification } from '@mantine/notifications';
import { appColors } from '@/theme/colors';
import LabInvestigationRequest from './LabInvestigationRequest';
import AddPatientModal from './AddPatientModal';

// Types
interface Patient {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  hospitalId?: string;
  dateOfBirth?: string;
}

interface Doctor {
  id: number;
  name: string;
  email: string;
}

interface RequestInvestigationModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const RequestInvestigationModal: React.FC<RequestInvestigationModalProps> = ({
  opened,
  onClose,
  onSubmit,
}) => {
  // State management
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [doctorEmail, setDoctorEmail] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [addPatientModalOpened, setAddPatientModalOpened] = useState(false);
  const [activePills, setActivePills] = useState<any[]>([]);
  const [investigationNote, setInvestigationNote] = useState('');

  // Mock patient data - replace with actual API call
  const mockPatients: Patient[] = useMemo(
    () => [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+234 801 234 5678',
        hospitalId: 'HTL001',
        dateOfBirth: '1990-05-15',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        phone: '+234 802 345 6789',
        hospitalId: 'HTL002',
        dateOfBirth: '1985-08-22',
      },
      {
        id: 3,
        name: 'Michael Johnson',
        email: 'michael.j@email.com',
        phone: '+234 803 456 7890',
        hospitalId: 'HTL003',
        dateOfBirth: '1992-11-30',
      },
    ],
    [],
  );

  // Handle patient search
  useEffect(() => {
    if (!patientSearchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate API delay
    const timeoutId = setTimeout(() => {
      const filteredPatients = mockPatients.filter(
        (patient) =>
          patient.name
            .toLowerCase()
            .includes(patientSearchQuery.toLowerCase()) ||
          patient.hospitalId
            ?.toLowerCase()
            .includes(patientSearchQuery.toLowerCase()) ||
          patient.email
            ?.toLowerCase()
            .includes(patientSearchQuery.toLowerCase()),
      );
      setSearchResults(filteredPatients);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [patientSearchQuery, mockPatients]);

  // Handle patient selection
  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setPatientSearchQuery(patient.name);
    setSearchResults([]);
  };

  // Handle add new patient
  const handleAddNewPatient = (newPatient: Patient) => {
    setSelectedPatient(newPatient);
    setPatientSearchQuery(newPatient.name);
    setAddPatientModalOpened(false);
    showNotification({
      title: 'Success',
      message: 'Patient added successfully',
      color: 'green',
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedPatient) {
      showNotification({
        title: 'Error',
        message: 'Please select a patient',
        color: 'red',
      });
      return;
    }

    if (!doctorName.trim()) {
      showNotification({
        title: 'Error',
        message: 'Please enter doctor name',
        color: 'red',
      });
      return;
    }

    if (activePills.length === 0) {
      showNotification({
        title: 'Error',
        message: 'Please select at least one investigation',
        color: 'red',
      });
      return;
    }

    // Prepare submission data
    const submissionData = {
      patient: selectedPatient,
      doctor: {
        name: doctorName,
        email: doctorEmail,
      },
      investigations: activePills,
      notes: investigationNote,
      requestedAt: new Date().toISOString(),
      status: 'Requested',
      paymentStatus: 'Unpaid',
    };

    onSubmit(submissionData);
    handleClose();
  };

  // Handle modal close
  const handleClose = () => {
    setSelectedPatient(null);
    setPatientSearchQuery('');
    setDoctorName('');
    setDoctorEmail('');
    setSearchResults([]);
    setActivePills([]);
    setInvestigationNote('');
    onClose();
  };

  // Format patient option for autocomplete
  const formatPatientOption = (patient: Patient) => ({
    value: patient.name,
    label: patient.name,
    patient: patient,
  });

  const modalTitle = (
    <Flex justify="space-between" align="center" w="100%">
      <Box>
        <Text size="xl" fw={600} c="#051438">
          Request Investigation
        </Text>
        <Text size="sm" c="#6B7280" mt={4}>
          Create walk-in investigation request for laboratory processing
        </Text>
      </Box>
      <ActionIcon
        variant="subtle"
        size="lg"
        onClick={handleClose}
        style={{ cursor: 'pointer' }}
      >
        <IconCloseModal />
      </ActionIcon>
    </Flex>
  );

  return (
    <>
      <ModalLayoutWrapper
        open={opened}
        title={modalTitle}
        size="95"
        height="80vh"
        footer={
          <Group justify="flex-end" mt={32} gap={16}>
            <Button variant="outline" onClick={handleClose} size="md">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              size="md"
              disabled={
                !selectedPatient ||
                !doctorName.trim() ||
                activePills.length === 0
              }
            >
              Submit Request
            </Button>
          </Group>
        }
      >
        <Box py={20}>
          {/* Patient Search Section */}
          <Stack gap={20}>
            <Box>
              <Text size="md" fw={500} mb={8} c="#051438">
                Patient Information
              </Text>
              <Divider mb={16} />

              <Stack gap={16}>
                {/* Patient Search */}
                <Box>
                  <Text size="sm" fw={500} mb={8} c="#374151">
                    Search Patient
                  </Text>
                  <Autocomplete
                    placeholder="Search by name, hospital ID, or email"
                    value={patientSearchQuery}
                    onChange={setPatientSearchQuery}
                    data={searchResults.map((p) => p.name)}
                    leftSection={<IconSearch size={16} />}
                    limit={5}
                    onOptionSubmit={(value: string) => {
                      const patient = searchResults.find(
                        (p) => p.name === value,
                      );
                      if (patient) {
                        handlePatientSelect(patient);
                      }
                    }}
                    styles={{
                      input: {
                        fontSize: 14,
                        padding: '12px 16px',
                        borderColor: selectedPatient
                          ? appColors.green
                          : '#D1D5DB',
                      },
                    }}
                  />

                  {/* Search Results Display */}
                  {isSearching && (
                    <Text size="sm" c="dimmed" mt={8}>
                      Searching...
                    </Text>
                  )}

                  {searchResults.length > 0 && !selectedPatient && (
                    <Box mt={8}>
                      <Text size="sm" fw={500} mb={8}>
                        Search Results:
                      </Text>
                      <Stack gap={8}>
                        {searchResults.slice(0, 5).map((patient) => (
                          <Box
                            key={patient.id}
                            p={12}
                            style={{
                              backgroundColor: '#F9FAFB',
                              border: '1px solid #E5E7EB',
                              borderRadius: 6,
                              cursor: 'pointer',
                            }}
                            onClick={() => handlePatientSelect(patient)}
                          >
                            <Group gap={12}>
                              <Avatar size={32} radius="xl">
                                <IconUser size={16} />
                              </Avatar>
                              <Box flex={1}>
                                <Text size="sm" fw={500}>
                                  {patient.name}
                                </Text>
                                <Text size="xs" c="dimmed">
                                  {patient.hospitalId} • {patient.email}
                                </Text>
                              </Box>
                            </Group>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  )}

                  {/* No results found - Add Patient option */}
                  {patientSearchQuery.trim() &&
                    searchResults.length === 0 &&
                    !isSearching && (
                      <Box mt={8}>
                        <Text size="sm" c="dimmed" mb={8}>
                          Patient not found in system
                        </Text>
                        <Button
                          variant="outline"
                          size="sm"
                          leftSection={<IconPlus size={16} />}
                          onClick={() => setAddPatientModalOpened(true)}
                        >
                          Add New Patient
                        </Button>
                      </Box>
                    )}
                </Box>

                {/* Selected Patient Display */}
                {selectedPatient && (
                  <Box
                    p={16}
                    style={{
                      backgroundColor: '#F0FDF4',
                      border: '1px solid #BBF7D0',
                      borderRadius: 8,
                    }}
                  >
                    <Group gap={12}>
                      <Avatar size={40} radius="xl" color="green">
                        <IconUser size={20} />
                      </Avatar>
                      <Box flex={1}>
                        <Text size="sm" fw={600} c="#059669">
                          {selectedPatient.name}
                        </Text>
                        <Text size="xs" c="#065F46">
                          {selectedPatient.hospitalId} • {selectedPatient.email}
                        </Text>
                        {selectedPatient.phone && (
                          <Text size="xs" c="#065F46">
                            {selectedPatient.phone}
                          </Text>
                        )}
                      </Box>
                      <Badge color="green" variant="light">
                        Selected
                      </Badge>
                    </Group>
                  </Box>
                )}
              </Stack>
            </Box>

            {/* Doctor Information Section */}
            <Box>
              <Text size="md" fw={500} mb={8} c="#051438">
                Requesting Doctor Information
              </Text>
              <Divider mb={16} />

              <Group grow>
                <TextInput
                  label="Doctor Name"
                  placeholder="Enter doctor's name"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  required
                  styles={{
                    label: { fontWeight: 500, marginBottom: 8 },
                    input: { fontSize: 14, padding: '12px 16px' },
                  }}
                />
                <TextInput
                  label="Doctor Email"
                  placeholder="Enter doctor's email (optional)"
                  value={doctorEmail}
                  onChange={(e) => setDoctorEmail(e.target.value)}
                  styles={{
                    label: { fontWeight: 500, marginBottom: 8 },
                    input: { fontSize: 14, padding: '12px 16px' },
                  }}
                />
              </Group>
            </Box>

            {/* Investigation Request Section */}
            <Box>
              <Text size="md" fw={500} mb={8} c="#051438">
                Investigation Requests
              </Text>
              <Divider mb={16} />

              {/* Investigation Request Component */}
              <LabInvestigationRequest
                activePills={activePills}
                setActivePills={setActivePills}
                investigationNote={investigationNote}
                setInvestigationNote={setInvestigationNote}
              />
            </Box>
          </Stack>
        </Box>
      </ModalLayoutWrapper>

      {/* Add Patient Modal - Temporarily commented out */}
      <AddPatientModal
        opened={addPatientModalOpened}
        onClose={() => setAddPatientModalOpened(false)}
        onSubmit={handleAddNewPatient}
      />
    </>
  );
};

export default RequestInvestigationModal;
