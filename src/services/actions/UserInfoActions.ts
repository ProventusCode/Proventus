"use server";

import { database } from "@/db/drizzle";
import { NewUserInfo, UserInfoDTO, userInfo } from "@/db/schema/user";
import { desc, eq } from "drizzle-orm";

export async function findAllUser(): Promise<UserInfoDTO[]> {
  return await database.query.userInfo.findMany({
    with: { userRole: true, university: true },
    orderBy: [desc(userInfo.createdAt)],
  });
}

export async function exitsUserById(userId: string): Promise<boolean> {
  return (await database.$count(userInfo, eq(userInfo.userId, userId))) > 0;
}

export async function saveUserInfo(newUserInfo: NewUserInfo) {
  return await database.insert(userInfo).values(newUserInfo);
}

export async function updateUserInfo(newUserInfo: NewUserInfo) {
  return await database
    .update(userInfo)
    .set({
      name: newUserInfo.name,
      universityCode: newUserInfo.universityCode,
    })
    .where(eq(userInfo.userId, newUserInfo.userId));
}
