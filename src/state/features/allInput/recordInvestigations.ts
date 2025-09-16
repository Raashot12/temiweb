import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _, { uniqBy } from 'lodash';
import type { RootState } from '../../store';

export type InvestigationComponentsProps = {
  id: number;
  tenantId?: number;
  category?: string;
  name?: string;
  result?: string;
  numericResult?: number | null;
  reference?: string;
  rangeMin: number;
  rangeMax: number;
  unit: string;
  subCategory?: string;
};

export type SavedFile = {
  id: string;
  name: string;
};

export type ImageProps = {
  id?: string | number;
  imageSrc?: string;
  file?: File | Blob | SavedFile;
  blob?: string | Blob;
};
interface AutocompleteItem {
  value: string;
  [key: string]: string;
}
export interface PillExtra extends Pill {
  count?: number | string | null;
  selected?: string;
}

type CombinedProps = {
  value?: string;
  type?: string;
};

export type RecordInvestigationsState = {
  note: string;
  chemistry: Chemistry;
  haematology: Haematology;
  microbiology: Microbiology;
  serology: Serology;
  radiology: Radiology;
  electrophysiology: Electrophysiology;
  histopathology: Histopathology;
  others: Others;
};

export type Chemistry = {
  activePills: Array<Pill>;
  textNote: string;
  conclusionNote: string;
  conclusionPills: ConclusionPill[];
  dateSample: Date | null;
  timeSample: string | null;
  dateResult: Date | null;
  timeResult: string | null;
  substanceType: string[];
  rangeValues: number[];
  investigationComponents: Array<InvestigationComponentsProps>;
};

export type Haematology = {
  activePills: Array<Pill>;
  textNote: string;
  mainSearchResult: string;
  conclusionNote: string;
  conclusionPills: ConclusionPill[];
  dateSample: Date | null;
  timeSample: string | null;
  dateResult: Date | null;
  timeResult: string | null;
  substanceType: string[];
  rangeValues: number[];
  investigationComponents: Array<InvestigationComponentsProps>;
};

interface MergePayload {
  category?: string;
  items: InvestigationComponentsProps[];
}

export type Microbiology = {
  onSave: string;
  activePills: Array<Pill>;
  textNote: string;
  conclusionNote: string;
  conclusionPills: ConclusionPill[];
  dateSample: Date | null;
  timeSample: string | null;
  dateResult: Date | null;
  timeResult: string | null;
  tab: {
    specimen: {
      combinedPills: Array<CombinedProps>;
      widal: {
        selectedOAntigue: string;
        selectedHAntigue: string;
      };
      fluidCulture: {
        nugentScore: number;
        selectedCell: string;
      };
      geneXpert: {
        selectedCell: string;
        selectedResistance: string;
      };
      malariaRDT: {
        selectedCell: string;
      };
      mantoux: {
        nugentScore: number;
        selectedCell: string;
      };
      occultBlood: {
        selectedCell: string;
      };
      sputum: {
        cellCount: number;
        selectedCell: string;
      };
      bloodGroup: {
        bloodType: string;
        resultType: string;
      };
      genoType: {
        selectedType: string;
      };
      ova: {
        selectedType: string;
      };
      extended: {
        selectedType: string;
      };
      microfilariae: {
        selectedType: string;
      };
      seminalFluid: {
        timeProduced: null | string;
        timeReceived: null | string;
        timeExamined: null | string;
        chosenMethod: string;
        viscosity: string;
        liquefaction: string;
        fructose: string;
        odour: string;
      };
    };
    gramStain: {
      nugentScore: number;
      selectedCell: string;
      textNote: string;
      activePills: Array<PillExtra>;
    };
    microscopy: {
      cellCount: number;
      selectedCell: string;
      textNote: string;
      activePills: Array<PillExtra>;
    };
    culture: {
      colonyCount: number | null;
      textNote: string;
      activePills: Array<PillExtra>;
    };
    macroscopy: {
      textNote: string;
      activePills: Array<Pill>;
      combinedPills: Array<CombinedProps>;
    };
    blueStain: {
      textNote: string;
      activePills: Array<Pill>;
    };
  };
  investigationComponents: Array<InvestigationComponentsProps>;
};

