DO $$ BEGIN
 CREATE TYPE "analytics"."platform" AS ENUM('VJUDGE', 'CODEFORCES', 'ICPC', 'BOCA');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "analytics"."result" AS ENUM('ACCEPTED', 'WRONG_ANSWER', 'TIME_LIMIT_EXCEEDED', 'MEMORY_LIMIT_EXCEEDED', 'RUNTIME_ERROR', 'COMPILATION_ERROR', 'PRESENTATION_ERROR', 'CLASS_NAME_MISMATCH');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."contest" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"platform" "analytics"."platform" NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"manager" varchar(64),
	"participants" integer,
	"source" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."contest_standing" (
	"id" serial PRIMARY KEY NOT NULL,
	"contest_id" integer NOT NULL,
	"rank" integer NOT NULL,
	"team" varchar(128) NOT NULL,
	"problems_solved" integer NOT NULL,
	"penalty" integer NOT NULL,
	"problem_statistics" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."problem" (
	"id" serial PRIMARY KEY NOT NULL,
	"problem_set_id" integer,
	"name" varchar(128) NOT NULL,
	"rating" integer,
	"tags" varchar(64)[],
	"author" varchar(64),
	"time_limit" integer,
	"memory_limit" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."problem_set" (
	"id" serial PRIMARY KEY NOT NULL,
	"contest_id" integer NOT NULL,
	"problems_file" varchar(256) NOT NULL,
	"editorial_file" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."submission" (
	"id" serial PRIMARY KEY NOT NULL,
	"contest_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"problem_id" integer NOT NULL,
	"code_length" integer NOT NULL,
	"memory_consumed" integer,
	"time_consumed" integer,
	"result" "analytics"."result",
	"language" varchar(64) NOT NULL,
	"source_code" text,
	"submission_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(128) NOT NULL,
	"university_code" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."city" (
	"code" varchar(5) NOT NULL,
	"name" varchar(256) NOT NULL,
	"country_code" varchar(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."country" (
	"code" varchar(3) NOT NULL,
	"name" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics"."university" (
	"code" varchar(5) NOT NULL,
	"name" varchar(256) NOT NULL,
	"city_code" varchar(5) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics"."contest_standing" ADD CONSTRAINT "contest_standing_contest_id_contest_id_fk" FOREIGN KEY ("contest_id") REFERENCES "analytics"."contest"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "analytics"."submission" ADD CONSTRAINT "submission_contest_id_contest_id_fk" FOREIGN KEY ("contest_id") REFERENCES "analytics"."contest"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics"."submission" ADD CONSTRAINT "submission_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "analytics"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
