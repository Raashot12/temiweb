import { Relations } from "./validationSchema";


const defaultRelation = {
  title: undefined,
  firstName: '',
  middleName: '',
  lastName: '',
  phoneNumber: '',
  address: '',
  email: '',
  identificationCode: '',
  identificationType: undefined,
  relationship: undefined,
};

export const defaultNextOfKin: Relations = {
  ...defaultRelation,
  isGuardian: false,
};

export const defaultIdentity = {
  identificationCode: '',
  identificationType: '',
};
export const defaultGuardian: Relations = {
  ...defaultRelation,
  isGuardian: true,
};

export const defaultPatientInsurance = {
  id: null,
  startDate: null,
  endDate: null,
  type: '',
  provider: 0,
  coverage: '',
  insuranceId: '',
  registrationType: '',
  insuranceAdministratorId: '',
  insuranceAdministratorName: '',
};