export type Histopathology = {
  onSave: string;
  activePills: Array<Pill>;
  textNote: string;
  conclusionNote: string;
  conclusionPills: ConclusionPill[];
  dateSample: Date | null;
  timeSample: string | null;
  dateResult: Date | null;
  timeResult: string | null;
  diagnosis: AutocompleteItem[];
  tab: {
    specimen: {
      combinedPills: Array<CombinedProps>;
    };
    microscopy: {
      cellCount: number;
      selectedCell: string;
      textNote: string;
      activePills: Array<PillExtra>;
    };
    macroscopy: {
      textNote: string;
      activePills: Array<Pill>;
      combinedPills: Array<CombinedProps>;
    };
  };
  investigationComponents: Array<InvestigationComponentsProps>;
};

export type Serology = {
  activePills: Array<Pill>;
  textNote: string;
  conclusionNote: string;
  conclusionPills: ConclusionPill[];
  dateSample: Date | null;
  timeSample: string | null;
  dateResult: Date | null;
  timeResult: string | null;
  substanceType: string[];
  rangeValues: number[];
  specimen: {
    hepatitisBSurface: string;
    hepatitisProfile: {
      first: string;
      second: string;
      third: string;
      forth: string;
      fifth: string;
      sixth: string;
    };
    count: {
      number: string | null;
      type: string;
      minRange: string | null;
      maxRange: string | null;
    };
  };
  investigationComponents: Array<InvestigationComponentsProps>;
};
export type Radiology = {
  conclusionNote: string;
  conclusionPills: ConclusionPill[];
  dateSample: Date | null;
  timeSample: string | null;
  investigationComponents: Array<InvestigationComponentsProps>;
};
export type Electrophysiology = {
  conclusionNote: string;
  conclusionPills: ConclusionPill[];
  dateSample: Date | null;
  timeSample: string | null;
  investigationComponents: Array<InvestigationComponentsProps>;
};

export type Others = {
  name?: string;
  description?: string;
  conclusionNote: string;
  conclusionPills: ConclusionPill[];
  dateSample: Date | null;
  timeSample: string | null;
  investigationComponents: Array<InvestigationComponentsProps>;
};

export type Pill = {
  value: string;
  type?: string;
  tab?: string;
  normal?: boolean;
  snowmedId?: string;
};

export type ConclusionPill = {
  value: string;
  snowmedId?: number | string;
  type?: string | null;
};

