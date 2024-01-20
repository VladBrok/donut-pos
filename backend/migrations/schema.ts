import { pgTable, index, foreignKey, pgEnum, uuid, text, boolean, integer, time, timestamp, jsonb } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"
export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])


export const address = pgTable("address", {
	id: uuid("id").primaryKey().notNull(),
	city: text("city"),
	street: text("street"),
	building: text("building"),
	homeNumber: text("home_number"),
	postalCode: text("postal_code"),
	clientId: uuid("client_id").references(() => client.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		clientIdIdx: index("address_client_id_idx").on(table.clientId),
	}
});

export const dishCategory = pgTable("dish_category", {
	id: uuid("id").primaryKey().notNull(),
	name: text("name"),
	imageUrl: text("image_url"),
});

export const salePoint = pgTable("sale_point", {
	id: uuid("id").primaryKey().notNull(),
	addressId: uuid("address_id").references(() => address.id, { onDelete: "set null" } ).references(() => address.id, { onDelete: "set null" } ).references(() => address.id, { onDelete: "set null" } ).references(() => address.id, { onDelete: "set null" } ),
	name: text("name"),
	phone: text("phone"),
	isDefault: boolean("is_default"),
},
(table) => {
	return {
		addressIdIdx: index("sale_point_address_id_idx").on(table.addressId),
	}
});

export const workSchedule = pgTable("work_schedule", {
	id: uuid("id").primaryKey().notNull(),
	salePointId: uuid("sale_point_id").references(() => salePoint.id, { onDelete: "set null" } ).references(() => salePoint.id, { onDelete: "set null" } ).references(() => salePoint.id, { onDelete: "set null" } ).references(() => salePoint.id, { onDelete: "set null" } ),
	dayOfWeek: integer("day_of_week"),
	start: time("start"),
	end: time("end"),
	pauseStart: time("pause_start"),
	pauseEnd: time("pause_end"),
},
(table) => {
	return {
		salePointIdIdx: index("work_schedule_sale_point_id_idx").on(table.salePointId),
	}
});

export const role = pgTable("role", {
	id: uuid("id").primaryKey().notNull(),
	codeName: text("code_name"),
});

export const roleToPermission = pgTable("role_to_permission", {
	id: uuid("id").primaryKey().notNull(),
	roleId: uuid("role_id").references(() => role.id, { onDelete: "set null" } ).references(() => role.id, { onDelete: "set null" } ).references(() => role.id, { onDelete: "set null" } ).references(() => role.id, { onDelete: "set null" } ),
	permissionId: uuid("permission_id").references(() => permission.id, { onDelete: "set null" } ).references(() => permission.id, { onDelete: "set null" } ).references(() => permission.id, { onDelete: "set null" } ).references(() => permission.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		roleIdIdx: index("role_to_permission_role_id_idx").on(table.roleId),
		permissionIdIdx: index("role_to_permission_permission_id_idx").on(table.permissionId),
	}
});

export const permission = pgTable("permission", {
	id: uuid("id").primaryKey().notNull(),
	codeName: text("code_name"),
});

export const dishToSalePoint = pgTable("dish_to_sale_point", {
	id: uuid("id").primaryKey().notNull(),
	dishId: uuid("dish_id").references(() => dish.id, { onDelete: "set null" } ).references(() => dish.id, { onDelete: "set null" } ).references(() => dish.id, { onDelete: "set null" } ).references(() => dish.id, { onDelete: "set null" } ),
	salePointId: uuid("sale_point_id").references(() => salePoint.id, { onDelete: "set null" } ).references(() => salePoint.id, { onDelete: "set null" } ).references(() => salePoint.id, { onDelete: "set null" } ).references(() => salePoint.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		dishIdIdx: index("dish_to_sale_point_dish_id_idx").on(table.dishId),
		salePointIdIdx: index("dish_to_sale_point_sale_point_id_idx").on(table.salePointId),
	}
});

export const dishToModification = pgTable("dish_to_modification", {
	id: uuid("id").primaryKey().notNull(),
	dishId: uuid("dish_id").references(() => dish.id, { onDelete: "set null" } ).references(() => dish.id, { onDelete: "set null" } ).references(() => dish.id, { onDelete: "set null" } ).references(() => dish.id, { onDelete: "set null" } ),
	modificationId: uuid("modification_id").references(() => modification.id, { onDelete: "set null" } ).references(() => modification.id, { onDelete: "set null" } ).references(() => modification.id, { onDelete: "set null" } ).references(() => modification.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		dishIdIdx: index("dish_to_modification_dish_id_idx").on(table.dishId),
		modificationIdIdx: index("dish_to_modification_modification_id_idx").on(table.modificationId),
	}
});

