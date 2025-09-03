import {
  BLOOD_GENOTYPE,
  BLOOD_GROUP,
  IDENTIFICATION_TYPE,
  MARITAL_STATUS,
  RELATIONSHIP,
  RELIGION,
  TITLES,
} from '@/utils/constants';
import CustomRegex from '@/utils/customRegex';
import * as z from 'zod';

const emailValidation = z
  .string()
  .email({ message: 'Invalid email' })
  .optional()
  .nullable()
  .or(z.literal(''));

const optionalNameValidation = z
  .string()
  .regex(CustomRegex.name, { message: 'Please enter a valid name' })
  .or(z.literal(''));

const optionalStringValidation = z.optional(
  z.string().nonempty().or(z.literal('')),
);

const optionalPhoneNumberValidation = z.optional(
  z
    .string()
    .nonempty({ message: 'Phone number is required' })
    .min(11, 'Phone number should be at least 11 characters long')
    .regex(CustomRegex.number, 'Please enter a valid phone number')
    .or(z.literal('')),
);

/** Validation schema used in Next of kin and Guardian form */
export const relations = z
  .object({
    title: z.optional(z.enum(TITLES)).nullable(),
    firstName: optionalNameValidation,
    middleName: optionalNameValidation,
    lastName: optionalNameValidation,
    phoneNumber: optionalPhoneNumberValidation,
    address: optionalStringValidation,
    email: emailValidation.optional(),
    identificationType: z.enum(IDENTIFICATION_TYPE).optional(),
    identificationCode: z.string().optional().nullable(),
    relationship: z.optional(z.enum(RELATIONSHIP)),
    isGuardian: z.boolean().optional(),
    id: z.number().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    const optionalFieldsAreNotEmpty =
      data.title !== undefined ||
      data.middleName !== '' ||
      data.address !== '' ||
      data.email !== '' ||
      data.identificationCode !== '' ||
      data.identificationType !== undefined;

    if (
      data.firstName === '' &&
      (data.lastName !== '' ||
        data.phoneNumber !== '' ||
        data.relationship !== undefined ||
        optionalFieldsAreNotEmpty)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'First name is required',
        path: ['firstName'],
      });
    }
    if (
      data.lastName === '' &&
      (data.firstName !== '' ||
        data.phoneNumber !== '' ||
        data.relationship !== undefined ||
        optionalFieldsAreNotEmpty)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Last name is required',
        path: ['lastName'],
      });
    }

    if (
      data.phoneNumber === '' &&
      (data.firstName !== '' ||
        data.lastName !== '' ||
        data.relationship !== undefined ||
        optionalFieldsAreNotEmpty)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Phone number is required',
        path: ['phoneNumber'],
      });
    }

    if (
      data.relationship === undefined &&
      (data.firstName !== '' ||
        data.lastName !== '' ||
        data.phoneNumber !== '' ||
        optionalFieldsAreNotEmpty)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Relationship is required',
        path: ['relationship'],
      });
    }
  });

/** Validation schema used for patient occupation */
export const addOccupations = z.object({
  occupationId: z.string().optional().nullable(),
  startDate: z.date().optional().nullable(),
  endDate: z.date().optional().nullable(),
  isCurrent: z.boolean().optional().nullable(),
  location: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  id: z.string().optional().nullable(),
});

export const addPatientIdentities = z.object({
  identificationCode: z.string().optional().nullable(),
  identificationType: z.string().optional().nullable(),
});

