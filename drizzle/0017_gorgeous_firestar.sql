ALTER TABLE "user" ADD COLUMN "product_hunt" varchar;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "show_product_hunt" boolean DEFAULT false NOT NULL;