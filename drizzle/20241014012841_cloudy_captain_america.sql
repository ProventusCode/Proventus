CREATE TABLE IF NOT EXISTS "analytics"."user" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"university_code" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "analytics"."competitor" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."competitor" ALTER COLUMN "university_name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."contest" ALTER COLUMN "contest_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."contest" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."contest" ALTER COLUMN "manager" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."contest" ALTER COLUMN "source" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."contest_standing" ALTER COLUMN "contest_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."contest_standing" ALTER COLUMN "user_name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."contest_standing" ALTER COLUMN "university_name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."city" ALTER COLUMN "code" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."city" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."city" ALTER COLUMN "country_code" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."country" ALTER COLUMN "code" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."country" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."university" ALTER COLUMN "code" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."university" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."university" ALTER COLUMN "city_code" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."problem" ALTER COLUMN "problem_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."problem" ALTER COLUMN "index" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."problem" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."problem" ALTER COLUMN "tags" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "analytics"."problem" ALTER COLUMN "author" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."problem" ALTER COLUMN "origin" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."problem_set" ALTER COLUMN "problems_url" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."problem_set" ALTER COLUMN "editorial_url" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."submission" ALTER COLUMN "contest_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."submission" ALTER COLUMN "user_name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."submission" ALTER COLUMN "problem_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "analytics"."submission" ALTER COLUMN "language" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics"."user" ADD CONSTRAINT "user_university_code_university_code_fk" FOREIGN KEY ("university_code") REFERENCES "analytics"."university"("code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
SET 
 ALTER TABLE "analytics"."user_role" ADD CONSTRAINT "user_role_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "analytics"."user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
