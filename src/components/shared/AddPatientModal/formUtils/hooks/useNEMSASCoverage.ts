import { momentBrowserTimezone } from '@/utils/utils';
import { Control, useController, useWatch } from 'react-hook-form';
import { AddPatientSchema } from '../validationSchema';
import {
  emergencyConverageOption,
  NEMSAS_EMERGENCY_COVERAGE_HOURS,
} from './constants';

const useNEMSASCoverage = ({
  control,
  nameRef,
}: {
  control: Control<AddPatientSchema>;
  nameRef: `insuranceInformations.${number}`;
}) => {
  const isCoverageSet = useWatch({
    name: `${nameRef}.coverage`,
    control,
  });

  const isNEMSASEmergencyCoverageSet =
    isCoverageSet.toLowerCase() === emergencyConverageOption.toLowerCase();

  const {
    field: { onChange: setCoverageStartDate, value: startDateValue },
  } = useController({ name: `${nameRef}.startDate`, control });

  const {
    field: { onChange: setCoverageEndDate, value: endDateValue },
  } = useController({ name: `${nameRef}.endDate`, control });

  const nemsasCoverageStartDate = momentBrowserTimezone(new Date().toDateString());

  const nemsasCoverageEndDate = momentBrowserTimezone(new Date().toISOString()).add(
    NEMSAS_EMERGENCY_COVERAGE_HOURS,
    'hours'
  );

  return {
    isNEMSASEmergencyCoverageSet,
    nemsasCoverageStartDate,
    nemsasCoverageEndDate,
    startDateValue,
    endDateValue,
    setCoverageStartDate,
    setCoverageEndDate,
  };
};

export default useNEMSASCoverage;
