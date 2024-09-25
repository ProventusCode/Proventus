import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlatformEnum } from "@/enums/PlatformEnum";
import { ScraperFactory } from "@/services/scrap/ScraperFactory";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  contestId: z
    .string()
    .trim()
    .min(1, { message: "El ID del contest es obligatorio" }),
  platform: z
    .string()
    .trim()
    .min(1, { message: "La plataforma es obligatoria" }),
});

interface FormValidation {
  field?: "platform" | "contestId";
  message?: string;
  valid: boolean;
}

function isValidContest(platform: string, contestId: string): FormValidation {
  const scraperService = ScraperFactory.getCreator(platform);
  if (!scraperService) {
    return {
      field: "platform",
      message: "Plataforma no soportada",
      valid: false,
    };
  }
  if (!scraperService.isValidContestId(contestId)) {
    return {
      field: "contestId",
      message: "Identificador de concurso inválido",
      valid: false,
    };
  }
  return { valid: true };
}

export function ContestForm() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const scrapContestForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contestId: "",
      platform: "",
    },
  });
  const onSubmit = async (params: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { platform, contestId } = params;
    const response = isValidContest(platform, contestId);

    if (!response.valid && response.field) {
      scrapContestForm.setError(response.field, {
        type: "manual",
        message: response.message,
      });
      setIsLoading(false);
      return;
    }
    router.push(`${pathname}/${platform}/${contestId}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-transparent text-black outline-2 outline-dashed outline-green-500 hover:text-white"
        >
          Nuevo contest
          <PlusIcon className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...scrapContestForm}>
          <form onSubmit={scrapContestForm.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Agregar contest</DialogTitle>
              <DialogDescription>
                Se te redirigirá a una nueva página para continuar con el
                registro del contest.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel
                  htmlFor="platform"
                  className="text-right font-bold flex"
                >
                  Plataforma
                </FormLabel>
                <FormField
                  control={scrapContestForm.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Select
                          required={true}
                          disabled={isLoading}
                          onValueChange={(value) =>
                            field.onChange({ target: { value: value } })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue id="platform" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(PlatformEnum).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={value}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contestId" className="text-right font-bold">
                  Identificador
                </Label>
                <FormField
                  control={scrapContestForm.control}
                  name="contestId"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input
                          className="col-span-3"
                          id="contestId"
                          {...field}
                          disabled={isLoading}
                          required={true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                Continuar
                {isLoading && (
                  <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
