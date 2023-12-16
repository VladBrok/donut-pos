// Misc

export const CHANNELS = {
  DISH_CATEGORIES: "dishCategories",
  DISHES: "dishes",
  MODIFICATIONS: "modifications",
  EMPLOYEES: "employees",
  ROLES: "roles",
  ORDERS: "orders",
  ORDERS_OF_EMPLOYEE: "orders/:employeeId",
};

export const ANONYMOUS = {
  userId: "anonymous",
};

export const EMPLOYEE_ROLES = {
  ADMIN: "admin",
  COOK: "cook",
  WAITER: "waiter",
  COURIER: "courier",
} as const;
export const EMPLOYEE_PERMISSIONS = structuredClone(EMPLOYEE_ROLES);
export const EMPLOYEE_ROLES_ARR = Object.values(EMPLOYEE_ROLES);

export const ORDER_STATUSES = {
  CREATED: "created",
  COOKING: "cooking",
  COOKED: "cooked",
  PAID: "paid",
} as const;
export const ORDER_STATUSES_ARR = Object.values(ORDER_STATUSES);
export type OrderStatus = (typeof ORDER_STATUSES)[keyof typeof ORDER_STATUSES];

export const MISSING_PHOTO_PLACEHOLDER_URL =
  "https://i.ibb.co/DzSX5s3/placeholder.png";
export const MENU_IMAGE_URL = "https://i.ibb.co/x32LbTp/282465.png";

export const ITEMS_PER_PAGE = 10;

// Validation

export const MAX_DISH_CATEGORY_NAME_LENGTH = 50;

export const MAX_DISH_NAME_LENGTH = 50;
export const MIN_DISH_PRICE = 0.01;
export const MAX_DISH_PRICE = 1000000;
export const MIN_DISH_WEIGHT = 1;
export const MAX_DISH_WEIGHT = 100000000;

export const MAX_MODIFICATION_NAME_LENGTH = 50;
export const MIN_MODIFICATION_PRICE = 0.01;
export const MAX_MODIFICATION_PRICE = 1000000;
export const MIN_MODIFICATION_WEIGHT = 1;
export const MAX_MODIFICATION_WEIGHT = 100000000;

export const TABLE_NUMBER_MAX_LENGTH = 50;
export const COMMENT_MAX_LENGTH = 300;

export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_SPECIAL_CHARS = "! @ # $ % ^ & * ( ) + = < > / ? ~";
export const FIRST_NAME_MAX_LENGTH = 50;
export const LAST_NAME_MAX_LENGTH = 50;

export const PHONE_REGEX = /^\+48\d{9}$/;

export const MAX_IMAGE_FILE_SIZE_BYTES = 1000000 * 5;
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/webp",
];
export const ALLOWED_IMAGE_EXTENSIONS = ALLOWED_IMAGE_TYPES.map(
  (x) => `.${x.slice(x.indexOf("/") + 1)}`
);

// Errors

export const USER_NOT_FOUND = "userNotFound";
export const WRONG_PASSWORD = "wrongPassword";
export const IMAGE_UPLOAD_FAIL = "imageUploadFail";
export const CATEGORY_NAME_EXISTS = "categoryNameExists";
export const MODIFICATION_NAME_EXISTS = "modificationNameExists";
export const EMPLOYEE_WITH_PHONE_EXISTS = "employeeWithPhoneExists";
export const ACCESS_DENIED = "accessDenied";
