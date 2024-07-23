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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Icons } from "@/components/ui/icons";
import {
  Contest,
  ContestStanding,
  Problem,
  Submission,
} from "@/types/contest.types";
import { DataTable } from "@/components/ui/data-table";
import { scrapContest } from "./actions";
import { contestHeaders } from "./components/contest-headers";
import { problemHeaders } from "./components/problem-headers";
import { submissionHeaders } from "./components/submission-headers";

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

export default function ContestPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>("...");

  const [contest, setContest] = useState<Contest>();
  const [problems, setProblems] = useState<Problem[]>();
  const [submissions, setSubmissions] = useState<Submission[]>();
  const [standings, setStandings] = useState<ContestStanding[]>();

  const scrapContestForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contestId: "",
      platform: "",
    },
  });

  const placeholders: Record<string, string> = {
    codeforces: "12345",
    icpc: "ColombiaMaratonNalACISREDIS-2024",
    rpc: "2024-01",
    vjudge: "567890",
  };

  const onSubmit = async (params: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const response = await scrapContest(params.platform, params.contestId);
    if ("field" in response) {
      const { field, message } = response;
      scrapContestForm.setError(field, { message });
      setIsLoading(false);
      return;
    }

    const { contest, problems, submissions, standings } = response;

    contest.then(setContest);
    problems.then(setProblems);
    submissions.then(setSubmissions);
    standings.then(setStandings);

    Promise.allSettled([contest, problems, submissions, standings]).then(() =>
      setIsLoading(false)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 m-4 bg-white rounded shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Registrar Contest
        </h2>

        <Form {...scrapContestForm}>
          <form
            onSubmit={scrapContestForm.handleSubmit(onSubmit)}
            className="mt-4 space-y-8"
          >
            <FormField
              control={scrapContestForm.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="platform">Plataforma</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        setPlaceholder(placeholders[value]);
                        field.onChange({ target: { value: value } });
                      }}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          id="platform"
                          placeholder="Seleccionar plataforma 👇"
                        />
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
              control={scrapContestForm.control}
              name="contestId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="contestId">Contest ID</FormLabel>
                  <FormControl>
                    <Input
                      id="contestId"
                      placeholder={placeholder}
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              Iniciar Scraping
              {isLoading && (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </form>
        </Form>
      </div>

      {contest && (
        <section className="container mx-auto my-4 p-4 bg-white shadow rounded-md">
          <div className="flex justify-between mb-4">
            <DataTable data={[contest]} columns={contestHeaders} />
          </div>
        </section>
      )}

      {problems && (
        <section className="container mx-auto my-4 p-4 bg-white shadow rounded-md">
          <div className="flex justify-between mb-4">
            <DataTable data={problems} columns={problemHeaders} />
          </div>
        </section>
      )}

      {submissions && (
        <section className="container mx-auto my-4 p-4 bg-white shadow rounded-md">
          <div className="flex justify-between mb-4">
            <DataTable data={submissions} columns={submissionHeaders} />
          </div>
        </section>
      )}
    </div>
  );
}
