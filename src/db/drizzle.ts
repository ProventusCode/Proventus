import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.POSTGRES_DRIZZLE_URL!;

export const client = postgres(connectionString);
export const db = drizzle(client);
