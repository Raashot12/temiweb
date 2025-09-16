import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { DefaultInputState } from '@/state/features/allInput/genericTypes';
// Temporarily define ProductSourceType locally until API is available
type ProductSourceType = 'internal' | 'external' | 'pharmacy';
import type { RootState } from '../../store';

export type Pill = {
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
  productSourceType?: ProductSourceType;
};

export type PrescriptionState = DefaultInputState & {
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

export const initialState = {
  prescriptionState: {
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
  },
  states: [],
} as {
  states: PrescriptionState[];
  prescriptionState: PrescriptionState;
};

const prescriptionSlice = createSlice({
  name: 'AllPrescriptionStates',
  initialState,
  reducers: {
    setPrescriptionState: (state, action) => {
      state.prescriptionState = _.mergeWith(
        state.prescriptionState,
        action.payload,
        // eslint-disable-next-line consistent-return
        (objValue, srcValue) => {
          if (_.isArray(objValue)) {
            return srcValue;
          }
        }
      );
    },
    setPrescriptionStates: (state, action) => {
      state.states = action.payload;
    },
  },
});

export const { setPrescriptionStates, setPrescriptionState } =
  prescriptionSlice.actions;

// Static mock data for development - replace with actual selectors when API is ready
export const selectStates = (state: RootState): PrescriptionState[] => {
  return [
    {
      mainSearchResult: 'Paracetamol 500mg',
      note: 'Take with food',
      activePills: [
        {
          value: 'paracetamol-500',
          type: 'tablet',
          productId: 1,
          source: 'pharmacy',
          name: 'Paracetamol',
          isFreeText: false,
          brandName: 'Panadol',
          doseFormName: 'Tablet',
          doseStrengthName: '500mg',
          genericsSctName: 'Acetaminophen',
          snomedId: '387517004',
          productSourceType: 'pharmacy' as ProductSourceType,
        },
      ],
      dosage: { doseValue: '1', unit: 'tablet' },
      duration: { durationValue: '7', durationUnit: 'days' },
      frequency: { frequencyValue: '3', frequencyUnit: 'times daily' },
      directions: [
        { value: 'with_food', label: 'Take with food' },
        { value: 'after_meal', label: 'Take after meals' },
      ],
      minimumAge: 12,
      maximumAge: 65,
      minimumWeight: 40,
      maximumWeight: 100,
      medicationGroupGenders: [{ gender: 'all' }],
      type: 'oral',
    },
    {
      mainSearchResult: 'Amoxicillin 250mg',
      note: 'Complete the full course',
      activePills: [
        {
          value: 'amoxicillin-250',
          type: 'capsule',
          productId: 2,
          source: 'internal',
          name: 'Amoxicillin',
          isFreeText: false,
          brandName: 'Amoxil',
          doseFormName: 'Capsule',
          doseStrengthName: '250mg',
          genericsSctName: 'Amoxicillin',
          snomedId: '27658006',
          productSourceType: 'internal' as ProductSourceType,
        },
      ],
      dosage: { doseValue: '2', unit: 'capsules' },
      duration: { durationValue: '10', durationUnit: 'days' },
      frequency: { frequencyValue: '2', frequencyUnit: 'times daily' },
      directions: [
        { value: 'empty_stomach', label: 'Take on empty stomach' },
        { value: 'complete_course', label: 'Complete the full course' },
      ],
      minimumAge: 6,
      maximumAge: null,
      minimumWeight: 20,
      maximumWeight: null,
      medicationGroupGenders: [{ gender: 'all' }],
      type: 'antibiotic',
    },
  ];
};

export const selectPrescriptionState = (
  state: RootState
): PrescriptionState => {
  return {
    mainSearchResult: 'Ibuprofen 400mg',
    note: 'Take with plenty of water',
    activePills: [
      {
        value: 'ibuprofen-400',
        type: 'tablet',
        productId: 3,
        source: 'external',
        name: 'Ibuprofen',
        isFreeText: false,
        brandName: 'Advil',
        doseFormName: 'Tablet',
        doseStrengthName: '400mg',
        genericsSctName: 'Ibuprofen',
        snomedId: '387207008',
        productSourceType: 'external' as ProductSourceType,
      },
    ],
    dosage: { doseValue: '1', unit: 'tablet' },
    duration: { durationValue: '5', durationUnit: 'days' },
    frequency: { frequencyValue: '3', frequencyUnit: 'times daily' },
    directions: [
      { value: 'with_water', label: 'Take with plenty of water' },
      { value: 'with_food', label: 'Take with food to reduce stomach irritation' },
    ],
    minimumAge: 18,
    maximumAge: null,
    minimumWeight: 50,
    maximumWeight: null,
    medicationGroupGenders: [{ gender: 'all' }],
    type: 'anti-inflammatory',
  };
};

export default prescriptionSlice.reducer;
