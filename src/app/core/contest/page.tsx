"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Problem, Submission } from "@/types/contest.types";
import { useState } from "react";
import ContestForm from "./contest-form";
import { scrapContest } from "./scrap/actions";
import { problemHeaders } from "./scrap/components/problem-headers";
import { submissionHeaders } from "./scrap/components/submission-headers";

export default function Page() {
  const [submissions, setSubmissions] = useState<Submission[]>();
  const [problems, setProblems] = useState<Problem[]>();

  const onClick = async () => {
    console.log("onClick");
    const response = await scrapContest("vjudge", "591336");

    if ("field" in response) {
      const { field, message } = response;
      console.error(field, message);
      return;
    }

    const { submissions, problems } = response;
    submissions.then(setSubmissions);
    problems.then(setProblems);
  };

  return (
    <div key="1" className="px-4 flex flex-col m-10 ml-40 mr-40">
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Datos del Contest</h1>
            <Button onClick={onClick} size="sm">
              Guardar cambios
            </Button>
          </div>
          <div className="w-[300px]">
            <div className="grid gap-1.5">
              <Label className="text-sm" htmlFor="source">
                Source
              </Label>
              <Input id="source" placeholder="Enter source" />
            </div>
          </div>
        </div>
        <Tabs defaultValue="contest">
          <TabsList className="flex gap-4">
            <TabsTrigger value="contest">Metadatos</TabsTrigger>
            <TabsTrigger value="problems">Problemas</TabsTrigger>
            <TabsTrigger value="submissions">Envíos</TabsTrigger>
            <TabsTrigger value="standings">Resultados</TabsTrigger>
          </TabsList>
          <TabsContent
            value="contest"
            className="flex flex-col items-center justify-center pt-10"
          >
            <ContestForm />
          </TabsContent>
          <TabsContent value="problems">
            <div className="flex flex-col gap-4">
              <Button size="sm">Agregar problema</Button>
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
            <div className="flex flex-col gap-4">
              <Button size="sm">Agregar envío</Button>

              {submissions && (
                <DataTable data={submissions} columns={submissionHeaders} />
              )}
              
            </div>
          </TabsContent>
          <TabsContent value="standings">
            <div className="flex flex-col gap-4">
              <Button size="sm">Agregar resultado</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
