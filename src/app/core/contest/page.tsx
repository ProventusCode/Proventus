"use client";

import { DataTable } from "@/components/ui/data-table";
import { findAllContest } from "@/services/actions/ContestActions";
import { ContestMapper } from "@/services/mappers/ContestMapper";
import { ContestType } from "@/types/contest.types";
import { useEffect, useState } from "react";
import SkeletonTable from "./[platform]/[contestId]/components/skeleton-table";
import { ContestForm } from "./components/contest-form";
import { getContestHeaders } from "./components/contest-headers";

export default function ContestsListPage() {
  const [contests, setContests] = useState<ContestType[]>();
  useEffect(() => {
    async function initialize() {
      const contests = await findAllContest();
      setContests(ContestMapper.toContestTypeList(contests));
    }
    initialize();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de competencias</h1>
        <div className="flex items-center gap-4">
          <ContestForm />
        </div>
      </div>
      <div className="flex flex-items-center justify-center gap-4">
        {contests ? (
          <div className="rounded-xl border shadow-lg">
            <DataTable data={contests} columns={getContestHeaders()} />
          </div>
        ) : (
          <SkeletonTable columns={8} rows={5} prefix="standings" />
        )}
      </div>
    </div>
  );
}
