import {
  browser,
  count,
  createI18n,
  localeFrom,
  params,
} from "@nanostores/i18n";
import { persistentAtom } from "@nanostores/persistent";
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
import {
  ADDRESSES_KEY,
  AUTH_BEFORE_ORDER_CREATE,
  CLIENTS_KEY,
  CREATE_DINING_TABLE_KEY,
  CREATE_DISH_CATEGORY_KEY,
  CREATE_DISH_KEY,
  CREATE_EMPLOYEE_KEY,
  CREATE_MODIFICATION_KEY,
  CREATE_SALE_POINT_KEY,
  DASHBOARD_KEY,
  DEMO_KEY,
  DINING_TABLES_KEY,
  DISHES_KEY,
  DISH_CATEGORIES_KEY,
  EMPLOYEES_KEY,
  LOGIN_KEY,
  MENU_KEY,
  MODIFICATIONS_KEY,
  ORDERS_KEY,
  ORDER_DETAILS_KEY,
  PAYMENT_SUCCESS_PAGE_KEY,
  SALE_POINTS_KEY,
  SIGNUP_KEY,
  UDPATE_SALE_POINT_KEY,
  UPDATE_DINING_TABLE_KEY,
  UPDATE_DISH_CATEGORY_KEY,
  UPDATE_DISH_KEY,
  UPDATE_EMPLOYEE_KEY,
  UPDATE_MODIFICATION_KEY,
} from "src/lib/constants";
import { updateDocumentTitle } from "src/lib/update-document-title";
import router from "src/router";

export const setting = persistentAtom<string | undefined>("locale");
export const AVAILABLE_LOCALES = ["en", "pl"];
export const locale = localeFrom(
  setting,
  browser({
    available: AVAILABLE_LOCALES,
    fallback: "en",
  })
);

export const i18n = createI18n(locale, {
  async get(code) {
    return await import(`./translations/${code}.json`);
  },
});

