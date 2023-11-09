-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('default', 'valid', 'invalid', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('totp', 'webauthn');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('unverified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal1', 'aal2', 'aal3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('s256', 'plain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"id" uuid PRIMARY KEY NOT NULL,
	"geo_lat" text,
	"geo_lon" text,
	"city" text,
	"street" text,
	"building" text,
	"floor_number" integer,
	"room" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "client" (
	"id" uuid PRIMARY KEY NOT NULL,
	"address_id" uuid,
	"first_name" text,
	"last_name" text,
	"phone" text,
	"is_phone_verified" text,
	"password_hash" text,
	"registered_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dish_category" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dish" (
	"id" uuid PRIMARY KEY NOT NULL,
	"category_id" uuid,
	"name" text,
	"image_url" text,
	"description" text,
	"price" numeric(8, 2),
	"weight" numeric(8, 2),
	"is_active" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sale_point" (
	"id" uuid PRIMARY KEY NOT NULL,
	"address_id" uuid,
	"name" text,
	"phone" text,
	"is_default" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "work_schedule" (
	"id" uuid PRIMARY KEY NOT NULL,
	"sale_point_id" uuid,
	"day_of_week" integer,
	"start" time,
	"end" time,
	"pause_start" time,
	"pause_end" time
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code_name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role_to_permission" (
	"id" uuid PRIMARY KEY NOT NULL,
	"role_id" uuid,
	"permission_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "permission" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code_name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee" (
	"id" uuid PRIMARY KEY NOT NULL,
	"role_id" uuid,
	"first_name" text,
	"last_name" text,
	"phone" text,
	"is_phone_verified" text,
	"password_hash" text,
	"registered_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dish_to_sale_point" (
	"id" uuid PRIMARY KEY NOT NULL,
	"dish_id" uuid,
	"sale_point_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"id" uuid PRIMARY KEY NOT NULL,
	"client_id" uuid,
	"employee_id" uuid,
	"sale_point_id" uuid,
	"number" text,
	"table_number" text,
	"comment" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_to_dish" (
	"id" uuid PRIMARY KEY NOT NULL,
	"order_id" uuid,
	"dish_id" uuid,
	"dish_count" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dish_to_modification" (
	"id" uuid PRIMARY KEY NOT NULL,
	"dish_id" uuid,
	"modification_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "modification" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"image_url" text,
	"weight" numeric(8, 2),
	"price" numeric(8, 2)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_to_dish_to_modification" (
	"id" uuid PRIMARY KEY NOT NULL,
	"order_to_dish_id" uuid,
	"modification_id" uuid,
	"modification_count" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_to_order_status" (
	"id" uuid PRIMARY KEY NOT NULL,
	"order_id" uuid,
	"order_status_id" uuid,
	"date" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_status" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code_name" text
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "client_address_id_idx" ON "client" ("address_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "client_phone_idx" ON "client" ("phone");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "dish_category_id_idx" ON "dish" ("category_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sale_point_address_id_idx" ON "sale_point" ("address_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "work_schedule_sale_point_id_idx" ON "work_schedule" ("sale_point_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "role_to_permission_role_id_idx" ON "role_to_permission" ("role_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "role_to_permission_permission_id_idx" ON "role_to_permission" ("permission_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "employee_role_id_idx" ON "employee" ("role_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "employee_phone_idx" ON "employee" ("phone");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "dish_to_sale_point_dish_id_idx" ON "dish_to_sale_point" ("dish_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "dish_to_sale_point_sale_point_id_idx" ON "dish_to_sale_point" ("sale_point_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_client_id_idx" ON "order" ("client_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_employee_id_idx" ON "order" ("employee_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_sale_point_id_idx" ON "order" ("sale_point_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_number_idx" ON "order" ("number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_to_dish_order_id_idx" ON "order_to_dish" ("order_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_to_dish_dish_id_idx" ON "order_to_dish" ("dish_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "dish_to_modification_dish_id_idx" ON "dish_to_modification" ("dish_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "dish_to_modification_modification_id_idx" ON "dish_to_modification" ("modification_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_to_dish_to_modification_order_to_dish_id_idx" ON "order_to_dish_to_modification" ("order_to_dish_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_to_dish_to_modification_modification_id_idx" ON "order_to_dish_to_modification" ("modification_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_to_order_status_order_id_idx" ON "order_to_order_status" ("order_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_to_order_status_order_status_id_idx" ON "order_to_order_status" ("order_status_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client" ADD CONSTRAINT "client_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dish" ADD CONSTRAINT "dish_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "dish_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sale_point" ADD CONSTRAINT "sale_point_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "work_schedule" ADD CONSTRAINT "work_schedule_sale_point_id_fkey" FOREIGN KEY ("sale_point_id") REFERENCES "sale_point"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "role_to_permission" ADD CONSTRAINT "role_to_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "role_to_permission" ADD CONSTRAINT "role_to_permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee" ADD CONSTRAINT "employee_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dish_to_sale_point" ADD CONSTRAINT "dish_to_sale_point_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "dish"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dish_to_sale_point" ADD CONSTRAINT "dish_to_sale_point_sale_point_id_fkey" FOREIGN KEY ("sale_point_id") REFERENCES "sale_point"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_sale_point_id_fkey" FOREIGN KEY ("sale_point_id") REFERENCES "sale_point"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_to_dish" ADD CONSTRAINT "order_to_dish_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "dish"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_to_dish" ADD CONSTRAINT "order_to_dish_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dish_to_modification" ADD CONSTRAINT "dish_to_modification_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "dish"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dish_to_modification" ADD CONSTRAINT "dish_to_modification_modification_id_fkey" FOREIGN KEY ("modification_id") REFERENCES "modification"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_to_dish_to_modification" ADD CONSTRAINT "order_to_dish_to_modification_modification_id_fkey" FOREIGN KEY ("modification_id") REFERENCES "modification"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_to_dish_to_modification" ADD CONSTRAINT "order_to_dish_to_modification_order_to_dish_id_fkey" FOREIGN KEY ("order_to_dish_id") REFERENCES "order_to_dish"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_to_order_status" ADD CONSTRAINT "order_to_order_status_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_to_order_status" ADD CONSTRAINT "order_to_order_status_order_status_id_fkey" FOREIGN KEY ("order_status_id") REFERENCES "order_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/