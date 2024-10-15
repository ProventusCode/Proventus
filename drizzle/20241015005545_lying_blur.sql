ALTER TABLE "analytics"."problem_set" DROP CONSTRAINT "problem_set_contest_id_contest_id_fk";
--> statement-breakpoint
ALTER TABLE "analytics"."problem_set" ALTER COLUMN "contest_id" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics"."problem_set" ADD CONSTRAINT "problem_set_contest_id_contest_contest_id_fk" FOREIGN KEY ("contest_id") REFERENCES "analytics"."contest"("contest_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
