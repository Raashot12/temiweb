import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import type { RootState } from '../../store';

export type VaccineState = {
  search: string;
  activePills: string;
  vaccinationRecords: VaccinationRecord[];
  history: Array<VaccinationHistory & { lastVaccineDurationUnit: string }>;
};

export type VaccinationHistory = {
  patientId: number;
  vaccineId: number;
  hasComplication: boolean;
  lastVaccineDuration: string;
  note: string;
  encounterId: number;
};

export type VaccinationRecord = {
  dueDate: string;
  patientId: number;
  encounterId: number;
  vaccineId: number;
  vaccineScheduleId: number;
  isAdministered: boolean;
  dateAdministered: string;
  hasComplication: boolean;
  vaccineBrand: string;
  vaccineBatchNo: string;
  note: string;
};

export type Vaccine = {
  id?: string;
  acronym?: string;
  name?: string;
  doses?: Array<Dose>;
};

export type Dose = {
  id?: string;
  name?: string;
  dueDate: string;
  dueDateValue: number;
  dueDateUnit: 'day' | 'week' | 'year' | 'month';
};

export type Vaccination = {
  id?: string;
  name?: string;
  vaccines?: Array<Vaccine>;
};

export const initialState = {
  vaccineState: {
    search: '',
    activePills: '',
    history: [],
    vaccinationRecords: [],
  },
  states: [],
} as {
  states: VaccineState[];
  vaccineState: VaccineState;
};

const vaccination = createSlice({
  name: 'AllVaccinationStates',
  initialState,
  reducers: {
    setVaccineState: (state, action) => {
      state.vaccineState = _.mergeWith(
        state.vaccineState,
        action.payload,
        // eslint-disable-next-line consistent-return
        (objValue, srcValue) => {
          if (_.isArray(objValue)) {
            return srcValue;
          }
        }
      );
    },
    setVaccineStates: (state, action) => {
      state.states = action.payload;
    },
  },
});

export const { setVaccineState, setVaccineStates } = vaccination.actions;

export const selectStates = (state: RootState): VaccineState[] => {
  return state.vaccination.states;
};

export const selectVaccineState = (state: RootState): VaccineState => {
  return state.vaccination.vaccineState;
};

export default vaccination.reducer;
