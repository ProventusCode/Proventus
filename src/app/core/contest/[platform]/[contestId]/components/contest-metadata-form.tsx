"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { DateTimePicker } from "@/components/ui/date-time-picker.ext";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { ContestType } from "@/types/contest.types";
import { DateUtils } from "@/utils/DateUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { es } from "date-fns/locale";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const contestFormSchema = z.object({
  contestId: z
    .string()
    .trim()
    .min(1, { message: "El ID del contest es obligatorio" }),
  name: z
    .string()
    .trim()
    .min(1, { message: "El nombre del contest es obligatorio" }),
  platform: z
    .string()
    .trim()
    .min(1, { message: "La plataforma es obligatoria" }),
  startDate: z.date({
    required_error: "La fecha de inicio es obligatoria",
    invalid_type_error: "Fecha de inicio inválida",
  }),
  endDate: z.date({
    required_error: "La fecha final es obligatoria",
    invalid_type_error: "Fecha final inválida",
  }),
  manager: z.string().trim(),
  participants: z.coerce
    .number()
    .int()
    .positive({ message: "El número de participantes debe ser positivo" }),
  source: z.string().trim(),
});

interface ContestManagementPageProps {
  contestMetadata?: ContestType;
  onSubmitCallback: (params: z.infer<typeof contestFormSchema>) => void;
  handleOriginalDataUpdate: Dispatch<SetStateAction<ContestType | undefined>>;
}

export default function ContestMetadataForm({
  contestMetadata,
  onSubmitCallback,
  handleOriginalDataUpdate,
}: Readonly<ContestManagementPageProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = (params: z.infer<typeof contestFormSchema>) => {
    setIsLoading(true);
    onSubmitCallback(params);
  };

  const contestMetadataForm = useForm<z.infer<typeof contestFormSchema>>({
    resolver: zodResolver(contestFormSchema),
    defaultValues: {
      contestId: contestMetadata?.contestId ?? "",
      name: contestMetadata?.name ?? "",
      platform: contestMetadata?.platform ?? "",
      startDate: DateUtils.parsePostgresDate(contestMetadata?.startDate),
      endDate: DateUtils.parsePostgresDate(contestMetadata?.endDate),
      manager: contestMetadata?.manager ?? "",
      participants: contestMetadata?.participants ?? 0,
      source: contestMetadata?.source ?? "",
    },
  });
  useEffect(() => {
    const newValues = contestMetadataForm.getValues();
    handleOriginalDataUpdate({
      ...newValues,
      participants: Number(newValues.participants),
      startDate: DateUtils.toPostgresDate(newValues.startDate),
      endDate: DateUtils.toPostgresDate(newValues.endDate),
    });
  }, [contestMetadataForm.formState.isDirty]);

  return (
    <div className="grid gap-4 w-full max-w-[610px] border-2 rounded-md p-8 shadow">
      <h1 className="text-2xl font-bold text-center">
        Información de la competencia
      </h1>
      <Form {...contestMetadataForm}>
        <form
          onSubmit={contestMetadataForm.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <FormField
            control={contestMetadataForm.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="platform" className="font-bold">
                  Plataforma <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input className="bg-slate-100" id="platform" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={contestMetadataForm.control}
            name="contestId"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="contestId" className="font-bold">
                  Identificador <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input className="bg-slate-100" id="contestId" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={contestMetadataForm.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor="name" className="font-bold">
                  Nombre <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input id="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={contestMetadataForm.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name" className="font-bold">
                  Fecha y hora inicial <span className="text-red-500">*</span>
                </FormLabel>
                <DateTimePicker
                  placeholder="Fecha y hora inicial"
                  value={field.value}
                  onChange={field.onChange}
                  locale={es}
                />
              </FormItem>
            )}
          />

          <FormField
            control={contestMetadataForm.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name" className="font-bold">
                  Fecha y hora final <span className="text-red-500">*</span>
                </FormLabel>
                <DateTimePicker
                  placeholder="Fecha y hora final"
                  // value={field.value}
                  // onChange={field.onChange}
                  locale={es}
                  {...field}
                />
              </FormItem>
            )}
          />

          <FormField
            control={contestMetadataForm.control}
            name="manager"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="manager">Organizador</FormLabel>
                <FormControl>
                  <Input id="manager" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={contestMetadataForm.control}
            name="participants"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="participants" className="font-bold">
                  Participantes <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input id="participants" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full col-span-2"
            type="submit"
            disabled={isLoading}
          >
            Guardar
            {isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
