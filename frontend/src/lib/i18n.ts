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
  DINING_TABLE_EXISTS,
  EMPLOYEE_WITH_EMAIL_EXISTS,
  EMPLOYEE_WITH_PHONE_EXISTS,
  IMAGE_UPLOAD_FAIL,
  MODIFICATION_NAME_EXISTS,
  ORDER_TYPES,
  PASSWORD_MIN_LENGTH,
  PASSWORD_SPECIAL_CHARS,
  PAYMENT_LINK_GENERATION_ERROR,
  USER_NOT_FOUND,
  USER_WITH_EMAIL_EXISTS,
  USER_WITH_PHONE_EXISTS,
  WRONG_PASSWORD,
} from "donut-shared";
import { AUTH_BEFORE_ORDER_CREATE } from "src/lib/constants";

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
  createDiningTable: "Create dining table",
  updateDiningTable: "Update dining table",
  dishes: "Dishes",
  createDish: "Create dish",
  updateDish: "Update dish",
  image: "Image",
  name: "Name",
  category: "Category",
  waiter: "Waiter",
  phone: "Phone",
  isPhoneVerified: "Phone verified",
  email: "Email",
  address: "Address",
  deliveryAddress: "Delivery address",
  addressExplanation1: "Enter the delivery address.",
  addressExplanation2: "The address will appear on the map.",
  addressExplanation3: "If the address is shown correctly, click 'Save'",
  isEmailVerified: "Email verified",
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
  addTable: "Add table",
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
  addAddress: "Add address",
  noResults: "No results",
  dishDescriptionPlaceholder: "The best dish",
  search: "Search",
  modifications: "Modifications",
  employees: "Employees",
  diningTables: "Dining tables",
  clients: "Clients",
  createModification: "Create modification",
  updateModification: "Update modification",
  createEmployee: "Create employee",
  updateEmployee: "Update employee",
  invalidPhoneLengths: "Phone should have exactly 9 digits",
  invalidPostalCode: "Invalid postal code. Example: 04-919",
  passwordShouldContainDigit: "Password should contain at least 1 digit",
  passwordShouldContainUppercase:
    "Password should contain at least 1 uppercase latin letter",
  passwordShouldContainLowercase:
    "Password should contain at least 1 lowercase latin letter",
  passwordShouldContainSpecial: `Password should contain at least 1 of the following characters: ${PASSWORD_SPECIAL_CHARS}`,
  passwordHint: `Hint: at least ${PASSWORD_MIN_LENGTH} characters. At least 1 digit, 1 uppercase, 1 lowercase and 1 special`,
  noDataFound: "No data found",
  noNotifications: "No notifications",
  goBack: "Go back",

  // Waiter pages
  main: "Main",
  searchDishes: "Search by name, price, category or weight",
  searchOrders: "Search by order number, table or comment",
  allMenu: "All menu",
  addToCurrentOrder: "Add to order",
  openDetails: "Open details",
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
  addresses: "Addresses",
  menu: "Menu",
  orderNumber: "Order number",
  tableNumber: "Table",
  table: "Number",
  orderStatus: "Status",
  dishCount: "Dishes",
  total: "Total, zł",
  totalCost: "Total",
  delivery: "Delivery",
  copyOrderNumber: "Copy order number to clipboard",
  outOfStock: "Out of stock",
  cannotCreateOrderWithOutOfStock:
    "Some dishes are out of stock. Please remove them from the order before proceeding",
  dishCooked: params(`{dishName} for table {table} is ready`),
  delivered: "Delivered",
  selectPaymentMethod: "Select payment method",
  cash: "Cash",
  creditCard: "Card",
  blik: "Blik",
  payWithCash: "Pay with cash",
  scanQrCode: "Scan to pay",
  amount: "Amount, zł",
  amountHint: "Amount given by customer",
  totalToPay: "Total",
  change: "Change",
  makeSureChangeGiven: "Make sure you give the customer the change",
  paid: "Paid",
  cashPaymentRequest: "Cash payment request",
  orderReady: "Your order is ready!",
  pickOrderUp: "Pick it up at our restaurant at",
  cashPaymentRequested: params(
    "Cash payment requested: table {table}, order {orderNumber}"
  ),
  orderTypeLabel: "Type",

  // Kitchen pages
  viewDetails: "View details",
  startCooking: "Start",
  finishCooking: "Ready",
  done: "Done",
  orderCreated: params(`New order: {orderNumber}`),
  pay: "Pay",
  confirmOrderReceived: "Confirm received",
  orderReceiveInstruction:
    'Before receiving the order, click "Confirm received"',
  next: "Next",

  // Client pages
  clickToPay: "Click on the button to pay",
  readonlyMap: "The map is view-only",
  changeDeliveryAddress: "Change delivery address",
  addNewDeliveryAddress: "Add new delivery address",
  showOnMap: "Show on map",
  orderDetails: "Order details",
  viewYourOrders: "view your orders",
  welcome: "Welcome!",
  chooseDishesInstruction:
    "Choose dishes that you want to order from the menu.",
  viewOrdersInstruction: "You can view your orders on the",
  close: "Close",
  ordersPage: "orders page",
  orderWasCreated: "Your order was created",
  viewOrder: "View order",
  waiterWasCalled: "We called a waiter!",
  payInCashUponReceipt:
    "You will be able to pay in cash upon receipt of the order",
  waiterWillAcceptPayment:
    "Waiter will come to your table and accept the payment",
  ok: "OK",
  orderIsReady: params(`Order {orderNumber} is ready!`),
  addDeliveryAddress: "Add Delivery Address",
  specifyDeliveryAddress: "Please add the delivery address",
  city: "City",
  street: "Street",
  homeNumber: "Home number",
  postalCode: "Postal code",

  // Payment pages
  paymentSuccessPageTitle: "Payment success",
  paymentErrorPageTitle: "Payment error",
  paymentForOrder: "Payment for",
  isSuccessfull: "is successfull",
  goToMenu: "go to menu",
  acceptPayment: "Accept payment",

  // Order statuses
  orderStatus_active: "All active",
  orderStatus_completed: "Completed",
  orderStatus_created: "Created",
  orderStatus_cooking: "Cooking",
  orderStatus_cooked: "Cooked",
  orderStatus_paid: "Paid",
  orderStatus_delivering: "Delivering",
  orderStatus_delivered: "Delivered",

  // Order types
  [`orderType_${ORDER_TYPES.DINE_IN}`]: "Dine in",
  [`orderType_${ORDER_TYPES.DELIVERY}`]: "Delivery",
  [`orderType_${ORDER_TYPES.TAKEOUT}`]: "Takeout",

  // Login & signup pages
  adminLoginPageTitle: "Admin login",
  waiterLoginPageTitle: "Waiter login",
  clientLoginPageTitle: "Log in",
  kitchenLoginPageTitle: "Login to kitchen",
  courierLoginPageTitle: "Courier login",
  passwordRequired: "Please enter a password",
  phoneRequired: "Please enter a phone number",
  emailRequired: "Please enter your email",
  phoneLabel: "Phone",
  emailLabel: "Email",
  passwordLabel: "Password",
  logIn: "Log in",
  signUp: "Sign up",
  showPassword: "Show password",
  hidePassword: "Hide password",
  alreadyHaveAccount: "Already have an account?",
  dontHaveAccount: "Don't have an account?",

  // Misc
  scanToOrder: "Scan to order",
  cafe: "Cafe",
  cafeName: "Pinczow",

  // Confirmations
  confirmDishCategoryDelete: "Are you sure you want to delete category",
  confirmDishDelete: "Are you sure you want to delete dish",
  confirmAddressDelete: "Are you sure you want to delete address",
  confirmModificationDelete: "Are you sure you want to delete modification",
  confirmEmployeeDelete: "Are you sure you want to delete employee",
  confirmCurrentOrderClear: "Are you sure you want to clear the current order",
  confirmTableDelete: "Are you sure you want to delete table with number",
  confirmLogout: "Are you sure you want to logout",

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
  orderCreateSuccess: "Order created successfully",
  paymentSuccess: "Paid successfully",
  updateSuccess: "Updated successfully",
  copyToClipboardSuccess: "Copied to clipboard",

  // Errors
  [USER_NOT_FOUND]: params("User with email {email} was not found"),
  [WRONG_PASSWORD]: "Wrong password",
  [IMAGE_UPLOAD_FAIL]: "Failed to upload the image",
  [CATEGORY_NAME_EXISTS]: params(
    'Category with name "{name}" already exists. Please choose another name'
  ),
  [DINING_TABLE_EXISTS]: params(
    'Table with number "{tableNumber}" already exists. Please specify another number'
  ),
  [MODIFICATION_NAME_EXISTS]: params(
    'Modification with name "{name}" already exists. Please choose another name'
  ),
  [EMPLOYEE_WITH_PHONE_EXISTS]: params(
    'Employee with phone "{phone}" already exists'
  ),
  [EMPLOYEE_WITH_EMAIL_EXISTS]: params(
    'Employee with email "{email}" already exists'
  ),
  imageCorrupted: "The image is corrupted. Try to choose a different one",
  [ACCESS_DENIED]: "Access denied",
  copyToClipboardError: "Failed to copy",
  [PAYMENT_LINK_GENERATION_ERROR]:
    "Failed to generate a QR code for payment. Please choose a different payment method",
  [USER_WITH_EMAIL_EXISTS]:
    "User with the same email already exists. Please choose another email",
  [USER_WITH_PHONE_EXISTS]:
    "User with the same phone already exists. Please choose another phone",
  [AUTH_BEFORE_ORDER_CREATE]: "Plase Sign Up or Login to create an order",
});

export function useI18nStore() {
  return useNanoStore(messages);
}
