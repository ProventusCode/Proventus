import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { competitor } from "./schema/competitor";
import { contest } from "./schema/contest";
import { contestStanding } from "./schema/contestStanding";
import { city, country, university } from "./schema/location";
import { problem } from "./schema/problem";
import { problemSet } from "./schema/problemSet";
import { submission } from "./schema/submission";

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
};

export const client = postgres(connectionString);
export const database = drizzle(client, {
  schema: databaseSchema,
});
