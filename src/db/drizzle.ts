import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { competitor } from "./schema/competitor";
import { contest } from "./schema/contest";
import { contestStanding } from "./schema/contestStanding";
import { city, country, university } from "./schema/location";
import { problem } from "./schema/problem";
import { problemSet } from "./schema/problemSet";
import { submission } from "./schema/submission";
import { userRole, userRoleRelations } from "./schema/userRole";
import { roleResource, roleResourceRelations } from "./schema/roleResource";
import { userInfo, userInfoRelations } from "./schema/user";

const connectionString = process.env.POSTGRES_DRIZZLE_URL!;

export const databaseSchema = {
  contest,
  contestStanding,
  problem,
  problemSet,
  submission,
  competitor,
  university,
  city,
  country,
  userInfo,
  userRole,
  roleResource,
};

export const relations = {
  userRoleRelations,
  roleResourceRelations,
  userInfoRelations,
};

export const client = postgres(connectionString);
export const database = drizzle(client, {
  schema: { ...databaseSchema, ...relations },
});
