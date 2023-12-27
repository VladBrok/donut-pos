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

export const PHONE_REGEX = /^\d{9}$/;

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
