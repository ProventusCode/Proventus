"use server";

import { database } from "@/db/drizzle";
import {
  NewUserRole,
  UserRoleResource,
  userRole
} from "@/db/schema/userRole";
import { eq } from "drizzle-orm";

export async function findUserRole(
  userId: string
): Promise<UserRoleResource | undefined> {
  return await database.query.userRole.findFirst({
    where: eq(userRole.userId, userId),
    with: {
      roleResource: true,
    },
  });
}

export async function saveUserRole(newUserRole: NewUserRole) {
  return await database.insert(userRole).values(newUserRole);
}

export async function updateUserRole(newUserRole: NewUserRole) {
  return await database
    .update(userRole)
    .set({
      role: newUserRole.role,
    })
    .where(eq(userRole.userId, newUserRole.userId));
}
