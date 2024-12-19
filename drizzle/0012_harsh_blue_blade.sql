CREATE TABLE "profile_visits" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"timestamp" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profile_visits" ADD CONSTRAINT "profile_visits_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "profile_visit_count";