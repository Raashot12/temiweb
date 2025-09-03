'use client';

import React, { useMemo, useState } from 'react';
import Dashboard from '@/layouts/Dashboard';
import { Box, Group, Menu, Stack, Text, Badge } from '@mantine/core';
import {
  TableGrid,
  TableGridColumn,
} from '@/components/shared/GridTableLayout';
import { statusColors } from '@/utils/constants';
import { IconThreeDots } from '@/components/shared/IconComponents/IconThreeDots';
import IconUserGray from '@/components/shared/IconComponents/IconUserGray';
import VitalSignsModal from './components/VitalSignsModal';
import { VitalSignsForm } from './components/schema';
import NurseHeader from './components/NurseHeader';
import VitalsHistoryDrawer from './components/VitalsHistoryDrawer';
import DoctorReassignmentModal from './components/DoctorReassignmentModal';

// Types

type PatientInfo = {
  fullName: string;
  age: number;
  insuranceType: string | null;
};

type VitalsRecord = {
  data: VitalSignsForm;
  recordedAt: string; // ISO string
  recordedBy?: string;
};

type QueueItem = {
  patientInfo: PatientInfo;
  patientId: string;
  status: 'Awaiting vitals' | 'Ready to see doctor';
  vitals?: VitalSignsForm | null;
  vitalsHistory: VitalsRecord[];
  priority: 'normal' | 'high';
  assignedDoctor?: {
    name: string;
    email: string;
  };
};

