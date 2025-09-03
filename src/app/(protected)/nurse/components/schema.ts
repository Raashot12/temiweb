import { z } from "zod";

export const vitalSignsSchema = z.object({
  systolic: z
    .number({ required_error: "Systolic is required" })
    .min(50, "Too low")
    .max(250, "Too high"),
  diastolic: z
    .number({ required_error: "Diastolic is required" })
    .min(30, "Too low")
    .max(150, "Too high"),
  heartRate: z
    .number({ required_error: "Heart rate is required" })
    .min(20, "Too low")
    .max(220, "Too high"),
  temperature: z
    .number({ required_error: "Temperature is required" })
    .min(30, "Too low")
    .max(45, "Too high"),
  respiratoryRate: z
    .number({ required_error: "Respiratory rate is required" })
    .min(5, "Too low")
    .max(60, "Too high"),
  spo2: z
    .number({ required_error: "SpO2 is required" })
    .min(50, "Too low")
    .max(100, "Too high"),
  heightCm: z
    .number({ required_error: "Height is required" })
    .min(30, "Too short")
    .max(250, "Too tall"),
  weightKg: z
    .number({ required_error: "Weight is required" })
    .min(2, "Too low")
    .max(500, "Too high"),
  bmi: z.number().min(5).max(80),
  notes: z.string().max(500, "Max 500 characters").optional().or(z.literal("")),
});

export type VitalSignsForm = z.infer<typeof vitalSignsSchema>;

export const computeBMI = (heightCm?: number | null, weightKg?: number | null) => {
  if (!heightCm || !weightKg) return null;
  const h = heightCm / 100; // meters
  if (h <= 0) return null;
  const bmi = weightKg / (h * h);
  return Math.round(bmi * 10) / 10; // 1dp
};
