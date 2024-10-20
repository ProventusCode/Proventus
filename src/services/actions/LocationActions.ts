"use server";

import { database } from "@/db/drizzle";
import { University } from "@/db/schema/location";

export async function findAllUniversities(): Promise<University[]> {
  return await database.query.university.findMany();
}
