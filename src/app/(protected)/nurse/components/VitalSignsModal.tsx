"use client";

import React, { useEffect } from "react";
import { Button, Grid, Group, Stack, Text, Textarea } from "@mantine/core";
import { CustomModal } from "@/components/shared/CustomModal";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VitalSignsForm, vitalSignsSchema, computeBMI } from "./schema";
import { CustomFormNumberInput } from "@/components/shared/CustomTextInput";

export type VitalSignsModalProps = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: VitalSignsForm) => void;
  patient: { name: string; id: string };
  defaultValues?: Partial<VitalSignsForm>;
};

const VitalSignsModal: React.FC<VitalSignsModalProps> = ({
  opened,
  onClose,
  onSubmit,
  patient,
  defaultValues,
}) => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isSubmitting },
    reset,
  } = useForm<VitalSignsForm>({
    resolver: zodResolver(vitalSignsSchema),
    defaultValues: {
      systolic: defaultValues?.systolic ?? ('' as unknown as number),
      diastolic: defaultValues?.diastolic ?? ('' as unknown as number),
      heartRate: defaultValues?.heartRate ?? ('' as unknown as number),
      temperature: defaultValues?.temperature ?? ('' as unknown as number),
      respiratoryRate: defaultValues?.respiratoryRate ?? ('' as unknown as number),
      spo2: defaultValues?.spo2 ?? ('' as unknown as number),
      heightCm: defaultValues?.heightCm ?? ('' as unknown as number),
      weightKg: defaultValues?.weightKg ?? ('' as unknown as number),
      bmi: defaultValues?.bmi ?? ('' as unknown as number),
      notes: defaultValues?.notes ?? "",
    } as unknown as VitalSignsForm,
    mode: "onChange",
  });

  // Sync default values on open
  useEffect(() => {
    if (opened) {
      reset({
        systolic: (defaultValues?.systolic ?? ('' as unknown as number)) as number,
        diastolic: (defaultValues?.diastolic ?? ('' as unknown as number)) as number,
        heartRate: (defaultValues?.heartRate ?? ('' as unknown as number)) as number,
        temperature: (defaultValues?.temperature ?? ('' as unknown as number)) as number,
        respiratoryRate: (defaultValues?.respiratoryRate ?? ('' as unknown as number)) as number,
        spo2: (defaultValues?.spo2 ?? ('' as unknown as number)) as number,
        heightCm: (defaultValues?.heightCm ?? ('' as unknown as number)) as number,
        weightKg: (defaultValues?.weightKg ?? ('' as unknown as number)) as number,
        bmi: (defaultValues?.bmi ?? ('' as unknown as number)) as number,
        notes: defaultValues?.notes ?? "",
      } as unknown as VitalSignsForm);
    }
  }, [opened, defaultValues, reset]);

  const h = watch("heightCm");
  const w = watch("weightKg");

  useEffect(() => {
    const bmi = computeBMI(h as number, w as number);
    if (bmi) setValue("bmi", bmi as unknown as number, { shouldValidate: true });
  }, [h, w, setValue]);

  const submit = (data: VitalSignsForm) => {
    onSubmit(data);
  };

  return (
    <CustomModal
      opened={opened}
      onClose={onClose}
      title={<Text fw={600}>Take Vital Signs</Text>}
      size="lg"
      radius="md"
    >
      <Stack>
        <Text c="dimmed" size="sm">
          {patient.name} • {patient.id}
        </Text>
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <CustomFormNumberInput<VitalSignsForm>
              name="systolic"
              control={control}
              label="Blood Pressure (Systolic)"
              placeholder="e.g. 120"
              fullWidth
              required
              rightSection={<Text size="sm">mmHg</Text>}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <CustomFormNumberInput<VitalSignsForm>
              name="diastolic"
              control={control}
              label="Blood Pressure (Diastolic)"
              placeholder="e.g. 80"
              fullWidth
              required
              rightSection={<Text size="sm">mmHg</Text>}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <CustomFormNumberInput<VitalSignsForm>
              name="heartRate"
              control={control}
              label="Heart Rate"
              placeholder="e.g. 72"
              fullWidth
              required
              rightSection={<Text size="sm">bpm</Text>}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <CustomFormNumberInput<VitalSignsForm>
              name="temperature"
              control={control}
              label="Temperature"
              placeholder="e.g. 36.8"
              fullWidth
              required
              rightSection={<Text size="sm">°C</Text>}
              decimalScale={1}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <CustomFormNumberInput<VitalSignsForm>
              name="respiratoryRate"
              control={control}
              label="Respiratory Rate"
              placeholder="e.g. 16"
              fullWidth
              required
              rightSection={<Text size="sm">breaths/min</Text>}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <CustomFormNumberInput<VitalSignsForm>
              name="spo2"
              control={control}
              label="SpO2"
              placeholder="e.g. 98"
              fullWidth
              required
              rightSection={<Text size="sm">%</Text>}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <CustomFormNumberInput<VitalSignsForm>
              name="heightCm"
              control={control}
              label="Height"
              placeholder="e.g. 170"
              fullWidth
              required
              rightSection={<Text size="sm">cm</Text>}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <CustomFormNumberInput<VitalSignsForm>
              name="weightKg"
              control={control}
              label="Weight"
              placeholder="e.g. 65"
              fullWidth
              required
              rightSection={<Text size="sm">kg</Text>}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <CustomFormNumberInput<VitalSignsForm>
              name="bmi"
              control={control}
              label="BMI"
              placeholder="Auto"
              fullWidth
              required
              disabled
              rightSection={<Text size="sm">kg/m²</Text>}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12 }}>
            <Controller
              name="notes"
              control={control}
              render={({ field, fieldState }) => (
                <Textarea
                  label="Notes"
                  placeholder="Optional notes..."
                  autosize
                  minRows={2}
                  {...field}
                  error={fieldState.error?.message}
                />
              )}
            />
          </Grid.Col>
        </Grid>
        <Group justify="flex-end" mt="sm">
          <Button variant="light" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button loading={isSubmitting} onClick={handleSubmit(submit)}>
            Save and send to triage
          </Button>
        </Group>
      </Stack>
    </CustomModal>
  );
};

export default VitalSignsModal;
