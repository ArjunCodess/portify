ALTER TABLE "user" ADD COLUMN "devto" varchar;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "show_devto" boolean DEFAULT false NOT NULL;