DO $$ BEGIN
 ALTER TABLE "analytics"."user_role" ADD CONSTRAINT "user_role_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "analytics"."user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