export const initialState = {
  recordInvestigationsState: {
    note: '',
    chemistry: {
      textNote: '',
      activePills: [],
      conclusionNote: '',
      conclusionPills: [],
      dateSample: null,
      timeSample: null,
      dateResult: null,
      timeResult: null,
      substanceType: [],
      rangeValues: [],
      investigationComponents: [],
    },
    haematology: {
      textNote: '',
      mainSearchResult: '',
      activePills: [],
      conclusionNote: '',
      conclusionPills: [],
      dateSample: null,
      timeSample: null,
      dateResult: null,
      timeResult: null,
      substanceType: [],
      rangeValues: [],
      investigationComponents: [],
    },
    microbiology: {
      onSave: '',
      textNote: '',
      activePills: [],
      conclusionNote: '',
      conclusionPills: [],
      dateSample: null,
      timeSample: null,
      dateResult: null,
      timeResult: null,
      tab: {
        specimen: {
          combinedPills: [],
          widal: {
            selectedOAntigue: '',
            selectedHAntigue: '',
          },
          fluidCulture: {
            nugentScore: 0,
            selectedCell: '',
          },
          geneXpert: {
            selectedCell: '',
            selectedResistance: '',
          },
          malariaRDT: {
            selectedCell: '',
          },
          mantoux: {
            nugentScore: 0,
            selectedCell: '',
          },
          occultBlood: {
            selectedCell: '',
          },
          sputum: {
            cellCount: 0,
            selectedCell: '',
          },
          bloodGroup: {
            bloodType: '',
            resultType: '',
          },
          genoType: {
            selectedType: '',
          },
          ova: {
            selectedType: '',
          },
          extended: {
            selectedType: '',
          },
          microfilariae: {
            selectedType: '',
          },
          seminalFluid: {
            timeProduced: null,
            timeReceived: null,
            timeExamined: null,
            chosenMethod: '',
            liquefaction: '',
            fructose: '',
            odour: '',
            viscosity: '',
          },
        },
        gramStain: {
          nugentScore: 0,
          selectedCell: '',
          textNote: '',
          activePills: [],
        },
        microscopy: {
          cellCount: 0,
          selectedCell: '',
          textNote: '',
          activePills: [],
        },
        culture: {
          colonyCount: null,
          textNote: '',
          activePills: [],
        },
        macroscopy: {
          textNote: '',
          activePills: [],
          combinedPills: [],
        },
        blueStain: {
          textNote: '',
          activePills: [],
        },
      },
      investigationComponents: [],
    },
    histopathology: {
      onSave: '',
      textNote: '',
      activePills: [],
      conclusionNote: '',
      conclusionPills: [],
      dateSample: null,
      timeSample: null,
      dateResult: null,
      timeResult: null,
      diagnosis: [],
      tab: {
        specimen: {
          combinedPills: [],
        },
        microscopy: {
          cellCount: 0,
          selectedCell: '',
          textNote: '',
          activePills: [],
        },
        macroscopy: {
          textNote: '',
          activePills: [],
          combinedPills: [],
        },
      },
      investigationComponents: [],
    },
    serology: {
      textNote: '',
      activePills: [],
      conclusionNote: '',
      conclusionPills: [],
      dateSample: null,
      timeSample: null,
      dateResult: null,
      timeResult: null,
      substanceType: [],
      rangeValues: [],
      specimen: {
        hepatitisBSurface: '',
        hepatitisProfile: {
          first: '',
          second: '',
          third: '',
          forth: '',
          fifth: '',
          sixth: '',
        },
        count: {
          number: null,
          type: '',
          minRange: null,
          maxRange: null,
        },
      },
      investigationComponents: [],
    },
    radiology: {
      conclusionNote: '',
      conclusionPills: [],
      dateSample: null,
      timeSample: null,
      investigationComponents: [],
    },
    electrophysiology: {
      conclusionNote: '',
      conclusionPills: [],
      dateSample: null,
      timeSample: null,
      investigationComponents: [],
    },
    others: {
      name: '',
      description: '',
      conclusionNote: '',
      conclusionPills: [],
      dateSample: null,
      timeSample: null,
      investigationComponents: [],
    },
  },
  states: [],
} as {
  states: RecordInvestigationsState[];
  recordInvestigationsState: RecordInvestigationsState;
};

const recordInvestigationsSlice = createSlice({
  name: 'AllRecordInvestigationsTab',
  initialState,
  reducers: {
    setRecordInvestigationsState: (state, action) => {
      state.recordInvestigationsState = _.mergeWith(
        state.recordInvestigationsState,
        action.payload,
        // eslint-disable-next-line consistent-return
        (objValue, srcValue) => {
          if (_.isArray(objValue)) {
            return srcValue;
          }
        }
      );
    },
    mergeInvestigationComponents: (
      state,
      action: PayloadAction<MergePayload>
    ) => {
      const { category, items } = action.payload;
      // Remove existing components for this category.
      const filteredExisting =
        state.recordInvestigationsState.microbiology.investigationComponents.filter(
          (comp) => comp.category !== category
        );
      // Merge new items with the filtered ones.
      state.recordInvestigationsState.microbiology.investigationComponents =
        uniqBy([...filteredExisting, ...items], 'id');
    },
    setInvestigationsStates: (state, action) => {
      state.states = action.payload;
    },
    clearInvestigationComponents(state) {
      state.recordInvestigationsState.microbiology =
        initialState?.recordInvestigationsState?.microbiology;
    },
  },
});

