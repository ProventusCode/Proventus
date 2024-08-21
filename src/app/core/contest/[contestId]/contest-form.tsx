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

import { Calendar } from "@/components/ui/calendar";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Contest } from "@/types/contest.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
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
  manager: z
    .string()
    .trim()
    .min(4, { message: "El organizador es obligatorio" }),
  participants: z
    .number({
      invalid_type_error: "Número de participantes inválido",
      required_error: "El número de participantes es obligatorio",
    })
    .int()
    .positive({ message: "El número de participantes debe ser positivo" }),
});

interface ContestManagementPageProps {
  contestMetadata: Contest | undefined;
}

export default function ContestForm({
  contestMetadata,
}: Readonly<ContestManagementPageProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const contestMetadataForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contestId: contestMetadata?.id ?? "",
      name: contestMetadata?.name ?? "",
      platform: contestMetadata?.platform ?? "",
      startDate: contestMetadata?.start_date ?? undefined,
      endDate: contestMetadata?.end_date ?? undefined,
      manager: contestMetadata?.manager ?? "",
      participants: contestMetadata?.registered_participants ?? undefined,
    },
  });
  const onSubmit = async (params: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log(params);
  };

  return (
    <div className="grid gap-4 w-[500px] border-2 rounded-md p-8 shadow">
      <h1 className="text-2xl font-bold text-center">Información de la competencia</h1>
      <Form {...contestMetadataForm}>
        <form
          onSubmit={contestMetadataForm.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={contestMetadataForm.control}
            name="contestId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Identificador"
                    className="bg-slate-200"
                    id="contestId"
                    {...field}
                    disabled={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={contestMetadataForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Nombre" id="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={contestMetadataForm.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <FormControl>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP HH:mm:ss", { locale: es })
                        ) : (
                          <span>Fecha y hora de inicio</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                  </FormControl>
                  <FormMessage />
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      locale={es}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                    <div className="p-3 border-t border-border">
                      <DateTimePicker
                        setDate={field.onChange}
                        date={field.value}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={contestMetadataForm.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <FormControl>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP HH:mm:ss", { locale: es })
                        ) : (
                          <span>Fecha y hora final</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                  </FormControl>
                  <FormMessage />
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      locale={es}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      required={true}
                    />
                    <div className="p-3 border-t border-border">
                      <DateTimePicker
                        setDate={field.onChange}
                        date={field.value}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={contestMetadataForm.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange({ target: { value: value } });
                    }}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue id="platform" placeholder="Plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="codeforces">Codeforces</SelectItem>
                      <SelectItem value="icpc">ICPC</SelectItem>
                      <SelectItem value="rpc">RPC</SelectItem>
                      <SelectItem value="vjudge">Vjudge</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={contestMetadataForm.control}
            name="manager"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Organizador" id="manager" {...field} />
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
                <FormLabel htmlFor="participants"></FormLabel>
                <FormControl>
                  <Input
                    placeholder="Participantes"
                    id="participants"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit" disabled={isLoading}>
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