export const messagesObj = {
  // Config
  weightGram: "g",

  // Admin dashboard
  [DASHBOARD_KEY]: "Dashboard",
  logout: "Logout",
  deleteDish: "Delete dish",
  toggleMenu: "Toggle menu",
  increment: "Increment",
  decrement: "Decrement",
  [DISH_CATEGORIES_KEY]: "Categories",
  [CREATE_DISH_CATEGORY_KEY]: "Create dish category",
  [UPDATE_DISH_CATEGORY_KEY]: "Update dish category",
  [CREATE_DINING_TABLE_KEY]: "Create dining table",
  [UPDATE_DINING_TABLE_KEY]: "Update dining table",
  [DISHES_KEY]: "Dishes",
  [CREATE_DISH_KEY]: "Create dish",
  [UPDATE_DISH_KEY]: "Update dish",
  image: "Image",
  name: "Name",
  category: "Category",
  waiter: "Waiter",
  phone: "Phone",
  isPhoneVerified: "Phone verified",
  isAnonymous: "Anonymous",
  isDefault: "Default",
  email: "Email",
  address: "Address",
  deliveryAddress: "Delivery address",
  addressExplanation1: "Enter the address. The address will appear on the map.",
  addressExplanation2: "If the address is shown correctly, click 'Save'",
  isEmailVerified: "Email verified",
  role: "Role",
  firstName: "First name",
  clientFirstName: "Client first name",
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
  addSalePoint: "Add sale point",
  fieldRequired: "The field is required",
  openingTimeBeforeClosing: "Opening time must precede closing",
  breakStartBeforeEnd: "Break start must precede break end",
  openingTimeBeforeBreakStart: "Opening time must precede break start",
  breakEndBeforeClosing: "Break end must precede closing time",
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
  salePointNameLabel: "Name",
  deleteButton: "Delete",
  confirm: "Confirm",
  addAddress: "Add address",
  editAddress: "Edit address",
  noResults: "No results",
  dishDescriptionPlaceholder: "The best dish",
  search: "Search",
  [MODIFICATIONS_KEY]: "Modifications",
  [EMPLOYEES_KEY]: "Employees",
  [DINING_TABLES_KEY]: "Dining tables",
  [CLIENTS_KEY]: "Clients",
  [SALE_POINTS_KEY]: "Sale points",
  [CREATE_MODIFICATION_KEY]: "Create modification",
  [UPDATE_MODIFICATION_KEY]: "Update modification",
  [CREATE_SALE_POINT_KEY]: "Create sale point",
  [UDPATE_SALE_POINT_KEY]: "Update sale point",
  [CREATE_EMPLOYEE_KEY]: "Create employee",
  [UPDATE_EMPLOYEE_KEY]: "Update employee",
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
  printTicket: "Print ticket",
  printReceipt: "Print receipt",
  print: "Print",
  orderCount: "Order count",
  clientCount: "Client count",
  orderTypes: "Order types",
  orderType: "Order type",

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
  [ORDERS_KEY]: "Orders",
  [ADDRESSES_KEY]: "Addresses",
  [MENU_KEY]: "Menu",
  orderNumber: "Order number",
  tableNumber: "Table",
  table: "Number",
  orderStatus: "Status",
  dishCount: "Dishes",
  total: "Total, zł",
  totalCost: "Total",
  noLunchBreak: "No lunch break",
  addLunchBreak: "Add lunch break",
  addWorkTime: "Add work time",
  removeLunchBreak: "Remove lunch break",
  removeWorkTime: "Remove work time",
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
  addNewAddress: "Add new address",
  amount: "Amount, zł",
  amountHint: "Amount given by customer",
  totalToPay: "Total",
  change: "Change",
  workSchedule: "Work schedule",
  weekend: "Weekend",
  makeSureChangeGiven: "Make sure you give the customer the change",
  paid: "Paid",
  cashPaymentRequest: "Cash payment request",
  clientOrderReady: "Your order is ready!",
  employeeOrderReady: "Takeout order is ready",
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
  takeoutOrderDeliverInstruction:
    'After you give order to a client, click "Delivered',
  next: "Next",

  // Client pages
  waitForRedirect: "Redirecting...",
  readonlyMap: "The map is view-only",
  changeDeliveryAddress: "Change delivery address",
  addNewDeliveryAddress: "Add new delivery address",
  showOnMap: "Show on map",
  [ORDER_DETAILS_KEY]: "Order details",
  viewYourOrders: "view your orders",
  welcome: params("Welcome, {firstName}!"),
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
  [PAYMENT_SUCCESS_PAGE_KEY]: "Payment success",
  paymentErrorPageTitle: "Payment error",
  paymentForOrder: "Payment for",
  isSuccessfull: "is successfull",
  goToMenu: "go to menu",
  acceptPayment: "Accept payment",
  callUs: "Call us",
  writeUsEmail: "Write us an email",
  donutPosFooterTitle: "Donut, the POS system",
  donutPosFooterDescription:
    "Stay ahead of the competition with real-time order management, remote accessibility, and advanced analytics. Transform the dining experience with our solution – where convenience meets excellence.",

  // Courier pages
  client: "Client",
  callClient: "Call the client",
  startDelivering: "Deliver",
  finishDelivering: "Delivered",
  newOrderForCourier: params(`New order: {orderNumber}`),

  // Order statuses
  orderStatus_active: "All active",
  orderStatus_completed: "Completed",
  orderStatus_created: "Created",
  orderStatus_cooking: "Cooking",
  orderStatus_cooked: "Cooked",
  orderStatus_paid: "Paid",
  orderStatus_delivering: "Delivering",
  orderStatus_delivered: "Delivered",

  // Sunday - Saturday : 0 - 6
  dayOfWeekShort0: "Sun",
  dayOfWeekShort1: "Mon",
  dayOfWeekShort2: "Tue",
  dayOfWeekShort3: "Wed",
  dayOfWeekShort4: "Thu",
  dayOfWeekShort5: "Fri",
  dayOfWeekShort6: "Sat",

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
  [LOGIN_KEY]: "Log in",
  [SIGNUP_KEY]: "Sign up",
  showPassword: "Show password",
  hidePassword: "Hide password",
  alreadyHaveAccount: "Already have an account?",
  dontHaveAccount: "Don't have an account?",

  // Demo
  [DEMO_KEY]: "Demo",
  demoTitle: "Donut POS demo",
  adminPanel: "Admin panel",
  waiterApp: "Waiter app",
  clientApp: "Client app",
  courierApp: "Courier app",
  kitchenDisplay: "Kitchen display",

  // Misc
  scanToOrder: "Scan to order",
  cafe: "Restaurant",
  cafeName: "",

  // Confirmations
  confirmDishCategoryDelete: "Are you sure you want to delete category",
  confirmDishDelete: "Are you sure you want to delete dish",
  confirmAddressDelete: "Are you sure you want to delete address",
  confirmModificationDelete: "Are you sure you want to delete modification",
  confirmSalePointDelete: "Are you sure you want to delete sale point",
  confirmEmployeeDelete: "Are you sure you want to delete employee",
  confirmCurrentOrderClear: "Are you sure you want to clear the current order",
  confirmOrderWithTakenTableCreate1: params("Table {tableNumber} is taken by"),
  confirmOrderWithTakenTableCreate2: "Create the new order anyway?",
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
} as const;

export const messages = i18n("messages", messagesObj);

export function useI18nStore() {
  return useNanoStore(messages);
}

locale.subscribe(() => {
  const t = useI18nStore();
  updateDocumentTitle(router.currentRoute.value.meta.title as string, t);
});