export const {
  setInvestigationsStates,
  setRecordInvestigationsState,
  clearInvestigationComponents,
  mergeInvestigationComponents,
} = recordInvestigationsSlice.actions;

// Static mock data for development - replace with actual selectors when API is ready
export const selectStates = (state: RootState): RecordInvestigationsState[] => {
  return [
    {
      note: 'Complete blood count and liver function tests ordered',
      chemistry: {
        activePills: [
          { value: 'glucose', type: 'blood', normal: true, snowmedId: '33747003' },
          { value: 'creatinine', type: 'serum', normal: false, snowmedId: '70901006' },
        ],
        textNote: 'Elevated creatinine levels observed',
        conclusionNote: 'Kidney function monitoring required',
        conclusionPills: [
          { value: 'renal impairment', snowmedId: '236423003', type: 'diagnosis' },
        ],
        dateSample: new Date('2024-01-15'),
        timeSample: '09:30',
        dateResult: new Date('2024-01-16'),
        timeResult: '14:45',
        substanceType: ['glucose', 'creatinine', 'urea'],
        rangeValues: [120, 1.8, 45],
        investigationComponents: [
          {
            id: 1,
            tenantId: 1,
            category: 'chemistry',
            name: 'Glucose',
            result: '120 mg/dL',
            numericResult: 120,
            reference: '70-100 mg/dL',
            rangeMin: 70,
            rangeMax: 100,
            unit: 'mg/dL',
            subCategory: 'metabolic',
          },
        ],
      },
      haematology: {
        activePills: [
          { value: 'hemoglobin', type: 'blood', normal: true, snowmedId: '38082009' },
          { value: 'wbc', type: 'blood', normal: false, snowmedId: '767002' },
        ],
        textNote: 'Elevated white blood cell count',
        mainSearchResult: 'Complete Blood Count',
        conclusionNote: 'Possible infection indicated',
        conclusionPills: [
          { value: 'leukocytosis', snowmedId: '414478003', type: 'finding' },
        ],
        dateSample: new Date('2024-01-15'),
        timeSample: '09:30',
        dateResult: new Date('2024-01-16'),
        timeResult: '11:20',
        substanceType: ['hemoglobin', 'wbc', 'platelets'],
        rangeValues: [14.2, 12000, 250000],
        investigationComponents: [
          {
            id: 2,
            tenantId: 1,
            category: 'haematology',
            name: 'Hemoglobin',
            result: '14.2 g/dL',
            numericResult: 14.2,
            reference: '12-16 g/dL',
            rangeMin: 12,
            rangeMax: 16,
            unit: 'g/dL',
            subCategory: 'blood',
          },
        ],
      },
      microbiology: {
        onSave: 'culture_pending',
        activePills: [
          { value: 'e_coli', type: 'bacteria', normal: false, snowmedId: '112283007' },
        ],
        textNote: 'E. coli growth observed',
        conclusionNote: 'Urinary tract infection confirmed',
        conclusionPills: [
          { value: 'uti', snowmedId: '68566005', type: 'diagnosis' },
        ],
        dateSample: new Date('2024-01-15'),
        timeSample: '10:00',
        dateResult: new Date('2024-01-18'),
        timeResult: '16:30',
        tab: {
          specimen: {
            combinedPills: [{ value: 'urine', type: 'specimen' }],
            widal: { selectedOAntigue: 'negative', selectedHAntigue: 'negative' },
            fluidCulture: { nugentScore: 0, selectedCell: 'none' },
            geneXpert: { selectedCell: 'negative', selectedResistance: 'none' },
            malariaRDT: { selectedCell: 'negative' },
            mantoux: { nugentScore: 0, selectedCell: 'negative' },
            occultBlood: { selectedCell: 'negative' },
            sputum: { cellCount: 0, selectedCell: 'none' },
            bloodGroup: { bloodType: 'A+', resultType: 'confirmed' },
            genoType: { selectedType: 'normal' },
            ova: { selectedType: 'none' },
            extended: { selectedType: 'standard' },
            microfilariae: { selectedType: 'negative' },
            seminalFluid: {
              timeProduced: '08:00',
              timeReceived: '08:30',
              timeExamined: '09:00',
              chosenMethod: 'direct',
              viscosity: 'normal',
              liquefaction: '20min',
              fructose: 'positive',
              odour: 'normal',
            },
          },
          gramStain: {
            nugentScore: 3,
            selectedCell: 'gram_negative',
            textNote: 'Gram-negative rods observed',
            activePills: [
              { value: 'gram_negative_rods', count: 'many', selected: 'positive' },
            ],
          },
          microscopy: {
            cellCount: 100000,
            selectedCell: 'bacteria',
            textNote: 'Significant bacteriuria',
            activePills: [
              { value: 'bacteria', count: '>100000', selected: 'positive' },
            ],
          },
          culture: {
            colonyCount: 100000,
            textNote: 'Heavy growth of E. coli',
            activePills: [
              { value: 'e_coli', count: 'heavy_growth', selected: 'positive' },
            ],
          },
          macroscopy: {
            textNote: 'Cloudy urine with strong odor',
            activePills: [
              { value: 'cloudy', type: 'appearance' },
              { value: 'strong_odor', type: 'smell' },
            ],
            combinedPills: [{ value: 'abnormal', type: 'overall' }],
          },
          blueStain: {
            textNote: 'No specific findings',
            activePills: [],
          },
        },
        investigationComponents: [
          {
            id: 3,
            tenantId: 1,
            category: 'microbiology',
            name: 'Urine Culture',
            result: 'E. coli >100,000 CFU/mL',
            numericResult: 100000,
            reference: '<10,000 CFU/mL',
            rangeMin: 0,
            rangeMax: 10000,
            unit: 'CFU/mL',
            subCategory: 'culture',
          },
        ],
      },
      serology: {
        activePills: [
          { value: 'hbsag', type: 'antigen', normal: true, snowmedId: '165806002' },
        ],
        textNote: 'Hepatitis B surface antigen negative',
        conclusionNote: 'No evidence of hepatitis B infection',
        conclusionPills: [
          { value: 'hbsag_negative', snowmedId: '165806002', type: 'result' },
        ],
        dateSample: new Date('2024-01-15'),
        timeSample: '09:45',
        dateResult: new Date('2024-01-16'),
        timeResult: '13:15',
        substanceType: ['hbsag', 'anti_hbc', 'anti_hbs'],
        rangeValues: [0.1, 0.05, 12.5],
        specimen: {
          hepatitisBSurface: 'negative',
          hepatitisProfile: {
            first: 'negative',
            second: 'negative',
            third: 'positive',
            forth: 'negative',
            fifth: 'negative',
            sixth: 'negative',
          },
          count: {
            number: '0.1',
            type: 'IU/mL',
            minRange: '0',
            maxRange: '1.0',
          },
        },
        investigationComponents: [
          {
            id: 4,
            tenantId: 1,
            category: 'serology',
            name: 'HBsAg',
            result: 'Negative',
            numericResult: 0.1,
            reference: '<1.0 IU/mL',
            rangeMin: 0,
            rangeMax: 1,
            unit: 'IU/mL',
            subCategory: 'viral_markers',
          },
        ],
      },
      radiology: {
        conclusionNote: 'Chest X-ray shows clear lung fields',
        conclusionPills: [
          { value: 'normal_chest_xray', snowmedId: '168537006', type: 'finding' },
        ],
        dateSample: new Date('2024-01-15'),
        timeSample: '11:00',
        investigationComponents: [
          {
            id: 5,
            tenantId: 1,
            category: 'radiology',
            name: 'Chest X-ray',
            result: 'Normal',
            numericResult: null,
            reference: 'Normal lung fields',
            rangeMin: 0,
            rangeMax: 0,
            unit: '',
            subCategory: 'chest',
          },
        ],
      },
      electrophysiology: {
        conclusionNote: 'ECG shows normal sinus rhythm',
        conclusionPills: [
          { value: 'normal_ecg', snowmedId: '164865005', type: 'finding' },
        ],
        dateSample: new Date('2024-01-15'),
        timeSample: '10:30',
        investigationComponents: [
          {
            id: 6,
            tenantId: 1,
            category: 'electrophysiology',
            name: 'ECG',
            result: 'Normal sinus rhythm',
            numericResult: 72,
            reference: '60-100 bpm',
            rangeMin: 60,
            rangeMax: 100,
            unit: 'bpm',
            subCategory: 'cardiac',
          },
        ],
      },
      histopathology: {
        onSave: 'pending_review',
        activePills: [
          { value: 'inflammatory_cells', type: 'cellular', normal: false },
        ],
        textNote: 'Chronic inflammatory changes observed',
        conclusionNote: 'Consistent with chronic gastritis',
        conclusionPills: [
          { value: 'chronic_gastritis', snowmedId: '4556007', type: 'diagnosis' },
        ],
        dateSample: new Date('2024-01-14'),
        timeSample: '14:00',
        dateResult: new Date('2024-01-18'),
        timeResult: '10:00',
        diagnosis: [
          { value: 'chronic_gastritis', label: 'Chronic Gastritis' },
        ],
        tab: {
          specimen: {
            combinedPills: [{ value: 'gastric_biopsy', type: 'tissue' }],
          },
          microscopy: {
            cellCount: 25,
            selectedCell: 'inflammatory',
            textNote: 'Moderate chronic inflammation',
            activePills: [
              { value: 'lymphocytes', count: 'moderate', selected: 'present' },
              { value: 'plasma_cells', count: 'few', selected: 'present' },
            ],
          },
          macroscopy: {
            textNote: 'Erythematous and edematous mucosa',
            activePills: [
              { value: 'erythema', type: 'appearance' },
              { value: 'edema', type: 'texture' },
            ],
            combinedPills: [{ value: 'abnormal', type: 'overall' }],
          },
        },
        investigationComponents: [
          {
            id: 7,
            tenantId: 1,
            category: 'histopathology',
            name: 'Gastric Biopsy',
            result: 'Chronic gastritis',
            numericResult: null,
            reference: 'Normal gastric mucosa',
            rangeMin: 0,
            rangeMax: 0,
            unit: '',
            subCategory: 'gastrointestinal',
          },
        ],
      },
      others: {
        name: 'Pulmonary Function Test',
        description: 'Spirometry assessment',
        conclusionNote: 'Mild restrictive pattern',
        conclusionPills: [
          { value: 'restrictive_pattern', snowmedId: '74417001', type: 'finding' },
        ],
        dateSample: new Date('2024-01-15'),
        timeSample: '15:30',
        investigationComponents: [
          {
            id: 8,
            tenantId: 1,
            category: 'others',
            name: 'FEV1',
            result: '78% predicted',
            numericResult: 78,
            reference: '>80% predicted',
            rangeMin: 80,
            rangeMax: 120,
            unit: '% predicted',
            subCategory: 'pulmonary',
          },
        ],
      },
    },
  ];
};

