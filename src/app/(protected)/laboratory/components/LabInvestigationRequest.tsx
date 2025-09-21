import React, { useState, useCallback } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Select,
  Stack,
  Group,
  Badge,
  Textarea,
  Divider,
} from '@mantine/core';
import { Icon } from '@iconify/react';
import { appColors } from '@/theme/colors';
import { InputsBadge } from '@/components/shared/InputsBadge';
import IconClear from '@/components/shared/IconComponents/IconClear';
import { AutoScrollContainer } from '@/components/shared/AutoScrollContainer';
import { showNotification } from '@mantine/notifications';

// Types
interface Pill {
  id: number | null;
  value: string;
  name: string;
  specimen?: string | null;
  type: string;
  tab: string;
  sub: string;
  contrast?: string | null;
  snowmedId?: number | null;
  source?: string;
  urgent?: boolean;
  withContrast?: boolean;
  specificOrganism?: string;
  bodyPart?: string;
  views?: string;
}

interface Investigation {
  id: number;
  name: string;
  hasPrice: boolean;
  snomedId: string;
  category: string;
}

interface LabInvestigationRequestProps {
  activePills: Pill[];
  setActivePills: (pills: Pill[]) => void;
  investigationNote: string;
  setInvestigationNote: (note: string) => void;
}

