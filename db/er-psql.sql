CREATE TABLE "address" (
  "id" UUID PRIMARY KEY,
  "geo_lat" TEXT,
  "geo_lon" TEXT,
  "city" TEXT,
  "street" TEXT,
  "building" TEXT,
  "floor_number" INT,
  "room" TEXT
);

CREATE TABLE "client" (
  "id" UUID PRIMARY KEY,
  "address_id" UUID,
  "first_name" TEXT,
  "last_name" TEXT,
  "phone" TEXT,
  "is_phone_verified" TEXT,
  "password_hash" TEXT,
  "registered_at" TIMESTAMP
);

CREATE TABLE "work_schedule" (
  "id" UUID PRIMARY KEY,
  "sale_point_id" UUID,
  "day_of_week" INT,
  "start" TIME,
  "end" TIME,
  "pause_start" TIME,
  "pause_end" TIME
);

CREATE TABLE "permission" (
  "id" UUID PRIMARY KEY,
  "code_name" TEXT
);

CREATE TABLE "role" (
  "id" UUID PRIMARY KEY,
  "code_name" TEXT
);

CREATE TABLE "role_to_permission" (
  "id" UUID PRIMARY KEY,
  "role_id" UUID,
  "permission_id" UUID
);

CREATE TABLE "employee" (
  "id" UUID PRIMARY KEY,
  "role_id" UUID,
  "first_name" TEXT,
  "last_name" TEXT,
  "phone" TEXT,
  "is_phone_verified" TEXT,
  "password_hash" TEXT,
  "registered_at" TIMESTAMP
);

CREATE TABLE "dish" (
  "id" UUID PRIMARY KEY,
  "category_id" UUID,
  "name" TEXT,
  "image_url" TEXT,
  "description" TEXT,
  "price" "NUMERIC(8, 2)",
  "weight" "NUMERIC(8, 2)",
  "is_active" BOOLEAN
);

CREATE TABLE "dish_category" (
  "id" UUID PRIMARY KEY,
  "name" TEXT,
  "image_url" TEXT
);

CREATE TABLE "sale_point" (
  "id" UUID PRIMARY KEY,
  "address_id" UUID,
  "name" TEXT,
  "phone" TEXT,
  "is_default" BOOLEAN
);

CREATE TABLE "dish_to_sale_point" (
  "id" UUID PRIMARY KEY,
  "dish_id" UUID,
  "sale_point_id" UUID
);

CREATE TABLE "modification" (
  "id" UUID PRIMARY KEY,
  "name" TEXT,
  "image_url" TEXT,
  "weight" "NUMERIC(8, 2)",
  "price" "NUMERIC(8, 2)"
);

CREATE TABLE "dish_to_modification" (
  "id" UUID PRIMARY KEY,
  "dish_id" UUID,
  "modification_id" UUID
);

CREATE TABLE "order_status" (
  "id" UUID PRIMARY KEY,
  "code_name" TEXT
);

CREATE TABLE "order_to_order_status" (
  "id" UUID PRIMARY KEY,
  "order_id" UUID,
  "order_status_id" UUID,
  "date" TIMESTAMP
);

CREATE TABLE "order" (
  "id" UUID PRIMARY KEY,
  "client_id" UUID,
  "employee_id" UUID,
  "sale_point_id" UUID,
  "number" TEXT,
  "table_number" TEXT,
  "comment" TEXT
);

CREATE TABLE "order_to_dish" (
  "id" UUID PRIMARY KEY,
  "order_id" UUID,
  "dish_id" UUID,
  "dish_count" INT
);

CREATE TABLE "order_to_dish_to_modification" (
  "id" UUID PRIMARY KEY,
  "order_to_dish_id" UUID,
  "modification_id" UUID,
  "modification_count" INT
);

CREATE INDEX "client_address_id_idx" ON "client" ("address_id");

CREATE INDEX "client_phone_idx" ON "client" ("phone");

CREATE INDEX "work_schedule_sale_point_id_idx" ON "work_schedule" ("sale_point_id");

