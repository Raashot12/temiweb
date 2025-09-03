import { z } from 'zod';

export const resetPasswordSchema = z.object({
  emailAddress: z.string().email({ message: 'Invalid email' }),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const defaultResetPasswordSchemaValues: ResetPasswordSchema = {
  emailAddress: '',
};
