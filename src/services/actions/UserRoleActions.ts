"use server";

import { database } from "@/db/drizzle";
import { UserRole, userRole } from "@/db/schema/userRole";
import { RoleEnum } from "@/enums/RoleEnum";
import { UUID } from "crypto";
import { eq } from "drizzle-orm";

export async function findAllUserRoles(userId: UUID): Promise<UserRole[]> {
  return await database.query.userRole.findMany({
    where: eq(userRole.userId, userId),
  });
}

export async function saveUserRole(
  userId: UUID,
  role: RoleEnum = RoleEnum.STUDENT
): Promise<UserRole[]> {
  return await database.insert(userRole).values({
    userId: userId,
    role: role,
  });
}

export async function updateUserRole(
  userId: UUID,
  role: RoleEnum
): Promise<UserRole[]> {
  return await database
    .update(userRole)
    .set({
      role: role,
    })
    .where(eq(userRole.userId, userId));
}
