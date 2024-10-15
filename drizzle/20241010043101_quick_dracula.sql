CREATE TABLE IF NOT EXISTS "analytics"."role_resource" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" "analytics"."role_enum" NOT NULL,
	"resources" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
