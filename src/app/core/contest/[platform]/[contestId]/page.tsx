"use client";

import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  ContestStandingType,
  ContestType,
  ProblemType,
  SubmissionType,
} from "@/types/contest.types";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
  saveScrapedContest,
  scrapContest,
  setUniversityNames,
} from "./actions";
import ContestMetadataForm, {
  contestFormSchema,
} from "./components/contest-metadata-form";
import SkeletonTable from "./components/skeleton-table";
import {
  getProblemHeaders,
  setProblemTags,
} from "./components/table-headers/problem-headers";
import {
  getStandingsHeaders,
  setProblemsStatsHeaders,
} from "./components/table-headers/standings-headers";
import { getSubmissionHeaders } from "./components/table-headers/submission-headers";

interface ContestRegisterPageProps extends Params {
  platform: string;
  contestId: string;
}

export default function ContestRegisterPage() {
  const { platform, contestId } = useParams<ContestRegisterPageProps>();
  const router = useRouter();
  const { toast } = useToast();

  const [contestMetadata, setContestMetadata] = useState<ContestType>();
  const [submissions, setSubmissions] = useState<SubmissionType[]>();
  const [problems, setProblems] = useState<ProblemType[]>();
  const [standings, setStandings] = useState<ContestStandingType[]>();

  useEffect(() => {
    async function initialize() {
      const { contest, problems, submissions, standings } = await scrapContest(
        platform,
        contestId
      );
      contest.then(setContestMetadata);
      problems.then((problems) => {
        setProblems(problems);
        setProblemTags();
      });
      submissions.then(setSubmissions);
      standings.then((standings) => {
        setStandings(standings);
        setProblemsStatsHeaders(standings?.[0]?.problemStatistics);
        setUniversityNames(platform, standings).then(setStandings);
      });
    }
    initialize();
  }, [platform, contestId]);

  const onSubmitCallback = async (
    contestMetadata: z.infer<typeof contestFormSchema>
  ) => {
    const savingPromise = saveScrapedContest({
      contestMetadata,
      problems,
      submissions,
      standings,
    });
    toast({
      title: "Guardado en proceso",
      description:
        "Los datos del concurso se están guardando en la base de datos",
    });
    savingPromise.then(() => {
      router.push("/core/contest");
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <Tabs defaultValue="contest">
          <TabsList className="flex gap-4">
            <TabsTrigger value="contest">Metadatos</TabsTrigger>
            <TabsTrigger value="problems">Problemas</TabsTrigger>
            <TabsTrigger value="submissions">Envíos</TabsTrigger>
            <TabsTrigger value="standings">Resultados</TabsTrigger>
          </TabsList>
          <TabsContent
            value="contest"
            className="flex flex-col items-center justify-center pt-4"
          >
            {contestMetadata ? (
              <ContestMetadataForm
                contestMetadata={contestMetadata}
                onSubmitCallback={onSubmitCallback}
                handleOriginalDataUpdate={setContestMetadata}
              />
            ) : (
              <Skeleton className="w-[610px] h-[508px] rounded-xl" />
            )}
          </TabsContent>
          <TabsContent value="problems">
            <div className="flex flex-col items-center justify-center gap-4">
              {problems ? (
                <div className="rounded-xl border shadow-lg">
                  <DataTable
                    data={problems}
                    columns={getProblemHeaders()}
                    paginationSize={8}
                    handleOriginalDataUpdate={setProblems}
                  />
                </div>
              ) : (
                <SkeletonTable columns={8} rows={7} prefix="problems" />
              )}
            </div>
          </TabsContent>
          <TabsContent value="submissions">
            <div className="flex flex-col items-center justify-center gap-4">
              {submissions ? (
                <div className="rounded-xl border shadow-lg">
                  <DataTable
                    data={submissions}
                    columns={getSubmissionHeaders()}
                    paginationSize={5}
                    handleOriginalDataUpdate={setSubmissions}
                  />
                </div>
              ) : (
                <SkeletonTable columns={7} rows={11} prefix="submissions" />
              )}
            </div>
          </TabsContent>
          <TabsContent
            value="standings"
            className="flex flex-col items-center justify-center gap-4"
          >
            {standings ? (
              <div className="rounded-xl border shadow-lg">
                <DataTable
                  key={standings[0].universityName}
                  data={standings}
                  columns={getStandingsHeaders()}
                  paginationSize={5}
                  handleOriginalDataUpdate={setStandings}
                />
              </div>
            ) : (
              <SkeletonTable columns={10} rows={10} prefix="standings" />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
