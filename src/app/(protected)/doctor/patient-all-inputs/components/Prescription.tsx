import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  Input,
  Menu,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { IconPlus, IconMedicalCross } from '@tabler/icons-react';
import { momentBrowserTimezone } from '@/utils/utils';
import styled from '@emotion/styled';
import { useAlertNotification } from '@/hooks/useNotification';
import CustomOptionSelect from '@/components/shared/CustomAllInputPanel';
import ItemListVerticalScrollWrapper from '@/components/shared/ItemListVerticalScrollWrapper';
import {
  GridWrapperThreeCol,
  PrescriptionContainer,
  SavedGroupHeader,
} from '@/components/shared/StyledComponent';
import { appColors } from '@/theme/colors';
import { IconThreeDots } from '@/components/shared/IconComponents/IconThreeDots';
import { BoxPill } from './RequestInvestigations';
import { InputsBadge } from '@/components/shared/InputsBadge';
import { AutoScrollContainer } from '@/components/shared/AutoScrollContainer';
import IconClear from '@/components/shared/IconComponents/IconClear';
import IconPlusColored from '@/components/shared/IconComponents/IconPlusColored';
import IconArrowOpened from '@/components/shared/IconComponents/IconArrowOpened';
import { useAppDispatch } from '@/state/hooks';
import Vaccination from './Vaccination';
import PreSave from './PreSave';
import MultiValueSelect from '@/components/shared/MultiValueSelect';
import IconUpSmall from '@/components/shared/IconComponents/IconUpSmall';
import IconInputArrowDown from '@/components/shared/IconComponents/IconInputArrowDown';
import IconCloseX from '@/components/shared/IconComponents/IconCloseX';
import {
  PatientSuggestedMedicationsResponseDto,
  PatientMedicationBaseResponseDto,
  SearchProductMedicationForReturnDto,
  SuggestedMedicationType,
  ProductSourceType,
  DispensingUnitType,
} from '@/types/index';

// Types for prescription management
type Pill = {
  value: string;
  type: string;
  productId?: number;
  source?: string;
  name?: string;
  isFreeText: boolean;
  brandName?: string | null;
  doseFormName?: string | null;
  doseStrengthName?: string | null;
  genericsSctName?: string | null;
  snomedId?: string | null;
  productSourceType?: unknown;
};

type PrescriptionState = {
  mainSearchResult: string;
  note: string;
  activePills: Pill[];
  dosage: { doseValue: string; unit: string } | null;
  duration: { durationValue: string; durationUnit: string } | null;
  frequency: {
    frequencyValue: string;
    frequencyUnit: string;
  } | null;
  directions: { value: string; label: string }[] | null;
  minimumAge?: number | null;
  maximumAge?: number | null;
  minimumWeight?: number | null;
  maximumWeight?: number | null;
  medicationGroupGenders?: { gender: string }[] | null;
  type?: string;
};

const initialPrescriptionState: PrescriptionState = {
  mainSearchResult: '',
  activePills: [],
  note: '',
  dosage: null,
  duration: null,
  frequency: null,
  directions: [],
  minimumAge: null,
  maximumAge: null,
  minimumWeight: null,
  maximumWeight: null,
  medicationGroupGenders: null,
  type: '',
};

const initialState = {
  prescriptionState: initialPrescriptionState,
  states: [],
} as {
  states: PrescriptionState[];
  prescriptionState: PrescriptionState;
};

const useSummaryDescription = () => ({
  createSummaryDescription: (state: PrescriptionState) => {
    const { mainSearchResult, dosage, frequency, duration, directions, note } =
      state;
    const parts = [
      mainSearchResult,
      dosage?.doseValue ? `${dosage.doseValue} ${dosage.unit}` : '',
      frequency?.frequencyValue
        ? `${frequency.frequencyValue} ${frequency.frequencyUnit}`
        : '',
      duration?.durationValue
        ? `for ${duration.durationValue} ${duration.durationUnit}`
        : '',
      directions && directions.length > 0
        ? directions.map((d) => d.label || d.value).join(', ')
        : '',
      note,
    ].filter(Boolean);
    return parts.join(' - ');
  },
  reformatorState: (props: any, states: PrescriptionState[]) => {
    return states.map((state) => ({
      patientId: props.patientId,
      productId: state.activePills?.[0]?.productId || null,
      productName: state.mainSearchResult || state.activePills?.[0]?.name || '',
      snowmedId: state.activePills?.[0]?.snomedId || null,
      productSourceType: state.activePills?.[0]?.productSourceType || 'Product',
      doseUnit: state.dosage?.unit || null,
      doseValue: Number(state.dosage?.doseValue) || null,
      frequencyUnit: state.frequency?.frequencyUnit || null,
      frequencyValue: Number(state.frequency?.frequencyValue) || null,
      durationUnit: state.duration?.durationUnit || null,
      durationValue: Number(state.duration?.durationValue) || null,
      directions: state.directions?.map((d) => d.value || d.label) || null,
      note: state.note || null,
      isManualEntry: state.activePills?.[0]?.isFreeText || false,
      medicationGroupId: null,
      isAdministered: false,
    }));
  },
  createGroupedSummary: (data: any[]) =>
    data.map((item) => ({
      mainSearchResult: item.productName || '',
      summary: `${item.productName} - ${item.doseValue}${item.doseUnit} ${item.frequencyValue} ${item.frequencyUnit} for ${item.durationValue} ${item.durationUnit}`,
      note: item.note || '',
      activePills: [],
      dosage: {
        doseValue: item.doseValue?.toString() || '',
        unit: item.doseUnit || '',
      },
      frequency: {
        frequencyValue: item.frequencyValue?.toString() || '',
        frequencyUnit: item.frequencyUnit || '',
      },
      duration: {
        durationValue: item.durationValue?.toString() || '',
        durationUnit: item.durationUnit || '',
      },
      directions: item.directions || [],
    })),
});

