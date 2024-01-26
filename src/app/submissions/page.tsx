"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getData } from "./actions";

const formSchema = z.object({
  contestUrl: z.string().url("Invalid url"),
});

export default function SubmissionsPage() {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState({} as any);

  const scrapContestForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contestUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast({
      title: "Contest",
      description: <div>Contest ID: {values.contestUrl}</div>,
    });
    const data = await getData(values.contestUrl);
    setData(data);
  };
  const uniqueTeams = new Set(data?.submissions?.map((p: any) => p.userName));
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Form {...scrapContestForm}>
        <form
          onSubmit={scrapContestForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={scrapContestForm.control}
            name="contestUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contest URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="http://platform/contest/[id]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Ingresa el id del contest de Vjudge
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div>
        {Object.keys(data).length > 0 && (
          <div>
            <h1>Resultados</h1>
            <h2>Participantes: {Object.keys(data?.participants).length}</h2>
            <h2>Envíos totales: {data.submissions.length}</h2>
            <h2> Equipos unicos: {uniqueTeams.size}</h2>
            <pre>{JSON.stringify(data.submissions, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
