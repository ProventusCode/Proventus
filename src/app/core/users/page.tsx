"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Icons } from "@/components/ui/icons";
import SkeletonTable from "@/components/ui/skeleton-table";
import { UserInfoDTO } from "@/db/schema/user";
import { findAllUser } from "@/services/actions/UserInfoActions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserHeaders } from "./components/user-headers";
import { useSearchParams } from "next/navigation";

export default function UserManagement() {
  const params = useSearchParams();
  const refreshParam = params.get("refresh");
  const [refreshId, setRefreshId] = useState<string | null>(null);

  const [users, setUsers] = useState<UserInfoDTO[]>();
  useEffect(() => {
    console.log("useEffect");
    findAllUser().then((data) => {
      setUsers(data);
      setRefreshId(refreshParam);
    });
  }, [refreshParam]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de usuarios</h1>
        <Button asChild variant="outline" type="button">
          <Link target="_blank" href="https://supabase.com/dashboard/projects">
            <Icons.Supabase className="mr-2 h-8 w-8" /> Ir a Supabase
          </Link>
        </Button>
      </div>

      <div className="flex flex-items-center justify-center gap-4">
        {users ? (
          <div className="rounded-xl border shadow-lg">
            <DataTable
              key={refreshId}
              data={users}
              columns={getUserHeaders()}
              paginationSize={8}
              filterable={true}
            />
          </div>
        ) : (
          <SkeletonTable columns={5} rows={5} prefix="users" />
        )}
      </div>
    </div>
  );
}