const NursePage = () => {
  const initialQueue: QueueItem[] = useMemo(
    () => [
      {
        patientInfo: {
          fullName: 'Mustafa Oladimeji',
          age: 29,
          insuranceType: 'NHIS',
        },
        patientId: 'NG-LA01-2507-00123',
        status: 'Awaiting vitals',
        assignedDoctor: {
          name: 'Dr. Amina Ibrahim',
          email: 'amina.ibrahim@example.com',
        },
        vitals: null,
        vitalsHistory: [],
        priority: 'normal',
      },
      {
        patientInfo: { fullName: 'Abida Musa', age: 34, insuranceType: 'NHIS' },
        patientId: 'NG-LA01-2507-00124',
        assignedDoctor: {
          name: 'Dr. Michael Chen',
          email: 'michael.chen@example.com',
        },
        status: 'Awaiting vitals',
        vitals: null,
        vitalsHistory: [],
        priority: 'normal',
      },
      {
        patientInfo: {
          fullName: 'Chijoke Umeh',
          age: 41,
          insuranceType: 'Axa Mansard',
        },
        patientId: 'NG-LA01-2507-00125',
        assignedDoctor: {
          name: 'Dr. Sarah Johnson',
          email: 'sarah.johnson@example.com',
        },
        status: 'Awaiting vitals',
        vitals: null,
        vitalsHistory: [],
        priority: 'normal',
      },
      {
        patientInfo: {
          fullName: 'Lilian Peters',
          age: 27,
          insuranceType: 'Axa Mansard',
        },
        assignedDoctor: {
          name: 'Dr. James Wilson',
          email: 'james.wilson@example.com',
        },
        patientId: 'NG-LA01-2507-00126',
        status: 'Awaiting vitals',
        vitals: null,
        vitalsHistory: [],
        priority: 'normal',
      },
      {
        patientInfo: {
          fullName: 'Rasheed Iskilu',
          age: 36,
          insuranceType: 'NHIS',
        },
        assignedDoctor: {
          name: 'Dr. Fatima Al-Rashid',
          email: 'fatima.al-rashid@example.com',
        },
        patientId: 'NG-LA01-4007-00126',
        status: 'Awaiting vitals',
        vitals: null,
        vitalsHistory: [],
        priority: 'normal',
      },
    ],
    [],
  );

  const [queue, setQueue] = useState<QueueItem[]>(initialQueue);
  const [showVitalsModal, setShowVitalsModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<QueueItem | null>(
    null,
  );
  const [showHistory, setShowHistory] = useState(false);
  const [historyPatient, setHistoryPatient] = useState<QueueItem | null>(null);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [reassignPatient, setReassignPatient] = useState<QueueItem | null>(
    null,
  );
  const [search, setSearch] = useState('');

  const localStatusColors: Record<
    string,
    { bg: string; color: string; text: string; border?: string }
  > = {
    'Awaiting vitals': {
      bg: '#FFF5CC',
      color: '#A87900',
      text: 'Awaiting vitals',
      border: '#F1C40F',
    },
    'Ready to see doctor': {
      bg: '#E2F8EB',
      color: '#27AE60',
      text: 'Ready to see doctor',
      border: '#27AE60',
    },
  };

  const getStatusColor = (value: string) => {
    // Prefer local mappings, then fall back to shared statusColors, then default
    return (
      localStatusColors[value] ||
      (statusColors as any)[value] ||
      statusColors.default
    );
  };

  const filteredQueue = useMemo(
    () =>
      queue.filter((q) => {
        const hay = `${q.patientInfo.fullName} ${q.patientId}`.toLowerCase();
        const needle = search.trim().toLowerCase();
        if (!needle) return true;
        return hay.includes(needle);
      }),
    [queue, search],
  );

  const sortQueue = (list: QueueItem[]) =>
    [...list].sort(
      (a, b) =>
        (a.priority === 'high' ? 0 : 1) - (b.priority === 'high' ? 0 : 1),
    );

  const handleOpenVitals = (item: QueueItem) => {
    setSelectedPatient(item);
    setShowVitalsModal(true);
  };

  const handleOpenHistory = (item: QueueItem) => {
    setHistoryPatient(item);
    setShowHistory(true);
  };

  const handleToggleEmergency = (item: QueueItem) => {
    setQueue((prev) =>
      sortQueue(
        prev.map((q) =>
          q.patientId === item.patientId
            ? { ...q, priority: q.priority === 'high' ? 'normal' : 'high' }
            : q,
        ),
      ),
    );
  };

  const handleSaveVitals = (data: VitalSignsForm) => {
    if (!selectedPatient) return;
    setQueue((prev) =>
      sortQueue(
        prev.map((q) =>
          q.patientId === selectedPatient.patientId
            ? {
                ...q,
                vitals: data,
                status: 'Ready to see doctor',
                vitalsHistory: [
                  ...(q.vitalsHistory || []),
                  { data, recordedAt: new Date().toISOString() },
                ],
              }
            : q,
        ),
      ),
    );
    setShowVitalsModal(false);
    setSelectedPatient(null);
  };

  const handleReassignDoctor = (newDoctor: { name: string; email: string }) => {
    if (!reassignPatient) return;
    setQueue((prev) =>
      prev.map((q) =>
        q.patientId === reassignPatient.patientId
          ? { ...q, assignedDoctor: newDoctor }
          : q,
      ),
    );
    setShowReassignModal(false);
    setReassignPatient(null);
  };

  const columns: TableGridColumn<QueueItem>[] = [
    {
      label: 'Name',
      span: 4,
      justify: 'center',
      render: (a) => (
        <Box>
          <Group>
            <IconUserGray size={28} />
            <Text fw={600} style={{ whiteSpace: 'nowrap' }}>
              {a.patientInfo.fullName}
            </Text>
            {a.priority === 'high' && (
              <Badge color="red" variant="filled">
                Emergency
              </Badge>
            )}
          </Group>
          <Group gap={6}>
            <Text size="sm" c="dimmed" fw={500}>
              Age: {a.patientInfo.age}
            </Text>
            •
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
                border: `1px solid ${getStatusColor(a.status).border}`,
                color: getStatusColor(a.status).color,
                background: getStatusColor(a.status).bg,
              }}
            >
              {a.status}
            </Text>
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
      label: 'Doctor assigned',
      justify: 'center',
      span: 3,
      render: (a) => (
        <Box>
          {a.assignedDoctor ? (
            <Stack gap={1}>
              <Text fw={600} size="sm">
                {a.assignedDoctor.name}
              </Text>
              <Text size="xs" c="dimmed">
                {a.assignedDoctor.email}
              </Text>
            </Stack>
          ) : (
            <Text size="sm" c="dimmed" style={{ fontStyle: 'italic' }}>
              No doctor assigned
            </Text>
          )}
        </Box>
      ),
    },
    {
      label: 'Action',
      span: 2,
      thJustify: 'flex-end',
      justify: 'center',
      align: 'flex-end',
      render: (a) => {
        return (
          <Menu shadow="md" width={220}>
            <Menu.Target>
              <button
                style={{
                  display: 'block',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <IconThreeDots />
              </button>
            </Menu.Target>
            <Menu.Dropdown>
              {a.status === 'Awaiting vitals' && (
                <Menu.Item
                  fw={600}
                  style={{ fontSize: 14 }}
                  onClick={() => handleOpenVitals(a)}
                >
                  Take vitals
                </Menu.Item>
              )}
              {a.status === 'Ready to see doctor' && (
                <Menu.Item
                  fw={600}
                  style={{ fontSize: 14 }}
                  onClick={() => handleOpenVitals(a)}
                >
                  Recheck vitals
                </Menu.Item>
              )}
              {(a.vitalsHistory?.length ?? 0) > 0 && (
                <Menu.Item
                  fw={600}
                  style={{ fontSize: 14 }}
                  onClick={() => handleOpenHistory(a)}
                >
                  View vitals history
                </Menu.Item>
              )}
              <Menu.Item
                fw={600}
                style={{ fontSize: 14 }}
                onClick={() => {
                  setReassignPatient(a);
                  setShowReassignModal(true);
                }}
              >
                Reassign doctor
              </Menu.Item>
              {a.priority !== 'high' ? (
                <Menu.Item
                  fw={600}
                  style={{ fontSize: 14, color: '#E74C3C' }}
                  onClick={() => handleToggleEmergency(a)}
                >
                  Mark as emergency
                </Menu.Item>
              ) : (
                <Menu.Item
                  fw={600}
                  style={{ fontSize: 14 }}
                  onClick={() => handleToggleEmergency(a)}
                >
                  Remove emergency
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        );
      },
    },
  ];

  return (
    <Dashboard title="Nurse">
      <NurseHeader
        totalItems={filteredQueue.length}
        onPaginationChange={() => {}}
        search={search}
        onSearchChange={setSearch}
      />
      <Box p="md">
        <Stack gap="sm">
          <TableGrid
            columns={columns}
            data={sortQueue(filteredQueue)}
            rowKey="patientId"
          />
        </Stack>

        <VitalSignsModal
          opened={showVitalsModal}
          onClose={() => {
            setShowVitalsModal(false);
            setSelectedPatient(null);
          }}
          onSubmit={handleSaveVitals}
          patient={{
            name: selectedPatient?.patientInfo.fullName || '',
            id: selectedPatient?.patientId || '',
          }}
          defaultValues={selectedPatient?.vitals || undefined}
        />

        <VitalsHistoryDrawer
          opened={showHistory}
          onClose={() => {
            setShowHistory(false);
            setHistoryPatient(null);
          }}
          patient={{
            name: historyPatient?.patientInfo.fullName || '',
            id: historyPatient?.patientId || '',
          }}
          history={historyPatient?.vitalsHistory || []}
        />

        <DoctorReassignmentModal
          opened={showReassignModal}
          onClose={() => {
            setShowReassignModal(false);
            setReassignPatient(null);
          }}
          onReassign={(doctor) =>
            handleReassignDoctor({ name: doctor.name, email: doctor?.email })
          }
          patient={{
            name: reassignPatient?.patientInfo.fullName || '',
            id: reassignPatient?.patientId || '',
          }}
          currentDoctor={
            reassignPatient?.assignedDoctor
              ? {
                  id: '',
                  name: reassignPatient.assignedDoctor.name,
                  specialization: '',
                  email: reassignPatient.assignedDoctor.email,
                }
              : null
          }
        />
      </Box>
    </Dashboard>
  );
};

export default NursePage;
