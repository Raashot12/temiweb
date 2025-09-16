import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { DefaultInputState } from '@/state/features/allInput/genericTypes';
import type { RootState } from '../../store';

export type FreeTextMedication = {
  productName: string;
};
export type Pill = {
  value: string;
  type: string;
  freeTextMedication?: FreeTextMedication;
};

export type MedicationAdministrationState = DefaultInputState & {
  mainSearchResult: string;
  note: string;
  activePills: Pill[];
  type?: 'Administer' | 'Prescribe';
  dosage: { doseValue: string; unit: string } | null;
  duration: { durationValue: string; durationUnit: string } | null;
  frequency: {
    frequencyValue: string;
    frequencyUnit: string;
  } | null;
  directions: { value: string; label: string }[] | null;
};

export const initialState = {
  medicationAdministrationState: {
    mainSearchResult: '',
    activePills: [],
    note: '',
    isAdminister: false,
    dosage: null,
    type: undefined,
    duration: null,
    frequency: null,
    directions: [],
  },
  states: [],
} as {
  states: MedicationAdministrationState[];
  medicationAdministrationState: MedicationAdministrationState;
};

const medicationAdministrationSlice = createSlice({
  name: 'AllMedicationAdministrationStates',
  initialState,
  reducers: {
    setMedicationAdministrationState: (state, action) => {
      state.medicationAdministrationState = _.mergeWith(
        state.medicationAdministrationState,
        action.payload,
        // eslint-disable-next-line consistent-return
        (objValue, srcValue) => {
          if (_.isArray(objValue)) {
            return srcValue;
          }
        }
      );
    },
    setMedicationAdministrationStates: (state, action) => {
      state.states = action.payload;
    },
  },
});

export const {
  setMedicationAdministrationStates,
  setMedicationAdministrationState,
} = medicationAdministrationSlice.actions;

export const selectStates = (
  state: RootState
): MedicationAdministrationState[] => {
  // TODO: Replace with actual state data when ready
  return [
    {
      mainSearchResult: 'Paracetamol 500mg',
      activePills: [
        {
          value: 'Paracetamol 500mg',
          type: 'Administer',
          freeTextMedication: { productName: 'Paracetamol 500mg' },
        },
      ],
      note: 'Administered for pain relief',
      dosage: { doseValue: '500', unit: 'mg' },
      type: 'Administer' as const,
      duration: { durationValue: '3', durationUnit: 'days' },
      frequency: { frequencyValue: '2', frequencyUnit: 'times daily' },
      directions: [{ value: 'Take with food', label: 'Take with food' }],
    },
  ];
};

export const selectMedicationAdministrationState = (
  state: RootState
): MedicationAdministrationState => {
  // TODO: Replace with actual state data when ready
  return {
    mainSearchResult: '',
    activePills: [],
    note: '',
    dosage: null,
    type: undefined,
    duration: null,
    frequency: null,
    directions: [],
  };
};

export default medicationAdministrationSlice.reducer;
