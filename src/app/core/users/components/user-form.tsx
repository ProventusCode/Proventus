"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import {
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { University } from "@/db/schema/location";
import { RoleEnum } from "@/enums/RoleEnum";
import { cn } from "@/lib/utils";
import { findAllUniversities } from "@/services/actions/LocationActions";
import { UserType } from "@/types/contest.types";
import { EnumUtils } from "@/utils/EnumUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const userSchema = z.object({
  id: z.string().uuid("El id es inválido."),
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Correo inválido"),
  university: z.string().optional().nullable(),
  role: z.enum(EnumUtils.enumToList(RoleEnum) as [RoleEnum, ...RoleEnum[]], {
    invalid_type_error: "Rol inválido",
    required_error: "El rol es requerido",
  }),
});

interface UserFormProps {
  user: UserType;
  onSave: (user: UserType) => void;
}

export default function UserForm({ user, onSave }: Readonly<UserFormProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [universities, setUniversities] = useState<University[]>([]);
  useEffect(() => {
    findAllUniversities().then(setUniversities);
  }, []);

  const userForm = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: user,
  });

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    setIsLoading(true);
    onSave(data);
    setIsLoading(false);
  };

  return (
    <Form {...userForm}>
      <form onSubmit={userForm.handleSubmit(onSubmit)}>
        <SheetHeader>
          <SheetTitle>Editar Usuario</SheetTitle>
          <SheetDescription>
            Modificar la información del usuario.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel htmlFor="name" className="text-right font-bold">
              Nombre
            </FormLabel>
            <FormField
              control={userForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormControl>
                    <Input id="name" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel htmlFor="email" className="text-right font-bold">
              Correo
            </FormLabel>
            <FormField
              control={userForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormControl>
                    <Input id="email" type="email" {...field} disabled={true} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel htmlFor="university" className="text-right font-bold">
              Universidad
            </FormLabel>
            <FormField
              control={userForm.control}
              name="university"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[250px] h-full justify-between whitespace-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? universities.find(
                                (university) => university.code === field.value
                              )?.name
                            : "Selecciona una universidad"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[700px] p-0">
                      <Command>
                        <CommandInput placeholder="" />
                        <CommandList>
                          <CommandEmpty>No hay resultados</CommandEmpty>
                          <CommandGroup>
                            {universities.map((university) => (
                              <CommandItem
                                value={university.name}
                                key={university.code}
                                onSelect={() => {
                                  userForm.setValue(
                                    "university",
                                    university.code
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    university.code === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {university.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel htmlFor="role" className="text-right font-bold">
              Rol
            </FormLabel>
            <FormField
              control={userForm.control}
              name="role"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormControl>
                    <Select
                      defaultValue={user?.role}
                      disabled={isLoading}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue id="role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={RoleEnum.ADMIN}>Admin</SelectItem>
                        <SelectItem value={RoleEnum.PROFESSOR}>
                          Profesor
                        </SelectItem>
                        <SelectItem value={RoleEnum.STUDENT}>
                          Estudiante
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" disabled={isLoading}>
              Guardar Cambios
              {isLoading && (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </Form>
  );
}