// Types for medication data
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
  setPrescriptionItems?: React.Dispatch<
    React.SetStateAction<PatientMedicationForReturnDto[]>
  >;
  procedureId?: number;
};
export type ItemType = {
  id: string;
  name: string;
};

type ActionType = ItemType & {
  // action: VoidFunction;
  action: (id: null | number) => void;
  danger?: boolean;
};

export const ItemHolderDropDown = styled.div<{ isOpened: boolean }>`
  width: 95%;
  position: absolute;
  overflow: auto;
  height: 280px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 10px;
  padding-bottom: 8px;
  background: #ffffff;
  z-index: 10;
  border: 1px solid #dfe2e9;
  border-radius: 10px;
  display: ${({ isOpened }) => (isOpened ? 'block' : 'none')};
`;

export const AvailableButton = styled.div`
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  color: #3fb772;
  background-color: #e2f8eb;
  border-radius: 15px;
  font-weight: 700;
`;

// TODO Remove when we are fully done with prescriptions
// const getNotesData = (val: PatientMedicationForReturnDto) => {
//   if (val) {
//     const value = replaceXWithValue(
//       val?.doseValue?.toString() ?? '',
//       val?.doseUnit ?? ''
//     )
//       .concat(' ')
//       .concat(
//         replaceXWithValue(
//           val?.frequencyValue?.toString() ?? '',
//           val?.frequencyUnit ?? ''
//         )
//       )
//       .concat(' ')
//       .concat(
//         replaceXWithValue(
//           val.durationValue?.toString() ?? '',
//           val.durationUnit ?? ''
//         )
//       );
//     return [val.productName, value, val.directions?.join(', '), val.note]
//       .filter(Boolean)
//       .join(', ');
//   }
//   return '';
// };