export const selectRecordState = (
  state: RootState
): RecordInvestigationsState => {
  return {
    note: 'Routine laboratory investigations',
    chemistry: {
      activePills: [
        { value: 'sodium', type: 'electrolyte', normal: true, snowmedId: '39972003' },
        { value: 'potassium', type: 'electrolyte', normal: true, snowmedId: '88480006' },
      ],
      textNote: 'Electrolyte levels within normal range',
      conclusionNote: 'No electrolyte imbalance detected',
      conclusionPills: [
        { value: 'normal_electrolytes', snowmedId: '166312007', type: 'finding' },
      ],
      dateSample: new Date('2024-01-16'),
      timeSample: '08:00',
      dateResult: new Date('2024-01-16'),
      timeResult: '12:00',
      substanceType: ['sodium', 'potassium', 'chloride'],
      rangeValues: [140, 4.2, 102],
      investigationComponents: [
        {
          id: 10,
          tenantId: 1,
          category: 'chemistry',
          name: 'Sodium',
          result: '140 mmol/L',
          numericResult: 140,
          reference: '135-145 mmol/L',
          rangeMin: 135,
          rangeMax: 145,
          unit: 'mmol/L',
          subCategory: 'electrolytes',
        },
      ],
    },
    haematology: {
      activePills: [
        { value: 'rbc', type: 'blood', normal: true, snowmedId: '14089001' },
      ],
      textNote: 'Red blood cell count normal',
      mainSearchResult: 'Basic Blood Count',
      conclusionNote: 'No anemia detected',
      conclusionPills: [
        { value: 'normal_rbc', snowmedId: '14089001', type: 'finding' },
      ],
      dateSample: new Date('2024-01-16'),
      timeSample: '08:15',
      dateResult: new Date('2024-01-16'),
      timeResult: '10:30',
      substanceType: ['rbc', 'hematocrit', 'mcv'],
      rangeValues: [4.5, 42, 88],
      investigationComponents: [
        {
          id: 11,
          tenantId: 1,
          category: 'haematology',
          name: 'RBC Count',
          result: '4.5 × 10¹²/L',
          numericResult: 4.5,
          reference: '4.0-5.5 × 10¹²/L',
          rangeMin: 4.0,
          rangeMax: 5.5,
          unit: '× 10¹²/L',
          subCategory: 'blood_count',
        },
      ],
    },
    microbiology: {
      onSave: 'completed',
      activePills: [
        { value: 'no_growth', type: 'culture_result', normal: true },
      ],
      textNote: 'No bacterial growth after 48 hours',
      conclusionNote: 'Sterile specimen',
      conclusionPills: [
        { value: 'sterile', snowmedId: '261665006', type: 'finding' },
      ],
      dateSample: new Date('2024-01-16'),
      timeSample: '09:00',
      dateResult: new Date('2024-01-18'),
      timeResult: '09:00',
      tab: {
        specimen: {
          combinedPills: [{ value: 'blood', type: 'specimen' }],
          widal: { selectedOAntigue: 'negative', selectedHAntigue: 'negative' },
          fluidCulture: { nugentScore: 0, selectedCell: 'none' },
          geneXpert: { selectedCell: 'negative', selectedResistance: 'none' },
          malariaRDT: { selectedCell: 'negative' },
          mantoux: { nugentScore: 0, selectedCell: 'negative' },
          occultBlood: { selectedCell: 'negative' },
          sputum: { cellCount: 0, selectedCell: 'none' },
          bloodGroup: { bloodType: 'O+', resultType: 'confirmed' },
          genoType: { selectedType: 'normal' },
          ova: { selectedType: 'none' },
          extended: { selectedType: 'standard' },
          microfilariae: { selectedType: 'negative' },
          seminalFluid: {
            timeProduced: null,
            timeReceived: null,
            timeExamined: null,
            chosenMethod: '',
            viscosity: '',
            liquefaction: '',
            fructose: '',
            odour: '',
          },
        },
        gramStain: {
          nugentScore: 0,
          selectedCell: 'none',
          textNote: 'No organisms seen',
          activePills: [],
        },
        microscopy: {
          cellCount: 0,
          selectedCell: 'none',
          textNote: 'No significant findings',
          activePills: [],
        },
        culture: {
          colonyCount: 0,
          textNote: 'No growth after 48 hours incubation',
          activePills: [],
        },
        macroscopy: {
          textNote: 'Clear specimen',
          activePills: [{ value: 'clear', type: 'appearance' }],
          combinedPills: [{ value: 'normal', type: 'overall' }],
        },
        blueStain: {
          textNote: 'Not applicable',
          activePills: [],
        },
      },
      investigationComponents: [],
    },
    serology: {
      activePills: [
        { value: 'crp', type: 'inflammatory_marker', normal: true, snowmedId: '55235003' },
      ],
      textNote: 'C-reactive protein within normal limits',
      conclusionNote: 'No acute inflammation',
      conclusionPills: [
        { value: 'normal_crp', snowmedId: '55235003', type: 'finding' },
      ],
      dateSample: new Date('2024-01-16'),
      timeSample: '08:30',
      dateResult: new Date('2024-01-16'),
      timeResult: '14:00',
      substanceType: ['crp', 'esr'],
      rangeValues: [2.1, 8],
      specimen: {
        hepatitisBSurface: 'not_tested',
        hepatitisProfile: {
          first: 'not_tested',
          second: 'not_tested',
          third: 'not_tested',
          forth: 'not_tested',
          fifth: 'not_tested',
          sixth: 'not_tested',
        },
        count: {
          number: '2.1',
          type: 'mg/L',
          minRange: '0',
          maxRange: '3.0',
        },
      },
      investigationComponents: [
        {
          id: 12,
          tenantId: 1,
          category: 'serology',
          name: 'C-Reactive Protein',
          result: '2.1 mg/L',
          numericResult: 2.1,
          reference: '<3.0 mg/L',
          rangeMin: 0,
          rangeMax: 3,
          unit: 'mg/L',
          subCategory: 'inflammatory_markers',
        },
      ],
    },
    radiology: {
      conclusionNote: 'Abdominal ultrasound normal',
      conclusionPills: [
        { value: 'normal_abdomen_us', snowmedId: '241541005', type: 'finding' },
      ],
      dateSample: new Date('2024-01-16'),
      timeSample: '13:00',
      investigationComponents: [
        {
          id: 13,
          tenantId: 1,
          category: 'radiology',
          name: 'Abdominal Ultrasound',
          result: 'Normal',
          numericResult: null,
          reference: 'Normal abdominal organs',
          rangeMin: 0,
          rangeMax: 0,
          unit: '',
          subCategory: 'abdomen',
        },
      ],
    },
    electrophysiology: {
      conclusionNote: 'EEG shows normal brain activity',
      conclusionPills: [
        { value: 'normal_eeg', snowmedId: '54550000', type: 'finding' },
      ],
      dateSample: new Date('2024-01-16'),
      timeSample: '14:30',
      investigationComponents: [
        {
          id: 14,
          tenantId: 1,
          category: 'electrophysiology',
          name: 'EEG',
          result: 'Normal',
          numericResult: null,
          reference: 'Normal brain wave patterns',
          rangeMin: 0,
          rangeMax: 0,
          unit: '',
          subCategory: 'neurological',
        },
      ],
    },
    histopathology: {
      onSave: 'not_applicable',
      activePills: [],
      textNote: 'No histopathology requested',
      conclusionNote: 'N/A',
      conclusionPills: [],
      dateSample: null,
      timeSample: null,
      dateResult: null,
      timeResult: null,
      diagnosis: [],
      tab: {
        specimen: {
          combinedPills: [],
        },
        microscopy: {
          cellCount: 0,
          selectedCell: '',
          textNote: '',
          activePills: [],
        },
        macroscopy: {
          textNote: '',
          activePills: [],
          combinedPills: [],
        },
      },
      investigationComponents: [],
    },
    others: {
      name: 'Audiometry',
      description: 'Hearing assessment',
      conclusionNote: 'Normal hearing bilaterally',
      conclusionPills: [
        { value: 'normal_hearing', snowmedId: '47078008', type: 'finding' },
      ],
      dateSample: new Date('2024-01-16'),
      timeSample: '16:00',
      investigationComponents: [
        {
          id: 15,
          tenantId: 1,
          category: 'others',
          name: 'Pure Tone Audiometry',
          result: 'Normal',
          numericResult: 15,
          reference: '<25 dB HL',
          rangeMin: 0,
          rangeMax: 25,
          unit: 'dB HL',
          subCategory: 'audiology',
        },
      ],
    },
  };
};

export default recordInvestigationsSlice.reducer;
