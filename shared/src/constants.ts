export const CHANNELS = {
  DISH_CATEGORIES: "dishCategories",
};

export const ANONYMOUS = {
  userId: "anonymous",
};

export const MISSING_PHOTO_PLACEHOLDER_URL =
  "https://i.ibb.co/DzSX5s3/placeholder.png";

// Validation

export const MAX_DISH_CATEGORY_NAME_LENGTH = 50;

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
