ALTER TABLE "user" ADD COLUMN "medium" varchar;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "show_medium" boolean DEFAULT false NOT NULL;