import { browser, createI18n, localeFrom, params } from "@nanostores/i18n";
import { useStore as useNanoStore } from "@nanostores/vue";
import { USER_NOT_FOUND, WRONG_PASSWORD } from "donut-shared";
import {
  ACCESS_DENIED,
  CATEGORY_NAME_EXISTS,
  IMAGE_UPLOAD_FAIL,
  MODIFICATION_NAME_EXISTS,
} from "donut-shared/src/constants";

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
  addModification: "Add modification",
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
  modificationNameLabel: "Modification name",
  deleteButton: "Delete",
  confirm: "Confirm",
  noResults: "No results",
  dishDescriptionPlaceholder: "The best dish",
  search: "Search",
  modifications: "Modifications",
  createModification: "Create modification",
  updateModification: "Update modification",

  // Admin login page
  loginPageTitle: "Admin panel",
  passwordRequired: "Please enter a password",
  phoneRequired: "Please enter a phone number",
  phoneLabel: "Phone",
  phoneExample: "Example",
  passwordLabel: "Password",
  logIn: "Log in",
  showPassword: "Show password",
  hidePassword: "Hide password",

  // Confirmations
  confirmDishCategoryDelete: "Are you sure you want to delete category",
  confirmDishDelete: "Are you sure you want to delete dish",
  confirmModificationDelete: "Are you sure you want to delete modification",

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
  [CATEGORY_NAME_EXISTS]: params(
    'Category with name "{name}" already exists. Please choose another name'
  ),
  [MODIFICATION_NAME_EXISTS]: params(
    'Modification with name "{name}" already exists. Please choose another name'
  ),
  imageCorrupted: "The image is corrupted. Try to choose a different one",
  [ACCESS_DENIED]: "Access denied",
});

export function useI18nStore() {
  return useNanoStore(messages);
}
