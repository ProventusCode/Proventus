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
import { ScraperFactory } from "@/lib/scrap/ScraperFactory";
import { DataTable } from "../../../components/ui/data-table";
import { contestHeaders } from "./components/contest-headers";
import { problemHeaders } from "./components/problem-headers";
import { submissionHeaders } from "./components/submission-headers";

const formSchema = z.object({
  contestId: z.string().min(1, { message: "El ID del contest es obligatorio" }),
  platform: z.string().min(1, { message: "La plataforma es obligatoria" }),
});

export default function ContestPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>(
    "Seleccionar plataforma"
  );

  const [contest, setContest] = useState<Contest>();
  const [problems, setProblems] = useState<Problem[]>();
  const [submissions, setSubmissions] = useState<Submission[]>();

  const scrapContestForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contestId: "",
      platform: "",
    },
  });
  
  const placeholders: Record<string, string> = {
    codeforces: "[número]: 12345",
    icpc: "ColombiaMaratonNalACISREDIS-[yyyy]",
    rpc: "[yyyy]-[número]: 2023-13",
    vjudge: "[número]: 567890",
  };

  const onSubmit = async (params: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const creator = ScraperFactory.getCreator(params.platform);
    const scraper = creator.createScraper();

    if (!scraper.isValidContestId(params.contestId)) {
      setIsLoading(false);
      scrapContestForm.setError("contestId", {
        type: "manual",
        message: "Formato de ID inválido",
      });
      return;
    }

    const contest = scraper.getContestMetadata(params.contestId);
    const problems = scraper.getProblems(params.contestId);
    const submissions = scraper.getSubmissions(params.contestId);

    contest.then((contest) => {
      setContest(contest);
    });
    problems.then((problems) => {
      setProblems(problems);
    });
    submissions.then((submissions) => {
      setSubmissions(submissions);
    });

    Promise.allSettled([contest, problems, submissions]).then(() => {
      setIsLoading(false);
    });
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
              name="contestId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="contestId">Contest ID</FormLabel>
                  <FormControl>
                    <Input
                      id="contestId"
                      placeholder={placeholder}
                      required
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
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
                        <SelectValue id="platform" placeholder="👇..." />
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
