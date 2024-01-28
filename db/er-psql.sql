CREATE TABLE "address" (
  "id" UUID PRIMARY KEY,
  "client_id" UUID,
  "city" TEXT,
  "street" TEXT,
  "home_number" TEXT,
  "postal_code" TEXT
);

CREATE TABLE "dining_table" (
  "id" UUID PRIMARY KEY,
  "employee_id" UUID,
  "number" TEXT
);

CREATE TABLE "client" (
  "id" UUID PRIMARY KEY,
  "first_name" TEXT,
  "last_name" TEXT,
  "phone" TEXT,
  "is_phone_verified" BOOLEAN,
  "email" TEXT,
  "is_email_verified" BOOLEAN,
  "is_anonymous" BOOLEAN,
  "password_hash" TEXT,
  "registered_at" TIMESTAMP
);

CREATE TABLE "cash_payment_request" (
  "id" UUID PRIMARY KEY,
  "order_id" UUID,
  "total_cost" INT,
  "requested_at" TIMESTAMP
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
  "is_phone_verified" BOOLEAN,
  "email" TEXT,
  "is_email_verified" BOOLEAN,
  "password_hash" TEXT,
  "registered_at" TIMESTAMP
);

CREATE TABLE "dish" (
  "id" UUID PRIMARY KEY,
  "category_id" UUID,
  "name" TEXT,
  "image_url" TEXT,
  "description" TEXT,
  "price" INT,
  "weight" INT,
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
  "email" TEXT,
  "is_default" BOOLEAN,
  "work_schedule" JSONB
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
  "weight" INT,
  "price" INT
);

CREATE TABLE "dish_to_modification" (
  "id" UUID PRIMARY KEY,
  "dish_id" UUID,
  "modification_id" UUID
);

CREATE TABLE "order" (
  "id" UUID PRIMARY KEY,
  "client_id" UUID,
  "employee_id" UUID,
  "sale_point_id" UUID,
  "dining_table_id" UUID,
  "delivery_address" JSONB,
  "type" TEXT,
  "number" TEXT,
  "comment" TEXT,
  "status" TEXT,
  "created_date" TIMESTAMP,
  "cooking_date" TIMESTAMP,
  "cooked_date" TIMESTAMP,
  "delivering_date" TIMESTAMP,
  "delivered_date" TIMESTAMP,
  "paid_date" TIMESTAMP
);

CREATE TABLE "order_to_dishes" (
  "id" UUID PRIMARY KEY,
  "order_id" UUID,
  "dishes" JSONB
);

CREATE INDEX "address_client_id_idx" ON "address" ("client_id");

CREATE INDEX "dining_table_employee_id_idx" ON "dining_table" ("employee_id");

CREATE INDEX "dining_table_number_idx" ON "dining_table" ("number");

CREATE INDEX "client_phone_idx" ON "client" ("phone");

CREATE INDEX "client_email_idx" ON "client" ("email");

CREATE INDEX "client_is_anonymous_idx" ON "client" ("is_anonymous");

CREATE INDEX "cash_payment_request_order_id_idx" ON "cash_payment_request" ("order_id");

CREATE INDEX "role_to_permission_role_id_idx" ON "role_to_permission" ("role_id");

CREATE INDEX "role_to_permission_permission_id_idx" ON "role_to_permission" ("permission_id");

CREATE INDEX "employee_role_id_idx" ON "employee" ("role_id");

CREATE INDEX "employee_phone_idx" ON "employee" ("phone");

CREATE INDEX "employee_email_idx" ON "employee" ("email");

CREATE INDEX "dish_category_id_idx" ON "dish" ("category_id");

CREATE INDEX "sale_point_address_id_idx" ON "sale_point" ("address_id");

CREATE INDEX "dish_to_sale_point_dish_id_idx" ON "dish_to_sale_point" ("dish_id");

CREATE INDEX "dish_to_sale_point_sale_point_id_idx" ON "dish_to_sale_point" ("sale_point_id");

CREATE INDEX "dish_to_modification_dish_id_idx" ON "dish_to_modification" ("dish_id");

CREATE INDEX "dish_to_modification_modification_id_idx" ON "dish_to_modification" ("modification_id");

CREATE INDEX "order_client_id_idx" ON "order" ("client_id");

CREATE INDEX "order_dining_table_id_idx" ON "order" ("dining_table_id");

CREATE INDEX "order_employee_id_idx" ON "order" ("employee_id");

CREATE INDEX "order_sale_point_id_idx" ON "order" ("sale_point_id");

CREATE INDEX "order_number_idx" ON "order" ("number");

CREATE INDEX "order_status_idx" ON "order" ("status");

CREATE INDEX "order_type_idx" ON "order" ("type");

CREATE INDEX "order_to_dishes_order_id" ON "order_to_dishes" ("order_id");

ALTER TABLE "dining_table" ADD FOREIGN KEY ("employee_id") REFERENCES "employee" ("id") ON DELETE SET NULL;

ALTER TABLE "order_to_dishes" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE SET NULL;

ALTER TABLE "cash_payment_request" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE SET NULL;

ALTER TABLE "address" ADD FOREIGN KEY ("client_id") REFERENCES "client" ("id") ON DELETE SET NULL;

ALTER TABLE "dish" ADD FOREIGN KEY ("category_id") REFERENCES "dish_category" ("id") ON DELETE SET NULL;

ALTER TABLE "role_to_permission" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE SET NULL;

ALTER TABLE "role_to_permission" ADD FOREIGN KEY ("permission_id") REFERENCES "permission" ("id") ON DELETE SET NULL;

ALTER TABLE "employee" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE SET NULL;

ALTER TABLE "sale_point" ADD FOREIGN KEY ("address_id") REFERENCES "address" ("id") ON DELETE SET NULL;

ALTER TABLE "dish_to_sale_point" ADD FOREIGN KEY ("dish_id") REFERENCES "dish" ("id") ON DELETE SET NULL;

ALTER TABLE "dish_to_sale_point" ADD FOREIGN KEY ("sale_point_id") REFERENCES "sale_point" ("id") ON DELETE SET NULL;

ALTER TABLE "order" ADD FOREIGN KEY ("employee_id") REFERENCES "employee" ("id") ON DELETE SET NULL;

ALTER TABLE "order" ADD FOREIGN KEY ("client_id") REFERENCES "client" ("id") ON DELETE SET NULL;

ALTER TABLE "order" ADD FOREIGN KEY ("dining_table_id") REFERENCES "dining_table" ("id") ON DELETE SET NULL;

ALTER TABLE "order" ADD FOREIGN KEY ("sale_point_id") REFERENCES "sale_point" ("id") ON DELETE SET NULL;

ALTER TABLE "dish_to_modification" ADD FOREIGN KEY ("dish_id") REFERENCES "dish" ("id") ON DELETE SET NULL;

ALTER TABLE "dish_to_modification" ADD FOREIGN KEY ("modification_id") REFERENCES "modification" ("id") ON DELETE SET NULL;
