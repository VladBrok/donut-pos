import { browser, createI18n, localeFrom, params } from "@nanostores/i18n";
import { useStore as useNanoStore } from "@nanostores/vue";
import { USER_NOT_FOUND, WRONG_PASSWORD } from "donut-shared";
import { IMAGE_UPLOAD_FAIL } from "donut-shared/src/errors";

export const locale = localeFrom(
  // atom("pl"),
  browser({
    available: ["en" /* "pl" */],
    fallback: "en",
  })
);

export const i18n = createI18n(locale, {
  async get(code) {
    return await import(`./translations/${code}.json`);
  },
});

export const messages = i18n("admin", {
  // Admin dashboard
  dashboard: "Dashboard",
  logout: "Logout",
  dishCategories: "Categories",
  createDishCategory: "Create dish category",
  updateDishCategory: "Update dish category",
  dishes: "Dishes",
  createDish: "Create dish",
  updateDish: "Update dish",
  image: "Image",
  name: "Name",
  category: "Category",
  description: "Description",
  price: "Price, zł",
  weight: "Weight, g",
  active: "Active",
  perPage: "Records per page",
  addDishCategory: "Add category",
  addDish: "Add dish",
  fieldRequired: "The field is required",
  maxLength: params("Max length is {max}"),
  minValue: params("Min value is {min}"),
  maxValue: params("Max value is {max}"),
  maxFileSize: params("Max file size is {max} mb"),
  allowedFilesAre: params("Allowed file types are {allowed}"),
  save: "Save",
  cancel: "Cancel",
  uploadImage: "Upload image",
  categoryNameLabel: "Category name",
  dishNameLabel: "Dish name",
  deleteButton: "Delete",
  confirm: "Confirm",
  noResults: "No results",
  dishDescriptionPlaceholder: "The best dish",

  // Admin login page
  loginPageTitle: "Admin panel",
  passwordRequired: "Please enter a password",
  phoneRequired: "Please enter a phone number",
  phoneLabel: "Phone",
  phoneExample: "Example",
  passwordLabel: "Password",
  logIn: "Login",

  // Confirmations
  confirmDishCategoryDelete: "Are you sure you want to delete category",
  confirmDishDelete: "Are you sure you want to delete dish",

  // Logux statuses
  disconnectedMessage: "Cannot connect to the server",
  disconnectedCaption: "Your changes have not been saved",
  protocolErrorMessage: "Saving is not working",
  protocolErrorCaption: "Refresh the page",
  sending: "Saving changes",
  synchronized: "Saved",

  // Success
  deleteSuccess: "Deleted successfully",
  createSuccess: "Created successfully",
  updateSuccess: "Updated successfully",

  // Errors
  [USER_NOT_FOUND]: params("User with phone {phone} was not found"),
  [WRONG_PASSWORD]: "Wrong password",
  [IMAGE_UPLOAD_FAIL]: "Failed to upload the image",
  imageCorrupted: "The image is corrupted. Try to choose a different one",
});

export function useI18nStore() {
  return useNanoStore(messages);
}
