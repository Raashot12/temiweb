"use client";

import React from "react";
import { Drawer, Stack, Group, Text, Divider, Box } from "@mantine/core";
import { VitalSignsForm } from "./schema";

export type VitalsHistoryItem = {
  data: VitalSignsForm;
  recordedAt: string; // ISO string
  recordedBy?: string;
};

export type VitalsHistoryDrawerProps = {
  opened: boolean;
  onClose: () => void;
  patient: { name: string; id: string };
  history: VitalsHistoryItem[];
};

const VitalsHistoryDrawer: React.FC<VitalsHistoryDrawerProps> = ({
  opened,
  onClose,
  patient,
  history,
}) => {
  const formatDateTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  return (
    <Drawer opened={opened} onClose={onClose} position="right" size="lg" title={<Text fw={600}>Vitals history</Text>}>
      <Stack>
        <Text c="dimmed" size="sm">
          {patient.name} • {patient.id}
        </Text>
        {history?.length === 0 ? (
          <Text size="sm" c="dimmed">
            No vitals recorded yet.
          </Text>
        ) : (
          <Stack gap="sm">
            {history
              .slice()
              .reverse()
              .map((item, idx) => (
                <Box key={idx} style={{ border: '1px solid #eaeaea', borderRadius: 8, padding: 12 }}>
                  <Group justify="space-between" align="center">
                    <Text fw={600}>{formatDateTime(item.recordedAt)}</Text>
                    {item.recordedBy && (
                      <Text size="sm" c="dimmed">
                        by {item.recordedBy}
                      </Text>
                    )}
                  </Group>
                  <Divider my={8} />
                  <Group gap={12} wrap="wrap">
                    <Chip label="BP" value={`${item.data.systolic}/${item.data.diastolic} mmHg`} />
                    <Chip label="HR" value={`${item.data.heartRate} bpm`} />
                    <Chip label="Temp" value={`${item.data.temperature} °C`} />
                    <Chip label="RR" value={`${item.data.respiratoryRate} br/min`} />
                    <Chip label="SpO2" value={`${item.data.spo2} %`} />
                    <Chip label="Ht" value={`${item.data.heightCm} cm`} />
                    <Chip label="Wt" value={`${item.data.weightKg} kg`} />
                    <Chip label="BMI" value={`${item.data.bmi} kg/m²`} />
                  </Group>
                  {item.data.notes && (
                    <Text size="sm" mt={8}>
                      Notes: {item.data.notes}
                    </Text>
                  )}
                </Box>
              ))}
          </Stack>
        )}
      </Stack>
    </Drawer>
  );
};

const Chip = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <Group gap={6} style={{
      border: '1px solid #e5e5e5',
      padding: '4px 8px',
      borderRadius: 16,
      fontSize: 12,
    }}>
      <Text c="#6b7280" fw={600}>{label}</Text>
      <Text fw={700}>{value}</Text>
    </Group>
  );
};

export default VitalsHistoryDrawer;
