import { TenantCategory } from '@/types/index';
import { z } from 'zod';

export const tenancyNameRegex = /^[a-z]+$/;

export const validNameRegex = /^[A-Z][a-z]*(?:-[A-Z][a-z]*)?$/;

export const tenancyNameValidation = z.string().regex(tenancyNameRegex);

export const registrationSchema = z
  .object({
    adminName: z
      .string()
      .min(1, { message: 'Please enter your first name' })
      .regex(validNameRegex, {
        message:
          'First name must start with a capital letter and contain only letters (e.g., John or Mary-Jane)',
      }),
    adminSurname: z
      .string()
      .min(1, { message: 'Please enter your last name' })
      .regex(validNameRegex, {
        message:
          'Last name must start with a capital letter and contain only letters (e.g., Doe or Smith-Jones)',
      }),
    adminEmailAddress: z.string().email({ message: 'Invalid email address' }),
    referralCode: z.string().optional(),
    adminPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    adminConfirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    outletNumber: z
      .string()
      .nonempty()
      .min(1, { message: 'Outlet number must be at least 1 character long' }),
    type: z.enum([
      'Single hospital or hospital group',
      'Single pharmacy or pharmacy group',
      'Single laboratory or laboratory group',
      'Independent Practitioner',
    ]),
    category: z.enum(['Public', 'Private']),
    name: z.string(),
    tenancyName: z
      .string()
      .min(3, {
        message: 'Your unique organization code should be at least 3 letters',
      })
      .max(12, {
        message:
          'Your unique organization code should not be more than 12 letters',
      })
      .regex(tenancyNameRegex, {
        message:
          'Input does not match the required format (only lowercase letters allowed)',
      }),
    pharmacyGroupName: z.string().min(1, {
      message: 'Please enter the facility name or the facility group name',
    }),
    hasSignedAgreement: z.boolean().refine((value) => value === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.adminPassword === data.adminConfirmPassword, {
    path: ['adminConfirmPassword'],
    message: 'Passwords do not match',
  });

export type RegistrationSchema = z.infer<typeof registrationSchema>;

export type DirtyFields = Partial<
  Readonly<{
    type?: boolean | undefined;
    name?: boolean | undefined;
    adminName?: boolean | undefined;
    adminSurname?: boolean | undefined;
    adminEmailAddress?: boolean | undefined;
    adminPassword?: boolean | undefined;
    adminConfirmPassword?: boolean | undefined;
    category?: boolean | undefined;
    tenancyName?: boolean | undefined;
    outletNumber?: boolean | undefined;
    hasSignedAgreement?: boolean | undefined;
    referralCode?: boolean | undefined;
  }>
>;

export const defaultValues: RegistrationSchema = {
  adminName: '',
  adminSurname: '',
  adminEmailAddress: '',
  adminPassword: '',
  adminConfirmPassword: '',
  name: '',
  type: 'Single hospital or hospital group',
  category: TenantCategory.Private,
  tenancyName: 'https://',
  outletNumber: '',
  hasSignedAgreement: false,
  pharmacyGroupName: '',
  referralCode: '',
};