export const insuranceInformations = z
  .object({
    id: z.number().nullable(),
    type: z.string(),
    provider: z.number(),
    coverage: z.string(),
    insuranceId: z.string(),
    registrationType: z.string(),
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
    insuranceAdministratorId: z.string().optional().nullable(),
    insuranceAdministratorName: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (
      data.type === '' &&
      (data.registrationType !== '' ||
        data.provider !== 0 ||
        data.coverage !== '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Insurance type is required',
        path: ['type'],
      });
    }
    if (
      data.provider === 0 &&
      (data.registrationType !== '' ||
        data.type !== '' ||
        data.coverage !== '' ||
        data.endDate !== null ||
        data.startDate !== null)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Insurance provider is required',
        path: ['provider'],
      });
    }
    if (
      data.coverage === '' &&
      (data.registrationType !== '' ||
        data.type !== '' ||
        data.provider !== 0 ||
        data.endDate !== null ||
        data.startDate !== null)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Insurance coverage is required',
        path: ['coverage'],
      });
    }
    if (
      data.registrationType === '' &&
      (data.type !== '' ||
        data.provider !== 0 ||
        data.coverage !== '' ||
        data.endDate !== null ||
        data.startDate !== null)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Registration type is required',
        path: ['registrationType'],
      });
    }
    if (
      data.startDate === null &&
      (data.type !== '' ||
        data.provider !== 0 ||
        data.coverage !== '' ||
        data.registrationType !== '' ||
        data.endDate !== null)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Start date is required',
        path: ['startDate'],
      });
    }
    if (
      data.endDate === null &&
      (data.type !== '' ||
        data.provider !== 0 ||
        data.coverage !== '' ||
        data.registrationType !== '' ||
        data.startDate !== null)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End date is required',
        path: ['endDate'],
      });
    }
  });

export const addPatientSchema = z.object({
  education: z.string().optional(),
  genderType: z
    .string({ required_error: 'Gender is required' })
    .nonempty({ message: 'Gender is required' }),
  firstName: z
    .string({ required_error: 'First name is required' })
    .nonempty({ message: 'First name is required' }),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .nonempty({ message: 'Last name is required' }),
  phoneNumber: z
    .string({ required_error: 'Phone number is required' })
    .min(11, { message: 'Phone number must be at least 11 digits' })
    .max(14, { message: 'Phone number must be at most 14 digits' }),
  dateOfBirth: z
    .date({ required_error: 'Date of birth is required' })
    .nullable(),
  title: z.string().optional(),
  middleName: z.string().optional(),
  emailAddress: emailValidation,
  address: z.string().optional(),
  isNewToHospital: z.boolean().optional(),
  stateOfOriginId: z.string().optional().nullable(),
  countryId: z.string().optional().nullable(),
  // patientCode: z
  //   .string({ required_error: 'Patient Id is required' })
  //   .nonempty({ message: 'Patient Id is required' }),
  ethnicity: z.string().optional().nullable(),
  religion: z.enum(RELIGION).optional(),
  maritalStatus: z.enum(MARITAL_STATUS).optional().nullable(),
  bloodGroup: z.enum(BLOOD_GROUP).optional(),
  bloodGenotype: z.enum(BLOOD_GENOTYPE).optional(),
  locationOfWork: z.string().optional().nullable(),
  nuclearFamilySize: z.string().optional(),
  numberOfSiblings: z.string().optional(),
  positionInFamily: z.string().optional().nullable(),
  numberOfChildren: z.string().optional(),
  numberOfSpouses: z.string().optional(),
  patientOccupationId: z.number().optional().nullable(),
  patientOccupationCategoryId: z.number().optional().nullable(),
  nextOfKinForm: z.array(relations).optional().nullable(),
  guardianForm: z.array(relations).optional().nullable(),
  districtId: z.string().optional().nullable(),
  occupation: z.string().optional().nullable(),
  patientIdentities: z.array(addPatientIdentities).optional().nullable(),
  insuranceInformations: z.array(insuranceInformations).optional().nullable(),
  serviceCentreType: z.string().optional().nullable(),
});

export type AddPatientSchema = z.infer<typeof addPatientSchema>;
export type Relations = z.infer<typeof relations>;
export type AddOccupation = z.infer<typeof addOccupations>;
export type InsuranceInformation = z.infer<typeof insuranceInformations>;
