// Misc

export const CHANNELS = {
  DISH_CATEGORIES: "dishCategories",
  DISHES: "dishes",
  MODIFICATIONS: "modifications",
  EMPLOYEES: "employees",
  ROLES: "roles",
};

export const ANONYMOUS = {
  userId: "anonymous",
};

export const MISSING_PHOTO_PLACEHOLDER_URL =
  "https://i.ibb.co/DzSX5s3/placeholder.png";

// Validation

export const MAX_DISH_CATEGORY_NAME_LENGTH = 50;

export const MAX_DISH_NAME_LENGTH = 50;
export const MIN_DISH_PRICE = 0.01;
export const MAX_DISH_PRICE = 1000000;
export const MIN_DISH_WEIGHT = 0.01;
export const MAX_DISH_WEIGHT = 100000000;

export const MAX_MODIFICATION_NAME_LENGTH = 50;
export const MIN_MODIFICATION_PRICE = 0.01;
export const MAX_MODIFICATION_PRICE = 1000000;
export const MIN_MODIFICATION_WEIGHT = 0.01;
export const MAX_MODIFICATION_WEIGHT = 100000000;

export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_SPECIAL_CHARS = "! @ # $ % ^ & * ( ) _ - + = | < > / ? ~";
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
