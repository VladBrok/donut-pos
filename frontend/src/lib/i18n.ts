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
  dishes: "Dishes",
  image: "Image",
  name: "Name",
  perPage: "Records per page",
  addDishCategory: "Add category",
  fieldRequired: "The field is required",
  save: "Save",
  cancel: "Cancel",
  uploadImage: "Upload image",
  categoryNameLabel: "Category name",

  // Admin login page
  loginPageTitle: "Login to Admin panel",
  passwordRequired: "Please enter a password",
  phoneRequired: "Please enter a phone number",
  phoneLabel: "Phone",
  phoneExample: "Example",
  passwordLabel: "Password",

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

  // Errors
  [USER_NOT_FOUND]: params("User with phone {phone} was not found"),
  [WRONG_PASSWORD]: "Wrong password",
  [IMAGE_UPLOAD_FAIL]: "Failed to upload the image",
  imageCorrupted: "The image is corrupted. Try to choose a different one",
});

export function useI18nStore() {
  return useNanoStore(messages);
}