const Prescription = (props: PrescriptionProps) => {
  const { showError } = useAlertNotification();
  const [groupedMedicationMode, setGroupedMedicationMode] = useState<
    'undo' | 'edit' | null
  >(null);
  const [openGroupedMedication, setOpenGroupedMedication] = useState(true);
  const [groupedActivePills, setGroupedActivePills] = useState<
    PatientSuggestedMedicationsResponseDto[]
  >([]);
  const { createSummaryDescription, reformatorState, createGroupedSummary } =
    useSummaryDescription();
  const [groupSummaries, setGroupSummaries] = useState(
    [] as PrescriptionState[],
  );
  const [groupStateSummaries, setGroupStateSummaries] = useState(
    [] as PrescriptionState[],
  );
  const [removedGroupSummaries, setRemovedGroupSummaries] = useState<
    PrescriptionState[]
  >([]);
  // TODO: Replace with proper Redux integration
  const [prescriptionState, setPrescriptionStateLocal] =
    useState<PrescriptionState>(initialPrescriptionState);
  const [states, setStatesLocal] = useState<PrescriptionState[]>([]);
  const [recordProcedureState] = useState({ leftSide: 'Preop' });

  const dispatch = useAppDispatch();

  // Mock dispatch functions - TODO: Replace with actual Redux actions
  const setPrescriptionState = (payload: Partial<PrescriptionState>) => {
    setPrescriptionStateLocal((prev) => ({ ...prev, ...payload }));
  };

  const setPrescriptionStates = (payload: PrescriptionState[]) => {
    setStatesLocal(payload);
  };

  const setStates = (payload: PrescriptionState[]) => {
    setStatesLocal(payload);
  };
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [discontinue, setDiscontinue] = useState<{
    isOpen: boolean;
  }>();
  const [loadingButton, setLoadingButton] = useState<
    'continue' | 'finish' | null
  >(null);
  const [isCreateGroup, setIsCreateGroup] = useState<{
    isOpen: boolean;
  }>();

  const [isEditGroup, setIsEditGroup] = useState<{
    isOpen: boolean;
  }>();

  const [updatedGroupedActivePills, setUpdatedGroupedActivePills] = useState(
    [] as PatientSuggestedMedicationsResponseDto[],
  );

  const prescriptionRef = useRef(null);

  const [administered, setAdministered] = useState<{
    isOpen: boolean;
  }>();
  const [deleteMedication, setDeleteMedication] = useState<{
    isOpen: boolean;
  }>();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Mock function for download prescription
  const handleDownloadPrescription = () => {
    console.log('Downloading prescription for ID:', selectedId);
    // Mock download functionality
  };

  // TODO: Replace with proper API integration
  const [searchedMedications, setSearchedMedications] = useState<
    SearchProductMedicationForReturnDto[]
  >([]);

  // Mock search function - replace with actual API call
  const searchMedications = async (searchTerm: string) => {
    if (searchTerm.length > 3) {
      // Simulate API delay
      setTimeout(() => {
        const mockResults: SearchProductMedicationForReturnDto[] = [
          {
            productId: 1,
            productName: 'Paracetamol 500mg',
            resultDisplayName: 'Paracetamol 500mg Tablets',
            brandName: 'Generic',
            doseFormName: 'Tablet',
            doseStrengthName: '500mg',
            genericDrugName: 'Paracetamol',
            sourceType: 'Product' as ProductSourceType,
            snowmedId: '387517004',
            isAvailable: true,
            totalAmountInStock: 100,
            dispensingUnit: 'Packet' as DispensingUnitType,
          },
          {
            productId: 2,
            productName: 'Ibuprofen 400mg',
            resultDisplayName: 'Ibuprofen 400mg Tablets',
            brandName: 'Advil',
            doseFormName: 'Tablet',
            doseStrengthName: '400mg',
            genericDrugName: 'Ibuprofen',
            sourceType: 'Product' as ProductSourceType,
            snowmedId: '387207008',
            isAvailable: true,
            totalAmountInStock: 50,
            dispensingUnit: 'Packet' as DispensingUnitType,
          },
        ].filter(
          (med) =>
            med.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            med.genericDrugName
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()),
        );
        setSearchedMedications(mockResults);
      }, 300);
    } else {
      setSearchedMedications([]);
    }
  };

  // TODO: Replace with proper API integration
  const [patientMedicationSuggestions, setPatientMedicationSuggestions] =
    useState<PatientSuggestedMedicationsResponseDto[]>([
      {
        id: 1,
        name: 'Pain Management Group',
        suggestedMedicationType: 'MedicationGroup' as SuggestedMedicationType,
        groupedMedications: [
          {
            id: 1,
            productName: 'Paracetamol 500mg',
            doseUnit: 'mg',
            doseValue: 500,
            frequencyUnit: 'times per day',
            frequencyValue: 3,
            durationUnit: 'days',
            durationValue: 7,
            directions: ['Take with food', 'After meals'],
            note: 'For pain relief',
          },
        ],
      },
      {
        id: 2,
        name: 'Antibiotic Group',
        suggestedMedicationType: 'MedicationGroup' as SuggestedMedicationType,
        groupedMedications: [
          {
            id: 2,
            productName: 'Amoxicillin 250mg',
            doseUnit: 'mg',
            doseValue: 250,
            frequencyUnit: 'times per day',
            frequencyValue: 3,
            durationUnit: 'days',
            durationValue: 10,
            directions: ['Take with water', 'Complete the course'],
            note: 'Antibiotic treatment',
          },
        ],
      },
    ]);

  // Mock function to fetch patient medication suggestions
  const fetchPatientMedicationSuggestions = useCallback(async () => {
    try {
      // TODO: Replace with actual API call
      console.log('Fetching patient medication suggestions...');
    } catch (error) {
      console.error('Failed to fetch medication suggestions:', error);
    }
  }, []);

  const CreateMedications = async (data: any) => {
    // Mock API call - in real implementation this would save to backend
    console.log('Creating medications:', data);
    return { success: true, id: Date.now() };
  };

  // TODO: Replace with proper data source (API or constants file)
  const [dosageData, setDosageData] = useState({
    unit: ['mg', 'g', 'ml', 'tablets', 'capsules', 'drops', 'tsp', 'tbsp'],
    frequency: [
      'once daily',
      'twice daily',
      'three times daily',
      'four times daily',
      'every 4 hours',
      'every 6 hours',
      'every 8 hours',
      'every 12 hours',
      'as needed',
      'at bedtime',
    ],
    duration: [
      '1 day',
      '2 days',
      '3 days',
      '5 days',
      '7 days',
      '10 days',
      '14 days',
      '21 days',
      '30 days',
      '60 days',
      '90 days',
    ],
    direction: [
      'Take with food',
      'Take on empty stomach',
      'Take with water',
      'Take before meals',
      'Take after meals',
      'Take at bedtime',
      'Do not crush or chew',
      'Complete the full course',
      'Take with plenty of water',
    ],
  });

  // TODO: Replace with proper API integration
  const [notesData, setNotesData] = useState<PatientMedicationForReturnDto[]>(
    [],
  );

  // Mock function to fetch patient medications - replace with actual API call
  const fetchPatientMedications = useCallback(async () => {
    try {
      // Simulate API call
      const mockData: PatientMedicationForReturnDto[] = [
        {
          id: 1,
          productName: 'Paracetamol 500mg',
          summary:
            'Paracetamol 500mg - 1 tablet three times daily for 7 days. Take with food.',
          creationTime: new Date().toISOString(),
          isDiscontinued: false,
          isDeleted: false,
          isAdministered: true,
          sessionId: props.sessionId,
        },
        {
          id: 2,
          productName: 'Ibuprofen 400mg',
          summary:
            'Ibuprofen 400mg - 1 tablet twice daily for 5 days. Take after meals.',
          creationTime: new Date(Date.now() - 86400000).toISOString(),
          isDiscontinued: false,
          isDeleted: false,
          isAdministered: false,
          sessionId: props.sessionId,
        },
      ];
      setNotesData(mockData);
    } catch (error) {
      console.error('Failed to fetch patient medications:', error);
    }
  }, [props.sessionId, showError]);

  const investigationsSummaryActions: ActionType[] = [
    {
      id: '1',
      name: 'Discontinue',
      action: (id) => {
        setSelectedId(id as number);
        setDiscontinue({ isOpen: true });
      },
      danger: true,
    },
    // {
    //   id: '2',
    //   name: 'KIV meds',
    //   action: (id) => {
    //     setSelectedId(id as number);
    //     setKiv({ isOpen: true });
    //   },
    // },
    // {
    //   id: '3',
    //   name: 'Alternate with',
    //   action: (id) => {
    //     setSelectedId(id as number);
    //     setAlternate({ isOpen: true });
    //   },
    // },
    {
      id: '3',
      name: 'Download prescription',

      action: (id) => {
        setSelectedId(id as number);
        setTimeout(() => {
          handleDownloadPrescription();
        }, 1000);
      },
    },
    {
      id: '4',
      name: 'Mark as administered',
      action: (id) => {
        setSelectedId(id as number);
        setAdministered({ isOpen: true });
      },
    },
    {
      id: '5',
      name: 'Delete',
      action: (id) => {
        setSelectedId(id as number);
        setDeleteMedication({ isOpen: true });
      },
      danger: true,
    },
  ];

  const formatSearchedMedicationName = (
    item: SearchProductMedicationForReturnDto,
  ) => {
    return item.resultDisplayName ?? '';
  };

  const formatGroupedMedicationName = (
    item: PatientSuggestedMedicationsResponseDto,
  ) => {
    return item.name ?? '';
  };

  const addItemToActivePills = (
    item: string,
    type: string,
    value?: {
      productId?: number;
      productName: string;
      brandName?: string | null;
      doseFormName?: string | null;
      doseStrengthName?: string | null;
      genericsSctName?: string | null;
      source?: string;
      isFreeText?: boolean;
      productSourceType?: unknown;
      snomedId?: string | null;
    },
  ) => {
    if (!prescriptionState.activePills.find((p) => p.value === item)) {
      const newActivePills = [...prescriptionState.activePills];
      newActivePills.push({
        value: item,
        type,
        productId: value?.productId ?? 0,
        name: value?.productName ?? '',
        brandName: value?.brandName,
        doseFormName: value?.doseFormName,
        doseStrengthName: value?.doseStrengthName,
        source: value?.source ?? '',
        isFreeText: value?.isFreeText ?? false,
        genericsSctName: value?.genericsSctName ?? '',
        productSourceType: value?.productSourceType,
        snomedId: value?.snomedId,
      });

      setPrescriptionState({ activePills: newActivePills });
    } else {
      alert('Suggestion already added');
    }
  };

  const addGroupedItemToActivePills = (
    groupedItem: PatientSuggestedMedicationsResponseDto,
  ) => {
    setGroupedActivePills((prevGroupedActivePills) => {
      const exists = prevGroupedActivePills.some(
        (item) => item.id === groupedItem.id,
      );
      if (exists) {
        return prevGroupedActivePills;
      }
      return [...prevGroupedActivePills, groupedItem];
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPrescriptionState({
      mainSearchResult: value,
    });

    // Trigger search when user types
    if (value.length > 2) {
      setIsOpened(true);
      searchMedications(value);
    } else {
      setIsOpened(false);
      setSearchedMedications([]);
    }
  };

  const handleDose = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
  };
  const handleFrequency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
  };
  const handleDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
  };

  const addSearchedItem = (value: SearchProductMedicationForReturnDto) => {
    setIsOpened(!isOpened);
    const item = formatSearchedMedicationName(value);
    addItemToActivePills(item, 'Prescription', {
      productName: value.productName ?? '',
      productId: value.productId ?? 0,
      source: value.sourceType ?? '',
      doseFormName: value.doseFormName,
      doseStrengthName: value.doseStrengthName,
      brandName: value.brandName,
      genericsSctName: value.genericDrugName,
      productSourceType: value.sourceType,
      snomedId: value.snowmedId,
    });
  };

  const getValueEnt = () => {
    if (props.procedureId && recordProcedureState.leftSide === 'Preop')
      return 'Preop';
    if (props.procedureId && recordProcedureState.leftSide === 'Intraop')
      return 'Intraop';
    if (props.procedureId && recordProcedureState.leftSide === 'Postop')
      return 'Postop';
    return undefined;
  };

  // Initialize data on component mount
  useEffect(() => {
    fetchPatientMedications();
    fetchPatientMedicationSuggestions();
  }, [fetchPatientMedications, fetchPatientMedicationSuggestions]);

  useEffect(() => {
    if (props.dischargeExport) {
      props.setPrescriptionItems?.(notesData ?? []);
    }
  }, [props.dischargeExport, notesData, props.setPrescriptionItems]);

  const dropdownRef = useClickOutside(() => setIsOpened(false));

  useEffect(() => {
    if (groupedActivePills?.length > 0) {
      const result = createGroupedSummary(
        groupedActivePills?.[0]
          ?.groupedMedications as PatientMedicationBaseResponseDto[],
      );
      setGroupStateSummaries(result as PrescriptionState[]);
    } else {
      setGroupStateSummaries([] as PrescriptionState[]);
    }
  }, [groupedActivePills]);

  const stateSummaries = groupStateSummaries?.map((p) => ({
    summary: createSummaryDescription(p),
  }));

  const EmptyData = () => {
    setPrescriptionStates([]);
    setStates([]);
    setUpdatedGroupedActivePills?.([]);
    setGroupedActivePills?.([]);
    setIsOpened(false);
    props.saveCallback?.();
  };

  const onSave = async (type: 'finish' | 'continue') => {
    setLoadingButton(type);
    const allGroupedMedications = createGroupedSummary(
      updatedGroupedActivePills.flatMap(
        (pill) => pill.groupedMedications || [],
      ),
    );

    if (type === 'continue') {
      const allStateSummaries = [...states, ...allGroupedMedications];
      setIsCreateGroup({ isOpen: true });
      setGroupSummaries(allStateSummaries as PrescriptionState[]);
      EmptyData();
      setLoadingButton(null);
    } else {
      const resp = await CreateMedications({
        createMultipleMedicationsDto: {
          sessionId: props.sessionId,
          prescriptions: reformatorState(props, [
            ...states,
            ...allGroupedMedications,
          ]),
          encounterId: Number(props.encounterId),
          procedureSessionId: props.procedureId,
          procedureEntryType: getValueEnt(),
        },
      });
      setLoadingButton(null);
      if (resp && 'data' in resp) {
        EmptyData();
      } else {
        console.error('Failed to create medications:', resp);
      }
    }
  };

  return (
    <>
      <PrescriptionContainer>
        <Flex align={'center'} justify="space-between" py={16}>
          <Text sx={{ fontWeight: 700 }}>Prescribe medication</Text>
          <IconArrowOpened onclick={props.data?.toogleclose} />
        </Flex>
        <Divider orientation="horizontal" size="sm" color={'#DFE2E9'} />
        <BoxPill height={'4em'} style={{ marginTop: '1em' }}>
          {prescriptionState.activePills.length === 0 &&
          (groupedActivePills?.length ?? 0) === 0 ? (
            <>
              <Box style={{ background: '#ffffff', borderRadius: '10px' }}>
                <TextInput
                  placeholder="Search medication"
                  variant="unstyled"
                  value={prescriptionState.mainSearchResult}
                  aria-label={'search-on-prescription'}
                  data-testid={'search-on-prescription'}
                  onChange={handleChange}
                  sx={{
                    '&.mantine-TextInput-root': {
                      width: '100%',
                      paddingLeft: '12px',
                      fontWeight: 500,
                    },
                    '& .mantine-Input-rightSection': {
                      top: `${isOpened ? '-4px' : '8px'}`,
                    },
                    '& .mantine-Input-input': {
                      fontWeight: 500,
                    },
                  }}
                  rightSection={
                    <Box
                      data-testid={'prescription-plus-sign'}
                      onClick={() => {
                        if (prescriptionState.mainSearchResult.length > 2)
                          addItemToActivePills(
                            prescriptionState.mainSearchResult,
                            'Prescription',
                            {
                              productName: prescriptionState.mainSearchResult,
                              isFreeText: true,
                              productSourceType: 'Suggestion',
                            },
                          );
                      }}
                    >
                      <IconPlusColored size={21} fill={appColors.grayLight} />
                    </Box>
                  }
                />
              </Box>
              <ItemHolderDropDown
                ref={dropdownRef}
                isOpened={isOpened}
                data-cy="prescription-medication-suggestion-dropdown"
              >
                {searchedMedications && searchedMedications?.length <= 0 && (
                  <Box
                    sx={{ textAlign: 'center' }}
                    fw={500}
                    onClick={() => setIsOpened(!isOpened)}
                  >
                    Ooop! No result found for your search
                  </Box>
                )}
                <Flex direction={'column'}>
                  {searchedMedications?.map((value, i: number) => {
                    return (
                      <Flex
                        sx={{
                          paddingTop: '5px',
                          paddingBottom: '5px',
                          '&:hover': {
                            backgroundColor: '#F1F3F5',
                            borderRadius: '5px',
                            cursor: 'pointer',
                          },
                        }}
                        aria-label={'get-prescription'}
                        data-testid={'get-prescription'}
                        key={i}
                        align={'center'}
                        justify={'space-between'}
                        columnGap={8}
                        onClick={() =>
                          addSearchedItem(
                            value as SearchProductMedicationForReturnDto,
                          )
                        }
                      >
                        <Flex direction={'column'}>
                          <Text fw={500}>
                            {formatSearchedMedicationName(
                              value as SearchProductMedicationForReturnDto,
                            )}
                          </Text>
                          {value.isAvailable && (
                            <Text c={appColors.text} fw={500}>
                              Qty in stock: {value.totalAmountInStock}{' '}
                              {value.dispensingUnit}
                            </Text>
                          )}
                        </Flex>

                        {value.isAvailable && (
                          <AvailableButton>Available</AvailableButton>
                        )}
                      </Flex>
                    );
                  })}
                </Flex>
              </ItemHolderDropDown>
            </>
          ) : (
            <Flex align={'center'} justify="space-between">
              <AutoScrollContainer
                h={'4em'}
                style={{ marginTop: 5, paddingTop: '0.2em' }}
              >
                {[...prescriptionState.activePills, ...groupedActivePills].map(
                  (item, index) => {
                    if ('value' in item) {
                      // Handle Ungrouped type
                      return (
                        <Box
                          key={`pill-${item.value}-${index}`}
                          px={2}
                          sx={{ textTransform: 'capitalize' }}
                        >
                          <InputsBadge
                            data-testid={`prescription-pill-value-${index}`}
                            sx={{
                              background:
                                item.type === 'Prescription'
                                  ? appColors.fade
                                  : appColors.white,
                            }}
                            onClick={() => {
                              const removedPills =
                                prescriptionState.activePills.filter(
                                  (__, i) => i !== index,
                                );
                              setPrescriptionState({
                                activePills: removedPills,
                              });
                            }}
                            rightSection={
                              <IconClear fill={'#677597'} size={'8'} />
                            }
                          >
                            {item.value}
                          </InputsBadge>
                        </Box>
                      );
                    }
                    // Handle PatientSuggestedMedicationsResponseDto type
                    return (
                      <Box
                        key={`grouped-${item.id}-${index}`}
                        px={2}
                        sx={{ textTransform: 'capitalize' }}
                      >
                        <InputsBadge
                          data-testid={`grouped-pill-value-${index}`}
                          style={{
                            backgroundColor: '#EFDBFF',
                            color: '#360F55',
                          }}
                          onClick={() => {
                            const removedGroupedPills =
                              groupedActivePills.filter(
                                (__, i) =>
                                  i !==
                                  index - prescriptionState.activePills.length,
                              );
                            setGroupedActivePills(removedGroupedPills);
                          }}
                          rightSection={
                            <IconClear fill={'#677597'} size={'8'} />
                          }
                        >
                          {item.name}
                        </InputsBadge>
                      </Box>
                    );
                  },
                )}
              </AutoScrollContainer>
            </Flex>
          )}
        </BoxPill>

        <Box mt={8}>
          <Text
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '0.8em',
              color: '#A6AFC2',
            }}
          >
            Suggested Medications
          </Text>
          <BoxPill height={'120px'}>
            <AutoScrollContainer h={'120px'} style={{ marginTop: 5 }}>
              {patientMedicationSuggestions?.map((val, i) => {
                return (
                  <Box key={i} px={2}>
                    <InputsBadge
                      onClick={() => {
                        if (
                          val.suggestedMedicationType === 'MedicationGroup' &&
                          (groupedActivePills.length ?? 0) === 0
                        ) {
                          addGroupedItemToActivePills(val);
                        }
                      }}
                      style={{ backgroundColor: '#EFDBFF', color: '#360F55' }}
                      rightSection={<IconPlus />}
                    >
                      {val.suggestedMedicationType === 'MedicationGroup'
                        ? formatGroupedMedicationName(val)
                        : null}
                    </InputsBadge>
                  </Box>
                );
              })}
            </AutoScrollContainer>
          </BoxPill>
        </Box>
        {prescriptionState.activePills.length > 0 && (
          <Box sx={{ borderRadius: 10, background: 'white' }} mt={10}>
            <Grid
              grow
              sx={{
                margin: '1rem 0',
              }}
            >
              <Grid.Col
                span={4}
                sx={{
                  '&.mantine-Grid-col': {
                    paddingLeft: 0,
                  },
                }}
              >
                <Text c={'#677597'} fw={600}>
                  Unit(s) & Dosage
                </Text>
                <Flex
                  py={3}
                  align={'center'}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    border: '1px solid #DFE2E9',
                    position: 'relative',
                    height: '48px',
                  }}
                >
                  <Input
                    data-cy="dosage-number"
                    variant="unstyled"
                    placeholder="0"
                    type="number"
                    onChange={handleDose}
                    value={prescriptionState.dosage?.doseValue || ''}
                    style={{
                      flex: 0.3,
                      paddingLeft: 20,
                      fontWeight: 'bold',
                      input: {
                        fontWeight: 500,
                      },
                    }}
                  />
                  <Divider
                    orientation="vertical"
                    size="sm"
                    mt={8}
                    style={{
                      height: '25px',
                    }}
                  />

                  <Select
                    data-cy="dosage-unit"
                    withAsterisk={false}
                    defaultValue=""
                    placeholder="Unit"
                    variant="unstyled"
                    searchable
                    data={
                      dosageData?.unit?.map((p) => ({
                        value: p,
                        label: p,
                      })) || []
                    }
                    value={prescriptionState.dosage?.unit}
                    rightSection={
                      <IconInputArrowDown size={16} fill="#A6AFC2" />
                    }
                    onChange={(newValue) => {}}
                    sx={{
                      flex: 0.7,
                      border: 'none',
                      borderRadius: 'none',
                      paddingLeft: 10,
                      fontWeight: 500,
                      input: {
                        fontWeight: 500,
                      },
                    }}
                  />
                </Flex>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text c={'#677597'} fw={600}>
                  Frequency
                </Text>

                <Flex
                  py={3}
                  align={'center'}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    border: '1px solid #DFE2E9',
                    position: 'relative',
                    height: '48px',
                  }}
                >
                  <Input
                    data-cy="frequency-number"
                    variant="unstyled"
                    placeholder="0"
                    type="number"
                    onChange={handleFrequency}
                    value={prescriptionState.frequency?.frequencyValue || ''}
                    sx={{
                      flex: 0.3,
                      paddingLeft: 20,
                      fontWeight: 'bold',
                      input: {
                        fontWeight: 500,
                      },
                    }}
                  />
                  <Divider
                    orientation="vertical"
                    size="sm"
                    mt={8}
                    sx={{
                      height: '25px',
                    }}
                  />

                  <Select
                    data-cy="frequency-dosage"
                    withAsterisk={false}
                    defaultValue=""
                    placeholder="Frequency"
                    variant="unstyled"
                    searchable
                    data={
                      dosageData?.frequency?.map((p) => ({
                        value: p,
                        label: p,
                      })) || []
                    }
                    value={prescriptionState.frequency?.frequencyUnit}
                    rightSection={
                      <IconInputArrowDown size={16} fill="#A6AFC2" />
                    }
                    onChange={(newValue) => {}}
                    sx={{
                      flex: 0.7,
                      border: 'none',
                      borderRadius: 'none',
                      paddingLeft: 10,
                      fontWeight: 500,
                      input: {
                        fontWeight: 500,
                      },
                    }}
                  />
                </Flex>
              </Grid.Col>
              <Grid.Col
                span={4}
                sx={{
                  '&.mantine-Grid-col': {
                    paddingRight: 0,
                  },
                }}
              >
                <Text c={'#677597'} fw={600}>
                  Duration
                </Text>
                <Flex
                  py={3}
                  align={'center'}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    border: '1px solid #DFE2E9',
                    position: 'relative',
                    height: '48px',
                  }}
                >
                  <Input
                    data-cy="duration-number"
                    variant="unstyled"
                    placeholder="0"
                    type="number"
                    onChange={handleDuration}
                    value={prescriptionState.duration?.durationValue || ''}
                    sx={{
                      flex: 0.3,
                      paddingLeft: 20,
                      fontWeight: 'bold',
                      input: {
                        fontWeight: 500,
                      },
                    }}
                  />
                  <Divider
                    orientation="vertical"
                    size="sm"
                    mt={8}
                    sx={{
                      height: '25px',
                    }}
                  />

                  <Select
                    data-cy="duration-duration"
                    withAsterisk={false}
                    defaultValue=""
                    placeholder="Duration"
                    variant="unstyled"
                    searchable
                    data={
                      dosageData?.duration?.map((p) => ({
                        value: p,
                        label: p,
                      })) || []
                    }
                    value={prescriptionState.duration?.durationUnit}
                    rightSection={
                      <IconInputArrowDown size={16} fill="#A6AFC2" />
                    }
                    onChange={(newValue) => {}}
                    sx={{
                      flex: 0.7,
                      border: 'none',
                      borderRadius: 'none',
                      paddingLeft: 10,
                      fontWeight: 500,
                      input: {
                        fontWeight: 500,
                      },
                    }}
                  />
                </Flex>
              </Grid.Col>
            </Grid>
            <Flex direction={'column'} mt={10}>
              <Text c={'#677597'} fw={600}>
                Directions
              </Text>
              <MultiValueSelect
                dataCy="prescription-direction"
                value={prescriptionState.directions ?? undefined}
                onChange={(newValue) => {
                  setPrescriptionState({
                    directions: newValue ? [...newValue] : null,
                  });
                }}
                options={
                  dosageData?.direction?.map((p) => ({
                    value: p,
                    label: p,
                  })) || []
                }
                placeholder={'Select or type directions'}
                isSearchable={true}
              />
            </Flex>
          </Box>
        )}

        {(groupedActivePills.length ?? 0) > 0 && (
          <Box mt={10}>
            <Flex align={'center'} justify="space-between" py={16}>
              <Text sx={{ fontWeight: 700 }}>Medication groups</Text>
              {openGroupedMedication ? (
                <IconArrowOpened
                  onclick={() => setOpenGroupedMedication(false)}
                />
              ) : (
                <IconUpSmall onclick={() => setOpenGroupedMedication(true)} />
              )}
            </Flex>
            {openGroupedMedication && (
              <>
                <Divider orientation="horizontal" size="sm" color={'#DFE2E9'} />
                <Box mt={20}>
                  <Flex direction={'row'} justify={'space-between'}>
                    <SavedGroupHeader>
                      <Text
                        color="#677597"
                        sx={{ fontSize: '17px', whiteSpace: 'pre-wrap' }}
                      >
                        {groupedActivePills?.[0]?.name ?? ''}
                      </Text>
                    </SavedGroupHeader>

                    <Flex justify={'flex-end'} gap={20} mb={15}>
                      <Button
                        sx={{
                          borderRadius: '10px',
                          background: appColors.white,
                          color:
                            groupedMedicationMode === 'undo'
                              ? appColors.blue
                              : appColors.lowerText,
                          borderWidth: 1,
                          borderColor:
                            groupedMedicationMode === 'undo'
                              ? appColors.blue
                              : appColors.lowerText,
                          '&:hover': {
                            background: appColors.blue,
                            color: appColors.white,
                          },
                        }}
                        onClick={() => {
                          setGroupedMedicationMode('undo');
                          if (removedGroupSummaries.length > 0) {
                            const lastRemoved =
                              removedGroupSummaries[
                                removedGroupSummaries.length - 1
                              ];
                            setGroupStateSummaries?.((prev) => [
                              ...(prev ?? []),
                              lastRemoved,
                            ]);
                            setRemovedGroupSummaries((prev) =>
                              prev.slice(0, -1),
                            );
                          }
                        }}
                      >
                        Undo
                      </Button>
                      <Button
                        sx={{
                          borderRadius: '10px',
                          background: appColors.white,
                          color:
                            groupedMedicationMode === 'edit'
                              ? appColors.blue
                              : appColors.lowerText,
                          borderWidth: 1,
                          borderColor:
                            groupedMedicationMode === 'edit'
                              ? appColors.blue
                              : appColors.lowerText,
                          '&:hover': {
                            background: appColors.blue,
                            color: appColors.white,
                          },
                        }}
                        onClick={() => {
                          setGroupedMedicationMode('edit');
                          setIsEditGroup({ isOpen: true });
                        }}
                      >
                        Edit
                      </Button>
                    </Flex>
                  </Flex>

                  <Box
                    sx={{
                      backgroundColor: appColors.white,
                      borderRadius: '10px',
                    }}
                  >
                    <BoxPill height={'7em'}>
                      <AutoScrollContainer h={'7em'} style={{ marginTop: 3 }}>
                        {stateSummaries?.map(({ summary }, index) => (
                          <InputsBadge mt={10} mx={10} key={index}>
                            <Flex
                              data-testid={`draft-${index}`}
                              align={'flex-start'}
                              justify={'space-between'}
                              mt={2}
                              key={index}
                              px={10}
                            >
                              <Text span>
                                <Text
                                  span
                                  data-testid={`draft-message-${index}`}
                                >
                                  {summary}
                                </Text>
                              </Text>

                              <Flex align={'center'} pt={4} ml={10}>
                                <IconCloseX
                                  fill={'#0B0C7D'}
                                  size={12}
                                  data-testid={`delete-group-medication-${index}`}
                                  onclick={() => {
                                    const removedItem =
                                      groupStateSummaries?.[index];
                                    const newStates =
                                      groupStateSummaries?.filter(
                                        (_, i) => i !== index,
                                      );
                                    setGroupedMedicationMode('undo');
                                    setGroupStateSummaries?.(newStates ?? []);
                                    if (removedItem) {
                                      setRemovedGroupSummaries((prev) => [
                                        ...prev,
                                        removedItem,
                                      ]);
                                    }
                                  }}
                                />
                              </Flex>
                            </Flex>
                          </InputsBadge>
                        ))}
                      </AutoScrollContainer>
                    </BoxPill>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        )}

        <Box sx={{ borderRadius: 10, background: 'white' }}>
          <PreSave
            inputFieldName={'prescription'}
            states={states}
            setUpdatedGroupedActivePills={setUpdatedGroupedActivePills}
            setGroupedActivePills={setGroupedActivePills}
            updatedGroupedActivePills={updatedGroupedActivePills}
            groupedActivePills={groupedActivePills}
            tempState={prescriptionState}
            isMainInputEnabled={
              (prescriptionState.activePills.length > 0 &&
                prescriptionState.dosage !== null) ||
              groupedActivePills.length > 0
            }
            stateSummaries={states.map((p) => ({
              summary: createSummaryDescription(p),
              mainSearchResult: '',
            }))}
            setStateCallback={setPrescriptionStates}
            initialState={initialPrescriptionState}
          />

          <Flex justify={'flex-end'} mt={16} mb={24} gap={20}>
            <Button
              data-cy="save-and-create-group"
              sx={{
                borderRadius: '10px',
                background: appColors.white,
                color: appColors.blue,
                borderWidth: 1,
                borderColor: appColors.blue,
                '&:hover': {
                  color: appColors.white,
                },
              }}
              onClick={() => onSave('continue')}
              disabled={
                (states.length === 0 &&
                  updatedGroupedActivePills.length === 0) ||
                loadingButton === 'continue'
              }
              loading={loadingButton === 'continue'}
            >
              Save & create group
            </Button>
            <Button
              data-cy="save-prescription-button"
              sx={{
                borderRadius: '10px',
                background: appColors.frenchBlue,
                '&:hover': {
                  background: '#27AE60',
                },
              }}
              onClick={() => onSave('finish')}
              disabled={
                (states.length === 0 &&
                  updatedGroupedActivePills.length === 0) ||
                loadingButton === 'finish'
              }
              loading={loadingButton === 'finish'}
            >
              Save
            </Button>
          </Flex>
          <Divider
            orientation="horizontal"
            size="sm"
            color={'#EFF1F4'}
            mb={16}
          />
        </Box>

        <ItemListVerticalScrollWrapper height={200}>
          {notesData?.map((val, index) => (
            <Stack pb={30} key={index}>
              <GridWrapperThreeCol>
                <Box
                  sx={{ fontSize: 14, color: '#7A90C2', lineHeight: '17px' }}
                  className="attribute-container date-col"
                >
                  <Box
                    sx={{
                      textDecoration: val.isDiscontinued
                        ? 'line-through'
                        : 'none',
                    }}
                  >
                    <Box>
                      {momentBrowserTimezone(val.creationTime).format(
                        'hh:mm A',
                      )}
                    </Box>
                    <Box sx={{ whiteSpace: 'pre-wrap' }}>
                      {momentBrowserTimezone(val.creationTime)
                        .startOf('day')
                        .isSame(momentBrowserTimezone().startOf('day'))
                        ? 'Today'
                        : momentBrowserTimezone(val.creationTime).format('LL')}
                    </Box>
                  </Box>
                </Box>
                <Box
                  component="div"
                  ml={16}
                  className="attribute-container main-col"
                >
                  <Box>
                    <Stack sx={{ fontWeight: 500 }} gap={6}>
                      <Flex
                        style={{
                          flexWrap: 'wrap',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        <Text
                          w={'100%'}
                          fw={500}
                          sx={{
                            textDecoration:
                              val.isDiscontinued || val.isDeleted
                                ? 'line-through'
                                : 'none',
                          }}
                        >
                          {val.summary}{' '}
                        </Text>
                        <Text fw={500} color={appColors.text}>
                          {val.isDiscontinued && (
                            <>
                              {val.isDiscontinued
                                ? `Discontinued by ${val.discontinueUser}`
                                : ''}
                            </>
                          )}
                        </Text>
                        {!val.isDiscontinued && (
                          <>
                            <Text fw={500} color={appColors.green}>
                              {val.isAdministered && (
                                <>
                                  {val.isAdministered ? (
                                    <Group gap={10}>
                                      <Text>Medication is administered</Text>
                                      <IconMedicalCross size={16} />
                                    </Group>
                                  ) : (
                                    ''
                                  )}
                                </>
                              )}
                            </Text>
                          </>
                        )}
                        {val.isDeleted && (
                          <Text fw={500} color={appColors.text}>
                            Deleted by {val.deletedUser}{' '}
                            {val.creationTime === null ? (
                              ''
                            ) : (
                              <>
                                |&nbsp;
                                {momentBrowserTimezone(
                                  val.creationTime as string,
                                ).format('hh:mm A')}{' '}
                                {momentBrowserTimezone(
                                  val.creationTime as string,
                                )
                                  .startOf('day')
                                  .isSame(
                                    momentBrowserTimezone().startOf('day'),
                                  )
                                  ? 'Today'
                                  : `on ${momentBrowserTimezone(
                                      val.creationTime as string,
                                    ).format('LL')}`}
                              </>
                            )}
                          </Text>
                        )}
                      </Flex>
                    </Stack>
                  </Box>
                </Box>

                <Box component="span" className="attribute-container caret-col">
                  <Menu
                    shadow="lg"
                    position={'bottom-end'}
                    offset={{ mainAxis: -15, crossAxis: -10 }}
                  >
                    <Menu.Target>
                      <Box component="span" mx={20}>
                        <IconThreeDots size={14} />
                      </Box>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {investigationsSummaryActions.map((action) => (
                        <Menu.Item
                          key={action.id}
                          fw={600}
                          w={'100%'}
                          onClick={() => {
                            if (action.name === 'Download prescription') {
                              action.action(val.sessionId as number);
                            } else {
                              action.action(val.id as number);
                            }
                          }}
                          disabled={
                            val.isDiscontinued ||
                            (action.name === 'Mark as administered' &&
                              val.isAdministered)
                          }
                          sx={{
                            fontSize: 14,
                            color: action.danger
                              ? appColors.red
                              : appColors.black,
                          }}
                        >
                          <span>{action.name}</span>
                        </Menu.Item>
                      ))}
                    </Menu.Dropdown>
                  </Menu>
                </Box>
              </GridWrapperThreeCol>
              <Divider orientation="horizontal" size="sm" color={'#EFF1F4'} />
            </Stack>
          ))}
        </ItemListVerticalScrollWrapper>
      </PrescriptionContainer>
      {props.dischargeExport ? null : (
        <CustomOptionSelect
          title=""
          showSubtitle={false}
          placeholder={'Add procedure'}
          strappedText={'Vaccination'}
          isVitalSign={false}
          showTabPanel={false}
          tabName="Medication"
        >
          <Vaccination
            encounterId={Number(props.encounterId)}
            patientId={props.patientId}
          />
        </CustomOptionSelect>
      )}
    </>
  );
};

export default Prescription;
