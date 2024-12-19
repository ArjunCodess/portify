CREATE TABLE "projects_clicks" (
	"id" varchar PRIMARY KEY NOT NULL,
	"project_id" varchar NOT NULL,
	"timestamp" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects_clicks" ADD CONSTRAINT "projects_clicks_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;