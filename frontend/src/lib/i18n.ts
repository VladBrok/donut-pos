import {
  browser,
  count,
  createI18n,
  localeFrom,
  params,
} from "@nanostores/i18n";
import { useStore as useNanoStore } from "@nanostores/vue";
import {
  ACCESS_DENIED,
  CATEGORY_NAME_EXISTS,
  EMPLOYEE_WITH_PHONE_EXISTS,
  IMAGE_UPLOAD_FAIL,
  MODIFICATION_NAME_EXISTS,
  PASSWORD_MIN_LENGTH,
  PASSWORD_SPECIAL_CHARS,
  PAYMENT_LINK_GENERATION_ERROR,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from "donut-shared";

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

export const messages = i18n("messages", {
  // Config
  weightGram: "g",

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
  phone: "Phone",
  isPhoneVerified: "Phone verified",
  role: "Role",
  firstName: "First name",
  lastName: "Last name",
  registeredAt: "Registration date",
  description: "Description",
  price: "Price, zł",
  weight: "Weight, g",
  active: "Active",
  perPage: "Records per page",
  addDishCategory: "Add category",
  addDish: "Add dish",
  addEmployee: "Add employee",
  addModification: "Add modification",
  fieldRequired: "The field is required",
  maxLength: params("Max length is {max}"),
  minLength: params("Min length is {min}"),
  minValue: params("Min value is {min}"),
  maxValue: params("Max value is {max}"),
  maxFileSize: params("Max file size is {max} mb"),
  allowedFilesAre: params("Allowed file types are {allowed}"),
  sameModificationAlreadyAdded:
    "Same modification was already added to this dish",
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
  employees: "Employees",
  createModification: "Create modification",
  updateModification: "Update modification",
  createEmployee: "Create employee",
  updateEmployee: "Update employee",
  invalidPhoneLengths: "Phone should have exactly 9 digits",
  passwordShouldContainDigit: "Password should contain at least 1 digit",
  passwordShouldContainUppercase:
    "Password should contain at least 1 uppercase latin letter",
  passwordShouldContainLowercase:
    "Password should contain at least 1 lowercase latin letter",
  passwordShouldContainSpecial: `Password should contain at least 1 of the following characters: ${PASSWORD_SPECIAL_CHARS}`,
  phoneExample: "Example",
  passwordHint: `Hint: at least ${PASSWORD_MIN_LENGTH} characters. At least 1 digit, 1 uppercase, 1 lowercase and 1 special`,
  noDataFound: "No data found",
  goBack: "Go back",

  // Waiter pages
  main: "Main",
  searchDishes: "Search by name, price, category or weight",
  searchOrders: "Search by order number, table or comment",
  allMenu: "All menu",
  addToCurrentOrder: "Add to order",
  addToOrderButton: "Add to order",
  modificationsTitle: "In addition",
  showNotifications: "Show notifications",
  openCurrentOrder: "Open current order",
  currentOrder: "Current Order",
  emptyOrder: "Order is empty",
  order: "Order",
  createOrder: "Create order",
  clearOrder: "Clear",
  tableNumberLabel: "Table number",
  waiterName: "Waiter",
  commentLabel: "Comment",
  totalDishes: count({
    one: "{count} dish",
    many: "{count} dishes",
  }),
  orders: "Orders",
  menu: "Menu",
  orderNumber: "Order number",
  tableNumber: "Table",
  orderStatus: "Status",
  dishCount: "Dishes",
  total: "Total, zł",
  copyOrderNumber: "Copy order number to clipboard",
  outOfStock: "Out of stock",
  cannotCreateOrderWithOutOfStock:
    "Some dishes are out of stock. Please remove them from the order before proceeding",
  dishCooked: params(`{dishName} for table {table} is ready`),
  delivered: "Delivered",
  selectPaymentMethod: "Select payment method",
  cash: "Cash",
  creditCard: "Credit card",
  blik: "Blik",
  payWithCash: "Pay with cash",
  scanQrCode: "Scan to pay",
  amount: "Amount, zł",
  amountHint: "Amount given by customer",
  totalToPay: "Total",
  change: "Change",
  makeSureChangeGiven: "Make sure you give the customer the change",
  paid: "Paid",

  // Kitchen pages
  viewDetails: "View details",
  startCooking: "Start",
  finishCooking: "Ready",
  done: "Done",
  orderCreated: params(`New order: #{orderNumber}`),
  pay: "Pay",
  next: "Next",

  // Client pages
  orderDetails: "Order details",

  // Order statuses
  orderStatus_all: "All",
  orderStatus_created: "Created",
  orderStatus_cooking: "Cooking",
  orderStatus_cooked: "Cooked",
  orderStatus_paid: "Paid",
  orderStatus_delivering: "Delivering",
  orderStatus_delivered: "Delivered",

  // Login page
  adminLoginPageTitle: "Admin login",
  waiterLoginPageTitle: "Waiter login",
  kitchenLoginPageTitle: "Login to kitchen",
  passwordRequired: "Please enter a password",
  phoneRequired: "Please enter a phone number",
  phoneLabel: "Phone",
  passwordLabel: "Password",
  logIn: "Log in",
  showPassword: "Show password",
  hidePassword: "Hide password",

  // Confirmations
  confirmDishCategoryDelete: "Are you sure you want to delete category",
  confirmDishDelete: "Are you sure you want to delete dish",
  confirmModificationDelete: "Are you sure you want to delete modification",
  confirmEmployeeDelete: "Are you sure you want to delete employee",
  confirmCurrentOrderClear: "Are you sure you want to clear the current order",

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
  paymentSuccess: "Paid successfully",
  updateSuccess: "Updated successfully",
  copyToClipboardSuccess: "Copied to clipboard",

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
  [EMPLOYEE_WITH_PHONE_EXISTS]: params(
    'Employee with phone "{phone}" already exists'
  ),
  imageCorrupted: "The image is corrupted. Try to choose a different one",
  [ACCESS_DENIED]: "Access denied",
  copyToClipboardError: "Failed to copy",
  [PAYMENT_LINK_GENERATION_ERROR]:
    "Failed to generate a QR code for payment. Please choose a different payment method",
});

export function useI18nStore() {
  return useNanoStore(messages);
}
