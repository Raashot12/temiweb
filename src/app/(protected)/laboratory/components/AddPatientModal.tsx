import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  TextInput,
  Button,
  Group,
  Stack,
  ActionIcon,
  Divider,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconUser, IconCalendar } from '@tabler/icons-react';
import ModalLayoutWrapper from '@/components/shared/ModalLayoutWrapper';
import IconCloseModal from '@/components/shared/IconComponents/IconCloseModal';
import { showNotification } from '@mantine/notifications';

// Types
interface Patient {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  hospitalId?: string;
  dateOfBirth?: string;
}

interface AddPatientModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (patient: Patient) => void;
}

const AddPatientModal: React.FC<AddPatientModalProps> = ({
  opened,
  onClose,
  onSubmit,
}) => {
  // State management
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: null as Date | null,
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate unique hospital ID
  const generateHospitalId = (): string => {
    const prefix = 'HTL';
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `${prefix}${number}`;
  };

  // Validate form
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      showNotification({
        title: 'Validation Error',
        message: 'Patient name is required',
        color: 'red',
      });
      return false;
    }

    if (!formData.dateOfBirth) {
      showNotification({
        title: 'Validation Error',
        message: 'Date of birth is required',
        color: 'red',
      });
      return false;
    }

    if (!formData.phone.trim()) {
      showNotification({
        title: 'Validation Error',
        message: 'Phone number is required',
        color: 'red',
      });
      return false;
    }

    // Basic phone validation
    const phoneRegex = /^(\+234|0)[789]\d{9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      showNotification({
        title: 'Validation Error',
        message: 'Please enter a valid Nigerian phone number',
        color: 'red',
      });
      return false;
    }

    // Basic email validation if provided
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showNotification({
          title: 'Validation Error',
          message: 'Please enter a valid email address',
          color: 'red',
        });
        return false;
      }
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newPatient: Patient = {
        id: Date.now(), // In real app, this would come from the server
        name: formData.name.trim(),
        dateOfBirth: formData.dateOfBirth?.toISOString().split('T')[0],
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        hospitalId: generateHospitalId(),
      };

      onSubmit(newPatient);
      handleClose();
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Failed to add patient. Please try again.',
        color: 'red',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    setFormData({
      name: '',
      dateOfBirth: null,
      phone: '',
      email: '',
    });
    onClose();
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string | Date | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const modalTitle = (
    <Flex justify="space-between" align="center" w="100%">
      <Box>
        <Text size="xl" fw={600} c="#051438">
          Add New Patient
        </Text>
        <Text size="sm" c="#6B7280" mt={4}>
          Enter basic patient information to create a new record
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
    <ModalLayoutWrapper
      open={opened}
      title={modalTitle}
      size="60"
      height="70vh"
    >
      <Box py={20}>
        <Stack gap={20}>
          {/* Patient Information Form */}
          <Box>
            <Text size="md" fw={500} mb={16} c="#051438">
              Patient Information
            </Text>
            <Divider mb={20} />
            
            <Stack gap={16}>
              {/* Full Name */}
              <TextInput
                label="Full Name"
                placeholder="Enter patient's full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                leftSection={<IconUser size={16} />}
                styles={{
                  label: { fontWeight: 500, marginBottom: 8, color: '#374151' },
                  input: { 
                    fontSize: 14, 
                    padding: '12px 16px',
                    borderColor: formData.name ? '#10B981' : '#D1D5DB'
                  },
                }}
              />

              {/* Date of Birth */}
              <DateInput
                label="Date of Birth"
                placeholder="Select date of birth"
                value={formData.dateOfBirth}
                onChange={(date) => handleInputChange('dateOfBirth', date)}
                required
                leftSection={<IconCalendar size={16} />}
                maxDate={new Date()}
                styles={{
                  label: { fontWeight: 500, marginBottom: 8, color: '#374151' },
                  input: { 
                    fontSize: 14, 
                    padding: '12px 16px',
                    borderColor: formData.dateOfBirth ? '#10B981' : '#D1D5DB'
                  },
                }}
              />

              {/* Phone Number */}
              <TextInput
                label="Phone Number"
                placeholder="+234 801 234 5678"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                styles={{
                  label: { fontWeight: 500, marginBottom: 8, color: '#374151' },
                  input: { 
                    fontSize: 14, 
                    padding: '12px 16px',
                    borderColor: formData.phone ? '#10B981' : '#D1D5DB'
                  },
                }}
              />

              {/* Email Address */}
              <TextInput
                label="Email Address (Optional)"
                placeholder="patient@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                styles={{
                  label: { fontWeight: 500, marginBottom: 8, color: '#374151' },
                  input: { 
                    fontSize: 14, 
                    padding: '12px 16px',
                    borderColor: formData.email ? '#10B981' : '#D1D5DB'
                  },
                }}
              />
            </Stack>
          </Box>

          {/* Generated Hospital ID Preview */}
          {formData.name && (
            <Box
              p={16}
              style={{
                backgroundColor: '#F0F9FF',
                border: '1px solid #BAE6FD',
                borderRadius: 8,
              }}
            >
              <Text size="sm" fw={500} c="#0369A1" mb={8}>
                Hospital ID (Auto-generated)
              </Text>
              <Text size="lg" fw={600} c="#0C4A6E">
                {generateHospitalId()}
              </Text>
              <Text size="xs" c="#0369A1" mt={4}>
                A unique hospital ID will be automatically assigned to this patient
              </Text>
            </Box>
          )}
        </Stack>

        {/* Action Buttons */}
        <Group justify="flex-end" mt={32} gap={16}>
          <Button
            variant="outline"
            onClick={handleClose}
            size="md"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            size="md"
            loading={isSubmitting}
            disabled={!formData.name.trim() || !formData.dateOfBirth || !formData.phone.trim()}
          >
            Add Patient
          </Button>
        </Group>
      </Box>
    </ModalLayoutWrapper>
  );
};

export default AddPatientModal;
