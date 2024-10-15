"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SkeletonTable from "@/components/ui/skeleton-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserInfoDTO } from "@/db/schema/user";
import { RoleEnum } from "@/enums/RoleEnum";
import {
  findAllUser,
  updateUserInfo,
} from "@/services/actions/UserInfoActions";
import { updateUserRole } from "@/services/actions/UserRoleActions";
import { UserMapper } from "@/services/mappers/UserMapper";
import { UserType } from "@/types/contest.types";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserForm from "./components/user-form";

const roleMap: Record<string, string> = {
  [RoleEnum.ADMIN]: "Admin",
  [RoleEnum.PROFESSOR]: "Profesor",
  [RoleEnum.STUDENT]: "Estudiante",
};

const bgMap: Record<string, string> = {
  [RoleEnum.ADMIN]: "bg-red-300",
  [RoleEnum.PROFESSOR]: "bg-yellow-300",
  [RoleEnum.STUDENT]: "bg-green-300",
};

export default function UserManagement() {
  const [users, setUsers] = useState<UserInfoDTO[]>();
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    findAllUser().then((users) => {
      setUsers(users);
      setIsSaving(false);
    });
  }, [isSaving]);

  const handleSaveUser = (user: UserType) => {
    if (editingUser) {
      updateUserInfo(UserMapper.toNewUserInfo(user));
      updateUserRole(UserMapper.toUpdateUserRole(user));
      setIsSaving(true);
    }
    setEditingUser(null);
  };

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

      <div className="rounded-xl border">
        {users ? (
          <Table key={Number(editingUser)}>
            <TableHeader className="bg-gray-50">
              <TableRow>
                {["Nombre", "Correo", "Universidad", "Rol", ""].map(
                  (header) => (
                    <TableHead key={header} className="text-center font-bold">
                      {header}
                    </TableHead>
                  )
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id} className="text-center">
                  <TableCell>
                    <Badge variant="secondary"> {user.name}</Badge>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline"> {user.university?.name}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={bgMap[user.userRole.role]}
                    >
                      {roleMap[user.userRole.role]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              setEditingUser(UserMapper.toUserType(user))
                            }
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <UserForm
                            user={UserMapper.toUserType(user)}
                            onSave={handleSaveUser}
                          />
                        </SheetContent>
                      </Sheet>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <SkeletonTable columns={5} rows={5} prefix="users" />
        )}
      </div>
    </div>
  );
}
