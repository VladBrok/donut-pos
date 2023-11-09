import { pgTable, pgEnum, uuid, text, integer, index, foreignKey, timestamp, numeric, boolean, time } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"
export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])


export const address = pgTable("address", {
	id: uuid("id").primaryKey().notNull(),
	geoLat: text("geo_lat"),
	geoLon: text("geo_lon"),
	city: text("city"),
	street: text("street"),
	building: text("building"),
	floorNumber: integer("floor_number"),
	room: text("room"),
});

export const client = pgTable("client", {
	id: uuid("id").primaryKey().notNull(),
	addressId: uuid("address_id").references(() => address.id),
	firstName: text("first_name"),
	lastName: text("last_name"),
	phone: text("phone"),
	isPhoneVerified: text("is_phone_verified"),
	passwordHash: text("password_hash"),
	registeredAt: timestamp("registered_at", { mode: 'string' }),
},
(table) => {
	return {
		addressIdIdx: index("client_address_id_idx").on(table.addressId),
		phoneIdx: index("client_phone_idx").on(table.phone),
	}
});

export const dishCategory = pgTable("dish_category", {
	id: uuid("id").primaryKey().notNull(),
	name: text("name"),
	imageUrl: text("image_url"),
});

export const dish = pgTable("dish", {
	id: uuid("id").primaryKey().notNull(),
	categoryId: uuid("category_id").references(() => dishCategory.id),
	name: text("name"),
	imageUrl: text("image_url"),
	description: text("description"),
	price: numeric("price", { precision: 8, scale:  2 }),
	weight: numeric("weight", { precision: 8, scale:  2 }),
	isActive: boolean("is_active"),
},
(table) => {
	return {
		categoryIdIdx: index("dish_category_id_idx").on(table.categoryId),
	}
});

export const salePoint = pgTable("sale_point", {
	id: uuid("id").primaryKey().notNull(),
	addressId: uuid("address_id").references(() => address.id),
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
	salePointId: uuid("sale_point_id").references(() => salePoint.id),
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
	roleId: uuid("role_id").references(() => role.id),
	permissionId: uuid("permission_id").references(() => permission.id),
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

export const employee = pgTable("employee", {
	id: uuid("id").primaryKey().notNull(),
	roleId: uuid("role_id").references(() => role.id),
	firstName: text("first_name"),
	lastName: text("last_name"),
	phone: text("phone"),
	isPhoneVerified: text("is_phone_verified"),
	passwordHash: text("password_hash"),
	registeredAt: timestamp("registered_at", { mode: 'string' }),
},
(table) => {
	return {
		roleIdIdx: index("employee_role_id_idx").on(table.roleId),
		phoneIdx: index("employee_phone_idx").on(table.phone),
	}
});

export const dishToSalePoint = pgTable("dish_to_sale_point", {
	id: uuid("id").primaryKey().notNull(),
	dishId: uuid("dish_id").references(() => dish.id),
	salePointId: uuid("sale_point_id").references(() => salePoint.id),
},
(table) => {
	return {
		dishIdIdx: index("dish_to_sale_point_dish_id_idx").on(table.dishId),
		salePointIdIdx: index("dish_to_sale_point_sale_point_id_idx").on(table.salePointId),
	}
});

export const order = pgTable("order", {
	id: uuid("id").primaryKey().notNull(),
	clientId: uuid("client_id").references(() => client.id),
	employeeId: uuid("employee_id").references(() => employee.id),
	salePointId: uuid("sale_point_id").references(() => salePoint.id),
	number: text("number"),
	tableNumber: text("table_number"),
	comment: text("comment"),
},
(table) => {
	return {
		clientIdIdx: index("order_client_id_idx").on(table.clientId),
		employeeIdIdx: index("order_employee_id_idx").on(table.employeeId),
		salePointIdIdx: index("order_sale_point_id_idx").on(table.salePointId),
		numberIdx: index("order_number_idx").on(table.number),
	}
});

export const orderToDish = pgTable("order_to_dish", {
	id: uuid("id").primaryKey().notNull(),
	orderId: uuid("order_id").references(() => order.id),
	dishId: uuid("dish_id").references(() => dish.id),
	dishCount: integer("dish_count"),
},
(table) => {
	return {
		orderIdIdx: index("order_to_dish_order_id_idx").on(table.orderId),
		dishIdIdx: index("order_to_dish_dish_id_idx").on(table.dishId),
	}
});

export const dishToModification = pgTable("dish_to_modification", {
	id: uuid("id").primaryKey().notNull(),
	dishId: uuid("dish_id").references(() => dish.id),
	modificationId: uuid("modification_id").references(() => modification.id),
},
(table) => {
	return {
		dishIdIdx: index("dish_to_modification_dish_id_idx").on(table.dishId),
		modificationIdIdx: index("dish_to_modification_modification_id_idx").on(table.modificationId),
	}
});

export const modification = pgTable("modification", {
	id: uuid("id").primaryKey().notNull(),
	name: text("name"),
	imageUrl: text("image_url"),
	weight: numeric("weight", { precision: 8, scale:  2 }),
	price: numeric("price", { precision: 8, scale:  2 }),
});

export const orderToDishToModification = pgTable("order_to_dish_to_modification", {
	id: uuid("id").primaryKey().notNull(),
	orderToDishId: uuid("order_to_dish_id").references(() => orderToDish.id),
	modificationId: uuid("modification_id").references(() => modification.id),
	modificationCount: integer("modification_count"),
},
(table) => {
	return {
		orderToDishIdIdx: index("order_to_dish_to_modification_order_to_dish_id_idx").on(table.orderToDishId),
		modificationIdIdx: index("order_to_dish_to_modification_modification_id_idx").on(table.modificationId),
	}
});

export const orderToOrderStatus = pgTable("order_to_order_status", {
	id: uuid("id").primaryKey().notNull(),
	orderId: uuid("order_id").references(() => order.id),
	orderStatusId: uuid("order_status_id").references(() => orderStatus.id),
	date: timestamp("date", { mode: 'string' }),
},
(table) => {
	return {
		orderIdIdx: index("order_to_order_status_order_id_idx").on(table.orderId),
		orderStatusIdIdx: index("order_to_order_status_order_status_id_idx").on(table.orderStatusId),
	}
});

export const orderStatus = pgTable("order_status", {
	id: uuid("id").primaryKey().notNull(),
	codeName: text("code_name"),
});