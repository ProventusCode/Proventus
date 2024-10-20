DO $$ BEGIN
 CREATE TYPE "analytics"."result" AS ENUM('ACCEPTED', 'WRONG_ANSWER', 'TIME_LIMIT_EXCEEDED', 'MEMORY_LIMIT_EXCEEDED', 'RUNTIME_ERROR', 'COMPILATION_ERROR', 'PRESENTATION_ERROR', 'CLASS_NAME_MISMATCH', 'UNKNOWN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "analytics"."platform" AS ENUM('VJUDGE', 'CODEFORCES', 'ICPC', 'RPC');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."competitor" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"university_name" varchar(128),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "competitor_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."contest" (
	"id" serial PRIMARY KEY NOT NULL,
	"contest_id" varchar(16) NOT NULL,
	"name" varchar(128) NOT NULL,
	"platform" "analytics"."platform" NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"manager" varchar(64),
	"participants" integer NOT NULL,
	"source" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "contest_contest_id_unique" UNIQUE("contest_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."contest_standing" (
	"id" serial PRIMARY KEY NOT NULL,
	"contest_id" varchar(16) NOT NULL,
	"user_name" varchar(128) NOT NULL,
	"university_name" varchar(128),
	"rank" integer NOT NULL,
	"problems_solved" integer NOT NULL,
	"total_time" integer NOT NULL,
	"problem_statistics" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."city" (
	"code" varchar(5) NOT NULL,
	"name" varchar(256) NOT NULL,
	"country_code" varchar(3) NOT NULL,
	CONSTRAINT "city_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."country" (
	"code" varchar(3) NOT NULL,
	"name" varchar(256) NOT NULL,
	CONSTRAINT "country_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."university" (
	"code" varchar(5) NOT NULL,
	"name" varchar(256) NOT NULL,
	"city_code" varchar(5) NOT NULL,
	CONSTRAINT "university_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."problem" (
	"id" serial PRIMARY KEY NOT NULL,
	"problem_id" varchar(16) NOT NULL,
	"problem_set_id" integer,
	"index" varchar(2) NOT NULL,
	"name" varchar(128) NOT NULL,
	"rating" integer,
	"tags" varchar(64)[],
	"author" varchar(64),
	"origin" varchar(64),
	"time_limit" integer,
	"memory_limit" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "problem_problem_id_unique" UNIQUE("problem_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."problem_set" (
	"id" serial PRIMARY KEY NOT NULL,
	"contest_id" integer NOT NULL,
	"problems_url" varchar(256) NOT NULL,
	"editorial_url" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."submission" (
	"id" serial PRIMARY KEY NOT NULL,
	"submission_id" integer NOT NULL,
	"contest_id" varchar(32) NOT NULL,
	"user_name" varchar(64) NOT NULL,
	"problem_id" varchar NOT NULL,
	"code_length" integer,
	"memory_consumed" integer,
	"time_consumed" integer,
	"result" "analytics"."result",
	"language" varchar(64),
	"source_code" text,
	"submission_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "submission_submission_id_unique" UNIQUE("submission_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics"."contest_standing" ADD CONSTRAINT "contest_standing_contest_id_contest_contest_id_fk" FOREIGN KEY ("contest_id") REFERENCES "analytics"."contest"("contest_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics"."contest_standing" ADD CONSTRAINT "contest_standing_user_name_competitor_name_fk" FOREIGN KEY ("user_name") REFERENCES "analytics"."competitor"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics"."city" ADD CONSTRAINT "city_country_code_country_code_fk" FOREIGN KEY ("country_code") REFERENCES "analytics"."country"("code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics"."university" ADD CONSTRAINT "university_city_code_city_code_fk" FOREIGN KEY ("city_code") REFERENCES "analytics"."city"("code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics"."problem" ADD CONSTRAINT "problem_problem_set_id_problem_set_id_fk" FOREIGN KEY ("problem_set_id") REFERENCES "analytics"."problem_set"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics"."problem_set" ADD CONSTRAINT "problem_set_contest_id_contest_id_fk" FOREIGN KEY ("contest_id") REFERENCES "analytics"."contest"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics"."submission" ADD CONSTRAINT "submission_contest_id_contest_contest_id_fk" FOREIGN KEY ("contest_id") REFERENCES "analytics"."contest"("contest_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics"."submission" ADD CONSTRAINT "submission_user_name_competitor_name_fk" FOREIGN KEY ("user_name") REFERENCES "analytics"."competitor"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics"."submission" ADD CONSTRAINT "submission_problem_id_problem_problem_id_fk" FOREIGN KEY ("problem_id") REFERENCES "analytics"."problem"("problem_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
