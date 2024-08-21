"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Contest,
  ContestStanding,
  Problem,
  Submission,
} from "@/types/contest.types";
import { useState } from "react";
import { scrapContest } from "../scrap/actions";
import { problemHeaders } from "../scrap/components/problem-headers";
import { submissionHeaders } from "../scrap/components/submission-headers";
import ContestForm from "./contest-form";
import { useParams } from "next/navigation";

function addButton(text: string) {
  return (
    <Button
      className="w-[50%] bg-transparent text-black outline-2 outline-dashed outline-green-500 hover:text-white"
      size="sm"
    >
      {text}
      {/* <PlusSquare className="w-6 h-6" /> */}
    </Button>
  );
}

export default function ContestManagementPage() {
  const { constestId } = useParams();
  const [contestMetadata, setContestMetadata] = useState<Contest>();
  const [submissions, setSubmissions] = useState<Submission[]>();
  const [problems, setProblems] = useState<Problem[]>();
  const [standings, setStandings] = useState<ContestStanding[]>();

  const onClick = async () => {
    console.log("onClick");
    const response = await scrapContest("vjudge", "591336");

    if ("field" in response) {
      const { field, message } = response;
      console.error(field, message);
      return;
    }

    const { contest, problems, submissions, standings } = response;
    submissions.then(setSubmissions);
    problems.then(setProblems);
    contest.then(setContestMetadata);
    standings.then(setStandings);
  };

  return (
    // ml-40 mr-40

    <div key="1" className="px-4 w-full ">
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
            <Button
              className="my-4 w-[50%] bg-transparent text-black outline-2 outline-dashed outline-green-500 hover:text-white"
              size="sm"
              onClick={onClick}
            >
              Cargar demo
              {/* <PlusSquare className="w-6 h-6" /> */}
            </Button>
            <ContestForm contestMetadata={contestMetadata} />
          </TabsContent>
          <TabsContent value="problems">
            <div className="flex flex-col items-center justify-center gap-4">
              {addButton("Agregar problema")}
              {problems && (
                <section className="container mx-auto my-4 p-4 bg-white shadow rounded-md">
                  <div className="flex justify-between mb-4">
                    <DataTable data={problems} columns={problemHeaders} />
                  </div>
                </section>
              )}
            </div>
          </TabsContent>
          <TabsContent value="submissions">
            <div className="flex flex-col items-center justify-center gap-4">
              {addButton("Agregar envío")}
              {submissions && (
                <DataTable data={submissions} columns={submissionHeaders} />
              )}
            </div>
          </TabsContent>
          <TabsContent value="standings">
            <div className="flex flex-col items-center justify-center gap-4">
              {addButton("Agregar resultado")}
              <pre>
                {standings && JSON.stringify(standings.slice(1, 3), null, 4)}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
