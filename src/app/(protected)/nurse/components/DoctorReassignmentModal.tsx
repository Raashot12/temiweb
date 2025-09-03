'use client';

import React, { useState, useMemo } from 'react';
import {
  Modal,
  Stack,
  Text,
  TextInput,
  Group,
  Box,
  Button,
  Avatar,
  ScrollArea,
  Divider,
} from '@mantine/core';
import { IconSearch, IconCheck } from '@tabler/icons-react';

type DoctorInfo = {
  id: string;
  name: string;
  specialization: string;
  avatar?: string;
  email: string;
};

type DoctorReassignmentModalProps = {
  opened: boolean;
  onClose: () => void;
  onReassign: (doctor: DoctorInfo) => void;
  patient: {
    name: string;
    id: string;
  };
  currentDoctor?: DoctorInfo | null;
};

const DoctorReassignmentModal = ({
  opened,
  onClose,
  onReassign,
  patient,
  currentDoctor,
}: DoctorReassignmentModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorInfo | null>(
    currentDoctor || null,
  );

  // Sample doctors data - in real app, this would come from API
  const availableDoctors: DoctorInfo[] = [
    {
      id: 'DR001',
      name: 'Dr. Sarah Johnson',
      specialization: 'General Medicine',
      email: 'sarah.johnson@example.com',
    },
    {
      id: 'DR002',
      name: 'Dr. Michael Chen',
      specialization: 'Internal Medicine',
      email: 'michael.chen@example.com',
    },
    {
      id: 'DR003',
      name: 'Dr. Amina Ibrahim',
      specialization: 'Family Medicine',
      email: 'fatima.al-rashid@example.com',
    },
    {
      id: 'DR004',
      name: 'Dr. James Wilson',
      specialization: 'Pediatrics',
      email: 'amina.ibrahim@example.com',
    },
    {
      id: 'DR005',
      name: 'Dr. Fatima Al-Rashid',
      specialization: 'Cardiology',
      email: 'amina.ibrahim@example.com',
    },
    {
      id: 'DR006',
      name: 'Dr. Robert Taylor',
      specialization: 'Emergency Medicine',
      email: 'amina.ibrahim@example.com',
    },
  ];

  const filteredDoctors = useMemo(
    () =>
      availableDoctors.filter((doctor) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          doctor.name.toLowerCase().includes(searchLower) ||
          doctor.specialization.toLowerCase().includes(searchLower)
        );
      }),
    [searchQuery],
  );

  const handleReassign = () => {
    if (selectedDoctor) {
      onReassign(selectedDoctor);
      onClose();
    }
  };

  const handleClose = () => {
    setSearchQuery('');
    setSelectedDoctor(currentDoctor || null);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Box>
          <Text fw={600} size="lg">
            Reassign Doctor
          </Text>
          <Text size="sm" c="dimmed">
            {patient.name} • {patient.id}
          </Text>
        </Box>
      }
      size="md"
      centered
    >
      <Stack gap="md">
        <TextInput
          placeholder="Search doctors by name or specialization..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftSection={<IconSearch size={16} />}
        />

        <ScrollArea h={300}>
          <Stack gap="xs">
            {filteredDoctors.map((doctor) => {
              const isSelected = selectedDoctor?.id === doctor.id;
              const isCurrent = currentDoctor?.id === doctor.id;

              return (
                <Box
                  key={doctor.id}
                  p="sm"
                  style={{
                    border: `1px solid ${isSelected ? '#228be6' : '#e9ecef'}`,
                    borderRadius: '8px',
                    backgroundColor: isSelected ? '#f8f9ff' : 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <Group justify="space-between">
                    <Group>
                      <Avatar
                        size="md"
                        color="blue"
                        radius="xl"
                        src={doctor.avatar}
                      >
                        {doctor.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </Avatar>
                      <Box>
                        <Group gap="xs">
                          <Text fw={600} size="sm">
                            {doctor.name}
                          </Text>
                          {isCurrent && (
                            <Text
                              size="xs"
                              c="blue"
                              fw={600}
                              style={{
                                backgroundColor: '#e7f5ff',
                                padding: '2px 6px',
                                borderRadius: '4px',
                              }}
                            >
                              Current
                            </Text>
                          )}
                        </Group>
                        <Text size="xs" c="dimmed">
                          {doctor.specialization}
                        </Text>
                      </Box>
                    </Group>
                    {isSelected && <IconCheck size={20} color="#228be6" />}
                  </Group>
                </Box>
              );
            })}
          </Stack>
        </ScrollArea>

        <Divider />

        <Group justify="flex-end">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleReassign}
            disabled={!selectedDoctor || selectedDoctor?.id === currentDoctor?.id}
          >
            Reassign
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default DoctorReassignmentModal;