export const client = pgTable("client", {
	id: uuid("id").primaryKey().notNull(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	phone: text("phone"),
	isPhoneVerified: boolean("is_phone_verified"),
	passwordHash: text("password_hash"),
	registeredAt: timestamp("registered_at", { mode: 'date' }),
	email: text("email"),
	isEmailVerified: boolean("is_email_verified"),
},
(table) => {
	return {
		phoneIdx: index("client_phone_idx").on(table.phone),
		emailIdx: index("client_email_idx").on(table.email),
	}
});

export const employee = pgTable("employee", {
	id: uuid("id").primaryKey().notNull(),
	roleId: uuid("role_id").references(() => role.id, { onDelete: "set null" } ).references(() => role.id, { onDelete: "set null" } ).references(() => role.id, { onDelete: "set null" } ).references(() => role.id, { onDelete: "set null" } ),
	firstName: text("first_name"),
	lastName: text("last_name"),
	phone: text("phone"),
	isPhoneVerified: boolean("is_phone_verified"),
	passwordHash: text("password_hash"),
	registeredAt: timestamp("registered_at", { mode: 'date' }),
	email: text("email"),
	isEmailVerified: boolean("is_email_verified"),
},
(table) => {
	return {
		roleIdIdx: index("employee_role_id_idx").on(table.roleId),
		phoneIdx: index("employee_phone_idx").on(table.phone),
		emailIdx: index("employee_email_idx").on(table.email),
	}
});

export const dish = pgTable("dish", {
	id: uuid("id").primaryKey().notNull(),
	categoryId: uuid("category_id").references(() => dishCategory.id, { onDelete: "set null" } ).references(() => dishCategory.id, { onDelete: "set null" } ).references(() => dishCategory.id, { onDelete: "set null" } ).references(() => dishCategory.id, { onDelete: "set null" } ),
	name: text("name"),
	imageUrl: text("image_url"),
	description: text("description"),
	price: integer("price"),
	weight: integer("weight"),
	isActive: boolean("is_active"),
},
(table) => {
	return {
		categoryIdIdx: index("dish_category_id_idx").on(table.categoryId),
	}
});

export const modification = pgTable("modification", {
	id: uuid("id").primaryKey().notNull(),
	name: text("name"),
	imageUrl: text("image_url"),
	weight: integer("weight"),
	price: integer("price"),
});

export const orderToDishes = pgTable("order_to_dishes", {
	id: uuid("id").primaryKey().notNull(),
	orderId: uuid("order_id").references(() => order.id, { onDelete: "set null" } ),
	dishes: jsonb("dishes"),
},
(table) => {
	return {
		orderId: index("order_to_dishes_order_id").on(table.orderId),
	}
});

export const diningTable = pgTable("dining_table", {
	id: uuid("id").primaryKey().notNull(),
	employeeId: uuid("employee_id").references(() => employee.id, { onDelete: "set null" } ),
	number: text("number"),
},
(table) => {
	return {
		employeeIdIdx: index("dining_table_employee_id_idx").on(table.employeeId),
		numberIdx: index("dining_table_number_idx").on(table.number),
	}
});

export const cashPaymentRequest = pgTable("cash_payment_request", {
	id: uuid("id").primaryKey().notNull(),
	orderId: uuid("order_id").references(() => order.id, { onDelete: "set null" } ),
	totalCost: integer("total_cost"),
},
(table) => {
	return {
		orderIdIdx: index("cash_payment_request_order_id_idx").on(table.orderId),
	}
});

export const order = pgTable("order", {
	id: uuid("id").primaryKey().notNull(),
	clientId: uuid("client_id").references(() => client.id, { onDelete: "set null" } ),
	employeeId: uuid("employee_id").references(() => employee.id, { onDelete: "set null" } ),
	salePointId: uuid("sale_point_id").references(() => salePoint.id, { onDelete: "set null" } ),
	number: text("number"),
	comment: text("comment"),
	status: text("status"),
	createdDate: timestamp("created_date", { mode: 'date' }),
	cookingDate: timestamp("cooking_date", { mode: 'date' }),
	cookedDate: timestamp("cooked_date", { mode: 'date' }),
	deliveringDate: timestamp("delivering_date", { mode: 'date' }),
	deliveredDate: timestamp("delivered_date", { mode: 'date' }),
	paidDate: timestamp("paid_date", { mode: 'date' }),
	diningTableId: uuid("dining_table_id").references(() => diningTable.id, { onDelete: "set null" } ),
	type: text("type"),
	deliveryAddress: jsonb("delivery_address"),
},
(table) => {
	return {
		diningTableIdIdx: index("order_dining_table_id_idx").on(table.diningTableId),
		typeIdx: index("order_type_idx").on(table.type),
		statusIdx: index("order_status_idx").on(table.status),
		clientIdIdx: index("order_client_id_idx").on(table.clientId),
		employeeIdIdx: index("order_employee_id_idx").on(table.employeeId),
		salePointIdIdx: index("order_sale_point_id_idx").on(table.salePointId),
		numberIdx: index("order_number_idx").on(table.number),
	}
});