CREATE INDEX "role_to_permission_role_id_idx" ON "role_to_permission" ("role_id");

CREATE INDEX "role_to_permission_permission_id_idx" ON "role_to_permission" ("permission_id");

CREATE INDEX "employee_role_id_idx" ON "employee" ("role_id");

CREATE INDEX "employee_phone_idx" ON "employee" ("phone");

CREATE INDEX "dish_category_id_idx" ON "dish" ("category_id");

CREATE INDEX "sale_point_address_id_idx" ON "sale_point" ("address_id");

CREATE INDEX "dish_to_sale_point_dish_id_idx" ON "dish_to_sale_point" ("dish_id");

CREATE INDEX "dish_to_sale_point_sale_point_id_idx" ON "dish_to_sale_point" ("sale_point_id");

CREATE INDEX "dish_to_modification_dish_id_idx" ON "dish_to_modification" ("dish_id");

CREATE INDEX "dish_to_modification_modification_id_idx" ON "dish_to_modification" ("modification_id");

CREATE INDEX "order_to_order_status_order_id_idx" ON "order_to_order_status" ("order_id");

CREATE INDEX "order_to_order_status_order_status_id_idx" ON "order_to_order_status" ("order_status_id");

CREATE INDEX "order_client_id_idx" ON "order" ("client_id");

CREATE INDEX "order_employee_id_idx" ON "order" ("employee_id");

CREATE INDEX "order_sale_point_id_idx" ON "order" ("sale_point_id");

CREATE INDEX "order_number_idx" ON "order" ("number");

CREATE INDEX "order_to_dish_order_id_idx" ON "order_to_dish" ("order_id");

CREATE INDEX "order_to_dish_dish_id_idx" ON "order_to_dish" ("dish_id");

CREATE INDEX "order_to_dish_to_modification_order_to_dish_id_idx" ON "order_to_dish_to_modification" ("order_to_dish_id");

CREATE INDEX "order_to_dish_to_modification_modification_id_idx" ON "order_to_dish_to_modification" ("modification_id");

ALTER TABLE "client" ADD FOREIGN KEY ("address_id") REFERENCES "address" ("id");

ALTER TABLE "dish" ADD FOREIGN KEY ("category_id") REFERENCES "dish_category" ("id");

ALTER TABLE "work_schedule" ADD FOREIGN KEY ("sale_point_id") REFERENCES "sale_point" ("id");

ALTER TABLE "role_to_permission" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");

ALTER TABLE "role_to_permission" ADD FOREIGN KEY ("permission_id") REFERENCES "permission" ("id");

ALTER TABLE "employee" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");

ALTER TABLE "sale_point" ADD FOREIGN KEY ("address_id") REFERENCES "address" ("id");

ALTER TABLE "dish_to_sale_point" ADD FOREIGN KEY ("dish_id") REFERENCES "dish" ("id");

ALTER TABLE "dish_to_sale_point" ADD FOREIGN KEY ("sale_point_id") REFERENCES "sale_point" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("employee_id") REFERENCES "employee" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("client_id") REFERENCES "client" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("sale_point_id") REFERENCES "sale_point" ("id");

ALTER TABLE "order_to_dish" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "order_to_dish" ADD FOREIGN KEY ("dish_id") REFERENCES "dish" ("id");

ALTER TABLE "dish_to_modification" ADD FOREIGN KEY ("dish_id") REFERENCES "dish" ("id");

ALTER TABLE "dish_to_modification" ADD FOREIGN KEY ("modification_id") REFERENCES "modification" ("id");

ALTER TABLE "order_to_dish_to_modification" ADD FOREIGN KEY ("order_to_dish_id") REFERENCES "order_to_dish" ("id");

ALTER TABLE "order_to_dish_to_modification" ADD FOREIGN KEY ("modification_id") REFERENCES "modification" ("id");

ALTER TABLE "order_to_order_status" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "order_to_order_status" ADD FOREIGN KEY ("order_status_id") REFERENCES "order_status" ("id");
