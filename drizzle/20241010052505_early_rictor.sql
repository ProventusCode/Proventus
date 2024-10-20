DO $$ BEGIN
 ALTER TABLE "analytics"."user_role" ADD CONSTRAINT "user_role_role_role_resource_role_fk" FOREIGN KEY ("role") REFERENCES "analytics"."role_resource"("role") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
