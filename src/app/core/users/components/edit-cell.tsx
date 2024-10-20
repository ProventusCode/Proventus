import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserInfoDTO } from "@/db/schema/user";
import { updateUserInfo } from "@/services/actions/UserInfoActions";
import { updateUserRole } from "@/services/actions/UserRoleActions";
import { UserMapper } from "@/services/mappers/UserMapper";
import { UserType } from "@/types/contest.types";
import { Row, Table } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import UserForm from "./user-form";
import { useRouter } from "next/navigation";

interface EditCellProps<TData> {
  row: Row<TData>;
  table: Table<TData>;
}

export function EditCell<TData>({
  row,
  table,
}: Readonly<EditCellProps<TData>>) {
  const router = useRouter();

  const handleSaveUser = (user: UserType) => {
    console.log("handleSaveUser", user);
    updateUserInfo(UserMapper.toNewUserInfo(user));
    updateUserRole(UserMapper.toUpdateUserRole(user));
    router.push(`/core/users?refresh=${Date.now()}`);
  };

  const user = row.original as UserInfoDTO;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <UserForm user={UserMapper.toUserType(user)} onSave={handleSaveUser} />
      </SheetContent>
    </Sheet>
  );
}
