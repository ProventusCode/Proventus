import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { competitor } from "./schema/Competitor";
import { contest } from "./schema/Contest";
import { contestStanding } from "./schema/ContestStanding";
import { city, country, university } from "./schema/Location";
import { problem } from "./schema/Problem";
import { problemSet } from "./schema/ProblemSet";
import { submission } from "./schema/Submission";

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
