CREATE TABLE "user" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"username" varchar NOT NULL,
	"tagline" text,
	"bio" text,
	"twitter" varchar,
	"github" varchar,
	"link" text,
	"location" varchar
);