const LabInvestigationRequest: React.FC<LabInvestigationRequestProps> = ({
  activePills,
  setActivePills,
  investigationNote,
  setInvestigationNote,
}) => {
  // State management
  const [selectedTab, setSelectedTab] = useState('Haematology');
  const [selectedSub, setSelectedSub] = useState('test');
  const [activeTab, setActiveTab] = useState('Regular');
  const [secondActiveTab, setSecondActiveTab] = useState<string | null>('Plain');

  // Static tab data
  const tabData = [
    { id: 'Haematology', name: 'Haematology', isAvailable: true },
    { id: 'Chemistry', name: 'Chemistry', isAvailable: true },
    { id: 'Microbiology', name: 'Microbiology', isAvailable: true },
    { id: 'Serology', name: 'Serology', isAvailable: true },
    { id: 'Radiology + Pulm', name: 'Radiology + Pulm', isAvailable: true },
    { id: 'Electrophysiology', name: 'Electrophysiology', isAvailable: true },
    { id: 'Histopathology', name: 'Histopathology', isAvailable: true },
  ];

  // Static investigation data by category
  const investigationsByCategory: { [key: string]: Investigation[] } = {
    'Haematology': [
      { id: 1, name: 'Full Blood Count', hasPrice: true, snomedId: '26604007', category: 'Haematology' },
      { id: 2, name: 'Blood Film', hasPrice: true, snomedId: '26604008', category: 'Haematology' },
      { id: 3, name: 'Reticulocyte Count', hasPrice: false, snomedId: '26604009', category: 'Haematology' },
      { id: 4, name: 'ESR', hasPrice: true, snomedId: '26604010', category: 'Haematology' },
      { id: 5, name: 'Platelet Count', hasPrice: true, snomedId: '26604011', category: 'Haematology' },
    ],
    'Chemistry': [
      { id: 6, name: 'Liver Function Test', hasPrice: true, snomedId: '26958001', category: 'Chemistry' },
      { id: 7, name: 'Kidney Function Test', hasPrice: true, snomedId: '26958002', category: 'Chemistry' },
      { id: 8, name: 'Lipid Profile', hasPrice: true, snomedId: '26958003', category: 'Chemistry' },
      { id: 9, name: 'Blood Sugar', hasPrice: false, snomedId: '26958004', category: 'Chemistry' },
      { id: 10, name: 'HbA1c', hasPrice: true, snomedId: '26958005', category: 'Chemistry' },
    ],
    'Microbiology': [
      { id: 11, name: 'Blood Culture', hasPrice: true, snomedId: '26958006', category: 'Microbiology' },
      { id: 12, name: 'Urine Culture', hasPrice: true, snomedId: '26958007', category: 'Microbiology' },
      { id: 13, name: 'Stool Culture', hasPrice: false, snomedId: '26958008', category: 'Microbiology' },
      { id: 14, name: 'Sputum Culture', hasPrice: true, snomedId: '26958009', category: 'Microbiology' },
    ],
    'Radiology + Pulm': [
      { id: 15, name: 'Chest X-Ray', hasPrice: true, snomedId: '399208008', category: 'Radiology' },
      { id: 16, name: 'Abdominal X-Ray', hasPrice: true, snomedId: '399208009', category: 'Radiology' },
      { id: 17, name: 'CT Scan', hasPrice: true, snomedId: '399208010', category: 'Radiology' },
      { id: 18, name: 'MRI', hasPrice: true, snomedId: '399208011', category: 'Radiology' },
    ],
  };

  // Get sub tabs based on selected category
  const getSubTabs = () => {
    if (selectedTab === 'Haematology' || selectedTab === 'Chemistry') {
      return [
        { id: 'test', name: 'Test' },
        { id: 'specimen', name: 'Specimen' },
      ];
    } else if (selectedTab === 'Microbiology' || selectedTab === 'Serology' || selectedTab === 'Histopathology') {
      return [
        { id: 'test', name: 'Test' },
        { id: 'specimen', name: 'Specimen' },
        { id: 'specific organism', name: 'Specific Organism' },
      ];
    } else if (selectedTab === 'Radiology + Pulm') {
      return [
        { id: 'test', name: 'Test' },
        { id: 'body parts', name: 'Body parts' },
        { id: 'views', name: 'Views' },
      ];
    } else {
      return [{ id: 'test', name: 'Test' }];
    }
  };

  // Get investigations for current category
  const getCurrentInvestigations = () => {
    return investigationsByCategory[selectedTab] || [];
  };

  // Check if we can add a subtab item
  const checkSubTab = () => {
    const existingTest = activePills.find(
      (item) => item.sub === 'test' && item.tab === selectedTab
    );
    return !existingTest;
  };

  // Add investigation to active pills
  const addInvestigation = (investigation: Investigation) => {
    const existingPill = activePills.find(
      (p) => p.value === investigation.name && p.tab === selectedTab
    );

    if (existingPill) {
      showNotification({
        title: 'Already Added',
        message: 'This investigation is already in your request',
        color: 'orange',
      });
      return;
    }

    if (selectedSub !== 'test' && checkSubTab()) {
      showNotification({
        title: 'Error',
        message: 'Please select a test first before adding other items',
        color: 'red',
      });
      return;
    }

    const newPill: Pill = {
      id: investigation.id,
      value: investigation.name,
      name: investigation.name,
      type: activeTab,
      tab: selectedTab,
      sub: selectedSub,
      contrast: selectedTab === 'Radiology + Pulm' ? secondActiveTab : null,
      snowmedId: parseInt(investigation.snomedId),
      source: 'Investigation',
      urgent: activeTab === 'Urgent',
      withContrast: secondActiveTab === 'Contrast',
    };

    setActivePills([...activePills, newPill]);
  };

  // Remove investigation from active pills
  const removePill = (value: string, sub: string, tab: string) => {
    const updatedPills = activePills.filter(
      (item) => !(item.value === value && item.sub === sub && item.tab === tab)
    );
    setActivePills(updatedPills);
  };

  // Get pills for current tab and sub
  const getResultPills = () => {
    return activePills.filter(
      (item) => item.tab === selectedTab && item.sub === selectedSub
    );
  };

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
    setSelectedSub('test');
    setActiveTab('Regular');
    setSecondActiveTab('Plain');
  };

  // Handle sub tab change
  const handleSubTabChange = (subId: string) => {
    setSelectedSub(subId);
    setActiveTab('Regular');
    setSecondActiveTab('Plain');
  };

  const resultPills = getResultPills();
  const currentInvestigations = getCurrentInvestigations();

  return (
    <Box>
      {/* Tab Navigation */}
      <Box mb={16}>
        <Text size="sm" fw={500} mb={8} c="#374151">
          Investigation Category
        </Text>
        <Group gap={8}>
          {tabData.map((tab) => (
            <Button
              key={tab.id}
              variant={selectedTab === tab.id ? 'filled' : 'outline'}
              size="sm"
              onClick={() => handleTabChange(tab.id)}
              disabled={!tab.isAvailable}
            >
              {tab.name}
            </Button>
          ))}
        </Group>
      </Box>

      {/* Sub Tab Navigation */}
      <Box mb={16}>
        <Group gap={16}>
          {getSubTabs().map((subTab) => (
            <Text
              key={subTab.id}
              size="sm"
              fw={600}
              c={selectedSub === subTab.id ? appColors.blue : appColors.lowerText}
              style={{ cursor: 'pointer' }}
              onClick={() => handleSubTabChange(subTab.id)}
            >
              {subTab.name}
            </Text>
          ))}
        </Group>
      </Box>

      {/* Urgency and Contrast Controls */}
      <Flex justify="space-between" align="center" mb={16}>
        <Group gap={8}>
          <Text size="sm" fw={500} c="#374151">Urgency:</Text>
          {['Regular', 'Urgent'].map((urgency) => (
            <Button
              key={urgency}
              variant={activeTab === urgency ? 'filled' : 'outline'}
              size="xs"
              onClick={() => setActiveTab(urgency)}
              color={urgency === 'Urgent' ? 'orange' : 'blue'}
            >
              {urgency}
            </Button>
          ))}
        </Group>

        {selectedTab === 'Radiology + Pulm' && (
          <Group gap={8}>
            <Text size="sm" fw={500} c="#374151">Contrast:</Text>
            {['Plain', 'Contrast'].map((contrast) => (
              <Button
                key={contrast}
                variant={secondActiveTab === contrast ? 'filled' : 'outline'}
                size="xs"
                onClick={() => setSecondActiveTab(contrast)}
              >
                {contrast}
              </Button>
            ))}
          </Group>
        )}
      </Flex>

      {/* Selected Pills Display */}
      {resultPills.length > 0 && (
        <Box mb={16}>
          <Text size="sm" fw={500} mb={8} c="#374151">
            Selected {selectedSub === 'test' ? 'Investigations' : selectedSub}
          </Text>
          <Box
            p={12}
            style={{
              backgroundColor: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: 8,
              minHeight: 60,
            }}
          >
            <AutoScrollContainer h="3em">
              <Group gap={8}>
                {resultPills.map((pill, index) => (
                  <InputsBadge
                    key={`${pill.value}-${index}`}
                    style={{
                      background: pill.type === 'Urgent' ? appColors.orangeAccent : appColors.fade,
                    }}
                    onClick={() => removePill(pill.value, pill.sub, pill.tab)}
                    rightSection={<IconClear fill="#677597" size="8" />}
                  >
                    {pill.contrast === 'Contrast' ? `${pill.value} with contrast` : pill.value}
                  </InputsBadge>
                ))}
              </Group>
            </AutoScrollContainer>
          </Box>
        </Box>
      )}

      {/* Available Investigations */}
      <Box mb={16}>
        <Text size="sm" fw={500} mb={8} c="#374151">
          Available {selectedSub === 'test' ? 'Investigations' : selectedSub}
        </Text>
        <Box
          p={12}
          style={{
            backgroundColor: '#FAFBFC',
            border: '1px solid #E1E5E9',
            borderRadius: 8,
            minHeight: 200,
            maxHeight: 300,
            overflow: 'auto',
          }}
        >
          {selectedSub === 'test' && currentInvestigations.length > 0 ? (
            <Stack gap={8}>
              {currentInvestigations.map((investigation) => (
                <InputsBadge
                  key={investigation.id}
                  style={{
                    border: investigation.hasPrice ? '1.5px solid #34985F' : 'none',
                    cursor: 'pointer',
                    width: 'fit-content',
                  }}
                  onClick={() => addInvestigation(investigation)}
                  rightSection={
                    <Icon
                      icon="carbon:add"
                      color="black"
                      width="20"
                      height="20"
                    />
                  }
                >
                  {investigation.name}
                  {investigation.hasPrice && (
                    <Badge size="xs" color="green" ml={8}>
                      Priced
                    </Badge>
                  )}
                </InputsBadge>
              ))}
            </Stack>
          ) : selectedSub === 'specimen' ? (
            <Stack gap={8}>
              {['Blood', 'Urine', 'Stool', 'Sputum', 'CSF', 'Serum', 'Plasma'].map((specimen) => (
                <InputsBadge
                  key={specimen}
                  style={{ cursor: 'pointer', width: 'fit-content' }}
                  onClick={() => {
                    if (checkSubTab()) {
                      showNotification({
                        title: 'Error',
                        message: 'Please select a test first',
                        color: 'red',
                      });
                      return;
                    }
                    // Add specimen logic here
                  }}
                  rightSection={
                    <Icon
                      icon="carbon:add"
                      color="black"
                      width="20"
                      height="20"
                    />
                  }
                >
                  {specimen}
                </InputsBadge>
              ))}
            </Stack>
          ) : selectedSub === 'views' ? (
            <Stack gap={8}>
              {['AP View', 'PA View', 'Lateral View', 'Oblique View', 'Axial View', 'Sagittal View', 'Coronal View', 'Antero-Posterior', 'Postero-Anterior', 'Decubitus View'].map((view) => (
                <InputsBadge
                  key={view}
                  style={{ cursor: 'pointer', width: 'fit-content' }}
                  onClick={() => {
                    if (checkSubTab()) {
                      showNotification({
                        title: 'Error',
                        message: 'Please select a test first',
                        color: 'red',
                      });
                      return;
                    }
                    // Add view logic here
                  }}
                  rightSection={
                    <Icon
                      icon="carbon:add"
                      color="black"
                      width="20"
                      height="20"
                    />
                  }
                >
                  {view}
                </InputsBadge>
              ))}
            </Stack>
          ) : selectedSub === 'body parts' ? (
            <Stack gap={8}>
              {['Chest', 'Abdomen', 'Pelvis', 'Head', 'Neck', 'Spine', 'Upper Extremity', 'Lower Extremity', 'Knee', 'Shoulder', 'Elbow', 'Wrist', 'Hip', 'Ankle'].map((bodyPart) => (
                <InputsBadge
                  key={bodyPart}
                  style={{ cursor: 'pointer', width: 'fit-content' }}
                  onClick={() => {
                    if (checkSubTab()) {
                      showNotification({
                        title: 'Error',
                        message: 'Please select a test first',
                        color: 'red',
                      });
                      return;
                    }
                    // Add body part logic here
                  }}
                  rightSection={
                    <Icon
                      icon="carbon:add"
                      color="black"
                      width="20"
                      height="20"
                    />
                  }
                >
                  {bodyPart}
                </InputsBadge>
              ))}
            </Stack>
          ) : selectedSub === 'specific organism' ? (
            <Stack gap={8}>
              {['E. coli', 'Staphylococcus aureus', 'Streptococcus', 'Candida albicans', 'Salmonella', 'Pseudomonas aeruginosa', 'Klebsiella pneumoniae', 'Enterococcus'].map((organism) => (
                <InputsBadge
                  key={organism}
                  style={{ cursor: 'pointer', width: 'fit-content' }}
                  onClick={() => {
                    if (checkSubTab()) {
                      showNotification({
                        title: 'Error',
                        message: 'Please select a test first',
                        color: 'red',
                      });
                      return;
                    }
                    // Add organism logic here
                  }}
                  rightSection={
                    <Icon
                      icon="carbon:add"
                      color="black"
                      width="20"
                      height="20"
                    />
                  }
                >
                  {organism}
                </InputsBadge>
              ))}
            </Stack>
          ) : (
            <Text size="sm" c="dimmed" ta="center">
              {selectedSub === 'test' ? 'No investigations available for this category' : `Select available ${selectedSub}`}
            </Text>
          )}
        </Box>
      </Box>

      {/* Investigation Notes */}
      <Box>
        <Text size="sm" fw={500} mb={8} c="#374151">
          Investigation Notes (Optional)
        </Text>
        <Textarea
          placeholder="Enter any special instructions or notes for this investigation request..."
          value={investigationNote}
          onChange={(e) => setInvestigationNote(e.target.value)}
          minRows={3}
          styles={{
            input: {
              fontSize: 14,
              borderColor: '#D1D5DB',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default LabInvestigationRequest;
