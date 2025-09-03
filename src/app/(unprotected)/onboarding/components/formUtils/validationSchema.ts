import { z } from 'zod';

export const facilitySchema = z.object({
  name: z.string({ required_error: 'Facility name is required' }).nonempty({
    message: 'Facility name is required',
  }),

  address: z
    .string({ required_error: 'Facility address is required' })
    .nonempty({
      message: 'Facility address is required',
    }),
  state: z.string({ required_error: 'State is required' }).nonempty({
    message: 'State is required',
  }),
  city: z.string({ required_error: 'City is required' }).nonempty({
    message: 'City is required',
  }),
  country: z.string({ required_error: 'Country is required' }).nonempty({
    message: 'Country is required',
  }),
  phoneNumber: z
    .string({ required_error: 'Phone number is required' })
    .nonempty({
      message: 'Phone number is required',
    }),
  emailAddress: z
    .string({ required_error: 'Email address is required' })
    .email()
    .nonempty({
      message: 'Email address is required',
    }),
  postCode: z.string().optional(),
  website: z
    .string()
    .url({ message: 'Please enter a valid website link' })
    .optional()
    .or(z.literal('')),
  phoneCode: z.string({ required_error: 'Country code is required' }).nonempty({
    message: 'Country code is required',
  }),
  level: z.string({ required_error: 'Facility level is required' }).nonempty({
    message: 'Facility level is required',
  }),
  facilityLogoId: z.string().optional(),
  facilityId: z.number().optional(),
});

export const defaultFacility = {
  name: '',
  address: '',
  state: '',
  city: '',
  country: '',
  phoneNumber: '',
  emailAddress: '',
  postCode: '',
  level: '',
  website: '',
  phoneCode: '',
  facilityLogoId: '',
  facilityId: 0,
};

export const createFacilityDetailsSchema = z
  .object({
    name: z
      .string({ required_error: 'Facility group name is required' })
      .nonempty({
        message: 'Facility group name is required',
      }),

    address: z
      .string({ required_error: 'Facility group address is required' })
      .nonempty({
        message: 'Facility group address is required',
      }),
    state: z.string({ required_error: 'State is required' }).nonempty({
      message: 'State is required',
    }),
    city: z.string({ required_error: 'City is required' }).nonempty({
      message: 'City is required',
    }),
    country: z.string({ required_error: 'Country is required' }).nonempty({
      message: 'Country is required',
    }),
    phoneNumber: z
      .string({ required_error: 'Phone number is required' })
      .nonempty({
        message: 'Phone number is required',
      }),
    emailAddress: z
      .string({ required_error: 'Email address is required' })
      .email()
      .nonempty({
        message: 'Email address is required',
      }),
    postCode: z.string().optional(),
    website: z
      .string()
      .url({ message: 'Please enter a valid website link' })
      .optional()
      .or(z.literal('')),
    phoneCode: z
      .string({ required_error: 'Country code is required' })
      .nonempty({
        message: 'Country code is required',
      }),
    category: z.string({ required_error: 'Category is required' }).nonempty({
      message: 'Category is required',
    }),
    facilityGroupLogoId: z.string().optional(),
    facilityGroupId: z.number().optional(),
    facilities: z.array(facilitySchema),
    level: z
      .string({ required_error: 'Facility level is required' })
      .optional()
      .or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    if (data.facilities.length <= 1 && data.level === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Facility level is required',
        path: ['level'],
      });
    }
  });

export type CreateFacilityDetailsSchema = z.infer<
  typeof createFacilityDetailsSchema
>;
export const createFacilityDetailsDefaultValues: CreateFacilityDetailsSchema = {
  name: '',
  address: '',
  state: '',
  city: '',
  country: '',
  phoneNumber: '',
  emailAddress: '',
  postCode: '',
  website: '',
  phoneCode: '',
  category: '',
  facilityGroupLogoId: '',
  level: '',
  facilityGroupId: 0,
  facilities: [],
};
