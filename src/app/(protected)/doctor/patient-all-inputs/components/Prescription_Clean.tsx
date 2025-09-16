import React, { useState } from 'react';
import { Box, Text, Button, Flex, Divider, TextInput, Select, Grid, Input, Stack, Menu } from '@mantine/core';
import { momentBrowserTimezone } from '@/utils/utils';

// Static medication data types
type PatientMedicationForReturnDto = {
  id: number;
  productName: string;
  summary: string;
  creationTime: string;
  isDiscontinued?: boolean;
  isDeleted?: boolean;
  isAdministered?: boolean;
  discontinueUser?: string;
  deletedUser?: string;
  sessionId?: number;
};

type PrescriptionProps = {
  patientId: number;
  encounterId: string;
  saveCallback?: () => void;
  data?: {
    toogleclose: (() => void) | undefined;
  };
  dischargeExport?: boolean;
  sessionId?: number;
  setPrescriptionItems?: React.Dispatch<React.SetStateAction<PatientMedicationForReturnDto[]>>;
  procedureId?: number;
};

const Prescription = (props: PrescriptionProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [dosage, setDosage] = useState({ value: '', unit: '' });
  const [frequency, setFrequency] = useState({ value: '', unit: '' });
  const [duration, setDuration] = useState({ value: '', unit: '' });
  const [directions, setDirections] = useState<string[]>([]);

  // Static medication data
  const staticMedications = [
    { id: 1, name: 'Paracetamol 500mg', available: true, stock: 100 },
    { id: 2, name: 'Ibuprofen 400mg', available: true, stock: 50 },
    { id: 3, name: 'Amoxicillin 500mg', available: false, stock: 0 },
  ];

  const staticDosageData = {
    unit: ['tablets', 'capsules', 'ml', 'mg', 'drops'],
    frequency: ['once daily', 'twice daily', 'three times daily', 'as needed'],
    duration: ['days', 'weeks', 'months'],
    direction: ['Take with food', 'Take on empty stomach', 'Take before meals']
  };

  // Static prescription history
  const staticPrescriptions: PatientMedicationForReturnDto[] = [
    {
      id: 1,
      productName: 'Paracetamol 500mg',
      summary: 'Paracetamol 500mg - 2 tablets twice daily for 5 days - Take with food',
      creationTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      isDiscontinued: false,
      isDeleted: false,
      isAdministered: true,
      sessionId: 1
    },
    {
      id: 2,
      productName: 'Ibuprofen 400mg',
      summary: 'Ibuprofen 400mg - 1 tablet three times daily for 3 days - Take after meals',
      creationTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      isDiscontinued: true,
      isDeleted: false,
      isAdministered: false,
      discontinueUser: 'Dr. Smith',
      sessionId: 2
    }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const addMedication = (medication: string) => {
    if (!selectedMedications.includes(medication)) {
      setSelectedMedications([...selectedMedications, medication]);
    }
  };

  const removeMedication = (medication: string) => {
    setSelectedMedications(selectedMedications.filter(med => med !== medication));
  };

  const handleSave = async () => {
    // Mock save functionality
    console.log('Saving prescription:', {
      medications: selectedMedications,
      dosage,
      frequency,
      duration,
      directions
    });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Clear form
    setSelectedMedications([]);
    setSearchTerm('');
    setDosage({ value: '', unit: '' });
    setFrequency({ value: '', unit: '' });
    setDuration({ value: '', unit: '' });
    setDirections([]);
    
    props.saveCallback?.();
  };

  const filteredMedications = staticMedications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
      <Flex align="center" justify="space-between" mb={16}>
        <Text size="lg" w={700}>Prescribe medication</Text>
        {props.data?.toogleclose && (
          <Button variant="subtle" onClick={props.data.toogleclose}>×</Button>
        )}
      </Flex>
      
      <Divider mb={16} />

      {/* Search and Selected Medications */}
      <Box mb={16}>
        <TextInput
          placeholder="Search medication"
          value={searchTerm}
          onChange={handleSearchChange}
          mb={8}
        />
        
        {searchTerm.length > 2 && (
          <Box style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '8px', maxHeight: '200px', overflowY: 'auto' }}>
            {filteredMedications.length === 0 ? (
              <Text size="sm" color="dimmed">No medications found</Text>
            ) : (
              filteredMedications.map(med => (
                <Flex key={med.id} justify="space-between" align="center" p={4} style={{ cursor: 'pointer' }} onClick={() => addMedication(med.name)}>
                  <div>
                    <Text size="sm" w={500}>{med.name}</Text>
                    {med.available && <Text size="xs" color="dimmed">Stock: {med.stock}</Text>}
                  </div>
                  {med.available && (
                    <Box style={{ backgroundColor: '#e2f8eb', color: '#3fb772', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
                      Available
                    </Box>
                  )}
                </Flex>
              ))
            )}
          </Box>
        )}

        {/* Selected Medications */}
        {selectedMedications.length > 0 && (
          <Flex wrap="wrap" gap={8} mt={8}>
            {selectedMedications.map(med => (
              <Box key={med} style={{ backgroundColor: '#f0f0f0', padding: '4px 8px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Text size="sm" w={500}>{med}</Text>
                <Button size="xs" variant="subtle" onClick={() => removeMedication(med)}>×</Button>
              </Box>
            ))}
          </Flex>
        )}
      </Box>

      {/* Dosage Form */}
      {selectedMedications.length > 0 && (
        <Grid mb={16}>
          <Grid.Col span={4}>
            <Text size="sm" w={600} mb={4}>Dosage</Text>
            <Flex>
              <Input
                placeholder="0"
                type="number"
                value={dosage.value}
                onChange={(e) => setDosage({ ...dosage, value: e.target.value })}
                style={{ flex: 1, marginRight: '8px' }}
              />
              <Select
                placeholder="Unit"
                data={staticDosageData.unit.map(unit => ({ value: unit, label: unit }))}
                value={dosage.unit}
                onChange={(value) => setDosage({ ...dosage, unit: value || '' })}
                style={{ flex: 1 }}
              />
            </Flex>
          </Grid.Col>
          
          <Grid.Col span={4}>
            <Text size="sm" w={600} mb={4}>Frequency</Text>
            <Flex>
              <Input
                placeholder="0"
                type="number"
                value={frequency.value}
                onChange={(e) => setFrequency({ ...frequency, value: e.target.value })}
                style={{ flex: 1, marginRight: '8px' }}
              />
              <Select
                placeholder="Frequency"
                data={staticDosageData.frequency.map(freq => ({ value: freq, label: freq }))}
                value={frequency.unit}
                onChange={(value) => setFrequency({ ...frequency, unit: value || '' })}
                style={{ flex: 1 }}
              />
            </Flex>
          </Grid.Col>
          
          <Grid.Col span={4}>
            <Text size="sm" w={600} mb={4}>Duration</Text>
            <Flex>
              <Input
                placeholder="0"
                type="number"
                value={duration.value}
                onChange={(e) => setDuration({ ...duration, value: e.target.value })}
                style={{ flex: 1, marginRight: '8px' }}
              />
              <Select
                placeholder="Duration"
                data={staticDosageData.duration.map(dur => ({ value: dur, label: dur }))}
                value={duration.unit}
                onChange={(value) => setDuration({ ...duration, unit: value || '' })}
                style={{ flex: 1 }}
              />
            </Flex>
          </Grid.Col>
        </Grid>
      )}

      {/* Save Button */}
      <Flex justify="flex-end" gap={12} mb={16}>
        <Button onClick={handleSave} disabled={selectedMedications.length === 0}>
          Save Prescription
        </Button>
      </Flex>

      <Divider mb={16} />

      {/* Prescription History */}
      <Box>
        <Text size="md" w={600} mb={12}>Prescription History</Text>
        <Stack gap={12}>
          {staticPrescriptions.map(prescription => (
            <Box key={prescription.id} p={12} style={{ border: '1px solid #eee', borderRadius: '8px' }}>
              <Flex justify="space-between" align="flex-start">
                <Box style={{ flex: 1 }}>
                  <Text size="sm" color="dimmed">
                    {momentBrowserTimezone(prescription.creationTime).format('hh:mm A')} - {' '}
                    {momentBrowserTimezone(prescription.creationTime).format('MMM DD, YYYY')}
                  </Text>
                  <Text size="sm" w={500} style={{ textDecoration: prescription.isDiscontinued ? 'line-through' : 'none' }}>
                    {prescription.summary}
                  </Text>
                  {prescription.isDiscontinued && (
                    <Text size="xs" color="red">Discontinued by {prescription.discontinueUser}</Text>
                  )}
                  {prescription.isAdministered && (
                    <Text size="xs" color="green">✓ Administered</Text>
                  )}
                </Box>
                <Menu>
                  <Menu.Target>
                    <Button variant="subtle" size="xs">⋯</Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item onClick={() => console.log('Download prescription')}>
                      Download prescription
                    </Menu.Item>
                    {!prescription.isDiscontinued && (
                      <Menu.Item color="red" onClick={() => console.log('Discontinue')}>
                        Discontinue
                      </Menu.Item>
                    )}
                  </Menu.Dropdown>
                </Menu>
              </Flex>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Prescription;
