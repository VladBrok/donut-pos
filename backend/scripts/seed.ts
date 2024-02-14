import { EMPLOYEE_ROLES, EMPLOYEE_ROLES_ARR } from "donut-shared";
import { logInfo } from "donut-shared/src/lib/log.js";
import { eq } from "drizzle-orm";
import { hash } from "src/lib/crypt.js";
import {
  address,
  client,
  diningTable,
  dish,
  dishCategory,
  dishToModification,
  employee,
  modification,
  permission,
  role,
  roleToPermission,
  salePoint,
} from "../migrations/schema.js";
import * as database from "../src/db/index.js";
import { generateUuid } from "../src/lib/uuid.js";

await database.connect();
const db = database.db;

// Roles & permissions

await db
  .delete(roleToPermission)
  .where(eq(roleToPermission.id, roleToPermission.id));
await db.delete(role).where(eq(role.id, role.id));
await db.delete(permission).where(eq(permission.id, permission.id));

const roleIds: { name: (typeof EMPLOYEE_ROLES_ARR)[number]; id: string }[] = [];

for (const roleName of EMPLOYEE_ROLES_ARR) {
  const roleId = generateUuid();
  const permId = generateUuid();
  await db.insert(role).values({
    id: roleId,
    codeName: roleName,
  });
  await db.insert(permission).values({
    id: permId,
    codeName: roleName,
  });
  await db.insert(roleToPermission).values({
    id: generateUuid(),
    permissionId: permId,
    roleId: roleId,
  });
  roleIds.push({
    id: roleId,
    name: roleName,
  });
}

// Clients

await db.delete(client).where(eq(client.id, client.id));

const mainClientId = generateUuid();

const clients: (typeof client.$inferInsert)[] = [
  {
    id: mainClientId,
    email: "client@donut.com",
    passwordHash: await hash("1234Db_3333>"),
    firstName: "Ivan",
    lastName: "Drago",
    registeredAt: new Date(),
    phone: "+483429093333",
    isAnonymous: false,
    isEmailVerified: false,
    isPhoneVerified: false,
  },
  {
    id: generateUuid(),
    email: "client-2@donut.com",
    passwordHash: await hash("1234Db_3333>"),
    firstName: "Mark",
    lastName: "Peterson",
    registeredAt: new Date(),
    phone: "+483419093333",
    isAnonymous: false,
    isEmailVerified: false,
    isPhoneVerified: false,
  },
  {
    id: generateUuid(),
    email: "client-3@donut.com",
    passwordHash: await hash("1234Db_3333>"),
    firstName: "Ben",
    lastName: "Shapiro",
    registeredAt: new Date(),
    phone: "+483329093333",
    isAnonymous: false,
    isEmailVerified: false,
    isPhoneVerified: false,
  },
];

for (const cl of clients) {
  await db.insert(client).values({
    ...cl,
  });
}

// Addresses

await db.delete(address).where(eq(address.id, address.id));

const locationAddressId = generateUuid();

const addresses: (typeof address.$inferInsert)[] = [
  {
    id: locationAddressId,
    city: "Pińczów",
    street: "Leśna",
    homeNumber: "15",
    postalCode: "28-400",
  },
  {
    id: generateUuid(),
    city: "Krakow",
    street: "Majora",
    homeNumber: "105",
    postalCode: "31-422",
    clientId: mainClientId,
  },
  {
    id: generateUuid(),
    city: "Warszawa",
    street: "Wojskowa",
    homeNumber: "15",
    postalCode: "03-599",
    clientId: mainClientId,
  },
];

for (const addr of addresses) {
  await db.insert(address).values({
    ...addr,
  });
}

// Sale points

await db.delete(salePoint).where(eq(salePoint.id, salePoint.id));

await db.insert(salePoint).values({
  id: generateUuid(),
  addressId: locationAddressId,
  isDefault: true,
  email: "support@donut.com",
  phone: "+48324234324",
  name: "Rose",
  workSchedule: [
    {
      breakEnd: "11:00",
      dayOfWeek: 1,
      breakStart: "10:00",
      closingTime: "12:30",
      openingTime: "09:00",
    },
    {
      breakEnd: "13:01",
      dayOfWeek: 2,
      breakStart: "13:00",
      closingTime: "20:00",
      openingTime: "12:00",
    },
    {
      breakEnd: "11:00",
      dayOfWeek: 3,
      breakStart: "10:00",
      closingTime: "12:00",
      openingTime: "09:00",
    },
    {
      breakEnd: null,
      dayOfWeek: 4,
      breakStart: null,
      closingTime: null,
      openingTime: null,
    },
    {
      breakEnd: null,
      dayOfWeek: 5,
      breakStart: null,
      closingTime: null,
      openingTime: null,
    },
    {
      breakEnd: null,
      dayOfWeek: 6,
      breakStart: null,
      closingTime: "20:00",
      openingTime: "12:00",
    },
    {
      breakEnd: null,
      dayOfWeek: 0,
      breakStart: null,
      closingTime: null,
      openingTime: null,
    },
  ],
});

// Employee

await db.delete(employee).where(eq(employee.id, employee.id));

const waiterUuid = generateUuid();

const employees: (typeof employee.$inferInsert)[] = [
  {
    id: generateUuid(),
    email: "admin@donut.com",
    passwordHash: await hash("1234"),
    firstName: "Big",
    lastName: "Boss",
    isEmailVerified: true,
    isPhoneVerified: true,
    roleId: roleIds.find((x) => x.name === EMPLOYEE_ROLES.ADMIN)?.id,
    phone: "+48000000000",
  },
  {
    id: waiterUuid,
    email: "waiter@donut.com",
    passwordHash: await hash("1234Db_3333>"),
    firstName: "Patrick",
    lastName: "Bateman",
    isEmailVerified: true,
    isPhoneVerified: true,
    roleId: roleIds.find((x) => x.name === EMPLOYEE_ROLES.WAITER)?.id,
    phone: "+48100000001",
  },
  {
    id: generateUuid(),
    email: "kitchen@donut.com",
    passwordHash: await hash("1234Db_3333>"),
    firstName: "Victor",
    lastName: "Barinow",
    isEmailVerified: true,
    isPhoneVerified: true,
    roleId: roleIds.find((x) => x.name === EMPLOYEE_ROLES.COOK)?.id,
    phone: "+48300020009",
  },
  {
    id: generateUuid(),
    email: "courier@donut.com",
    passwordHash: await hash("1234Db_3333>"),
    firstName: "Usain",
    lastName: "Bolt",
    isEmailVerified: true,
    isPhoneVerified: true,
    roleId: roleIds.find((x) => x.name === EMPLOYEE_ROLES.COURIER)?.id,
    phone: "+48210720009",
  },
];

for (const empl of employees) {
  await db.insert(employee).values({
    ...empl,
  });
}

// Modifications

await db.delete(modification).where(eq(modification.id, modification.id));

const drinkModifications: (typeof modification.$inferInsert)[] = [
  {
    id: generateUuid(),
    name: "Sugar",
    price: 300,
    weight: 5,
    imageUrl:
      "https://www.tasteofhome.com/wp-content/uploads/2019/11/sugar-shutterstock_615908132.jpg",
  },
  {
    id: generateUuid(),
    name: "Lemon",
    price: 400,
    weight: 30,
    imageUrl:
      "https://cdn.britannica.com/84/188484-050-F27B0049/lemons-tree.jpg",
  },
];
const pizzaModifications: (typeof modification.$inferInsert)[] = [
  {
    id: generateUuid(),
    name: "Cheese",
    price: 400,
    weight: 50,
    imageUrl:
      "https://blog.wisconsincheeseman.com/wp-content/uploads/sites/10/2022/10/sharp-cheddar-baby-swiss-1-edited-768x697.jpg.webp",
  },
];
const dessertModifications: (typeof modification.$inferInsert)[] = [
  {
    id: generateUuid(),
    name: "Cream",
    price: 400,
    weight: 50,
    imageUrl:
      "https://www.recipetineats.com/wp-content/uploads/2022/11/Chantilly-cream_5.jpg",
  },
];

for (const modif of [
  ...drinkModifications,
  ...pizzaModifications,
  ...dessertModifications,
]) {
  await db.insert(modification).values({
    ...modif,
  });
}

// Categories

await db.delete(dishCategory).where(eq(dishCategory.id, dishCategory.id));

const categories: (typeof dishCategory.$inferInsert)[] = [
  {
    id: generateUuid(),
    name: "Drinks",
    imageUrl:
      "https://www.acouplecooks.com/wp-content/uploads/2021/06/Strawberry-Water-006.jpg",
  },
  {
    id: generateUuid(),
    name: "Fruits",
    imageUrl:
      "https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg?sfvrsn=64942d53_4",
  },
  {
    id: generateUuid(),
    name: "Pizza",
    imageUrl:
      "https://mojo.generalmills.com/api/public/content/CrvdbS7oKUWKrTwVaibDQg_gmi_hi_res_jpeg.jpeg?v=de6f3a89&t=466b54bb264e48b199fc8e83ef1136b4",
  },
  {
    id: generateUuid(),
    name: "Desserts",
    imageUrl:
      "https://www.foodandwine.com/thmb/ckc6L6xKox0WfpfO6dMkuVGPQOY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Angel-Food-Cake-with-Three-Berry-Compote-FT-RECIPE0323-541a780b871441e0ab14383ee38acc44.jpg",
  },
];

for (const ctg of categories) {
  await db.insert(dishCategory).values({
    ...ctg,
  });
}

// Dishes

await db.delete(dish).where(eq(dish.id, dish.id));

const drinks: (typeof dish.$inferInsert)[] = [
  {
    id: generateUuid(),
    categoryId: categories[0].id,
    isActive: true,
    name: "Vodka",
    imageUrl:
      "https://domalkoholi.pl/userdata/public/gfx/3287/absolut-0%2C7l.jpg",
    price: 1500,
    weight: 500,
    description:
      "<i>Vodka</i> is a <b>clear</b> distilled alcoholic beverage originating from Eastern Europe and Scandinavia. It is typically made from fermented grains or potatoes and is known for its neutral flavor profile",
  },
  {
    id: generateUuid(),
    categoryId: categories[0].id,
    isActive: true,
    name: "Black tea",
    imageUrl:
      "https://mehtaperturk.com/wp-content/uploads/2022/04/turkish-tea.jpg.webp",
    price: 800,
    weight: 300,
    description:
      "<i>Black tea</i> is a classic, robust beverage with a <b>rich history</b> and <b>bold flavor</b>. Made from the leaves of the Camellia sinensis plant, black tea undergoes full oxidation, resulting in its characteristic dark color and strong taste. Whether enjoyed plain or with milk and sugar, it offers a satisfying and invigorating experience, perfect for any time of day.",
  },
  {
    id: generateUuid(),
    categoryId: categories[0].id,
    isActive: true,
    name: "Coffee",
    imageUrl:
      "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",
    price: 1200,
    weight: 200,
    description:
      "<i>Coffee</i>, a beloved beverage <b>cherished worldwide</b>, offers a rich and invigorating experience. Sourced from the finest beans, meticulously roasted to perfection, and brewed with care, it presents a symphony of flavors, from earthy to nutty, with a tantalizing aroma that awakens the senses. Whether enjoyed black, with a dash of cream, or adorned with frothy foam, coffee is more than a drink; it's a comforting ritual that fuels conversations, sparks creativity, and infuses moments with warmth and vitality.",
  },
];

const fruits: (typeof dish.$inferInsert)[] = [
  {
    id: generateUuid(),
    categoryId: categories[1].id,
    isActive: true,
    name: "Green apple",
    imageUrl:
      "https://letstalkscience.ca/sites/default/files/2019-08/is-a-green-apple-always-green.jpg",
    price: 500,
    weight: 100,
    description:
      "<b>A crisp and tart delight</b>, the green apple offers a refreshing burst of flavor with its bright acidity and subtle sweetness. Its vibrant green hue hints at its fresh and lively taste, making it a popular choice for both snacking and culinary creations. Whether enjoyed on its own or incorporated into salads, sauces, or desserts, the green apple never fails to invigorate the palate with its zesty and crisp character.",
  },
  {
    id: generateUuid(),
    categoryId: categories[1].id,
    isActive: true,
    name: "Red apple",
    imageUrl:
      "https://www.plantingtree.com/cdn/shop/products/3584_grande.jpg?v=1614270725",
    price: 400,
    weight: 135,
    description:
      "A <b>red apple</b> is a crisp and juicy fruit with a vibrant crimson skin. Its sweet and slightly tangy flavor delights the taste buds, making it a beloved snack or ingredient in various dishes. Packed with essential nutrients like vitamin C and dietary fiber, red apples are not only delicious but also contribute to a healthy diet.",
  },
  {
    id: generateUuid(),
    categoryId: categories[1].id,
    isActive: true,
    name: "Banana",
    imageUrl:
      "https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bunch-of-bananas-67e91d5.jpg?quality=90&resize=440,400",
    price: 700,
    weight: 150,
    description:
      "<b>Bananas</b> are elongated, yellow fruits with a creamy texture and a mildly sweet taste. They are packed with potassium, vitamin B6, and fiber, making them a convenient and nutritious snack.",
  },
  {
    id: generateUuid(),
    categoryId: categories[1].id,
    isActive: true,
    name: "Grapes",
    imageUrl:
      "https://images.everydayhealth.com/images/diet-nutrition/all-about-grapes-722x406.jpg",
    price: 750,
    weight: 121,
    description:
      "<b>Grapes</b> are small, juicy fruits that come in various colors such as green, red, and purple. They can be eaten fresh or dried into raisins, and are rich in antioxidants, vitamins, and minerals",
  },
  {
    id: generateUuid(),
    categoryId: categories[1].id,
    isActive: true,
    name: "Strawberry",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0jhk3RrJf41vXSesb6BifvV5OEsp-hQSxaQ&usqp=CAU",
    price: 350,
    weight: 100,
    description:
      "Strawberries are <b>heart-shaped berries</b> with a vibrant red color and a sweet, juicy taste. They are high in vitamin C and antioxidants, making them a delicious and nutritious addition to desserts, salads, or eaten on their own.",
  },
];

const pizzas: (typeof dish.$inferInsert)[] = [
  {
    id: generateUuid(),
    categoryId: categories[2].id,
    isActive: true,
    name: "Margherita",
    imageUrl:
      "https://cdn.galleries.smcloud.net/t/galleries/gf-th4D-DoeK-NWgH_pizza-margherita-skad-pochodzi-nazwa-jpg-1920x1080-nocrop.jpg",
    price: 1200,
    weight: 350,
    description:
      "A classic <i>Italian</i> pizza topped with tomato sauce, fresh mozzarella cheese, basil leaves, and a drizzle of olive oil",
  },
  {
    id: generateUuid(),
    categoryId: categories[2].id,
    isActive: true,
    name: "Pepperoni",
    imageUrl:
      "https://www.mojegotowanie.pl/media/cache/big/uploads/media/recipe/0002/11/pizza-pepperoni.jpeg",
    price: 1400,
    weight: 400,
    description:
      "A traditional favorite <b>featuring</b> tomato sauce, mozzarella cheese, and slices of spicy pepperoni",
  },
  {
    id: generateUuid(),
    categoryId: categories[2].id,
    isActive: true,
    name: "Hawaiian Pizza",
    imageUrl:
      "https://www.allrecipes.com/thmb/v1Xi2wtebK1sZwSJitdV4MGKl1c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hawaiian-pizza-ddmfs-3x2-132-450eff04ad924d9a9eae98ca44e3f988.jpg",
    price: 1500,
    weight: 380,
    description:
      "A <b>controversial</b> yet <b>beloved</b> pizza topped with tomato sauce, mozzarella cheese, ham, and pineapple chunks",
  },
  {
    id: generateUuid(),
    categoryId: categories[2].id,
    isActive: true,
    name: "Vegetarian Pizza",
    imageUrl:
      "https://cdn.loveandlemons.com/wp-content/uploads/2023/02/vegetarian-pizza.jpg",
    price: 1350,
    weight: 370,
    description:
      "A <i>veggie</i> delight with tomato sauce, mozzarella cheese, mushrooms, bell peppers, onions, and black olives",
  },
];

const desserts: (typeof dish.$inferInsert)[] = [
  {
    id: generateUuid(),
    categoryId: categories[3].id,
    isActive: true,
    name: "Chocolate Lava Cake",
    imageUrl:
      "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/39E92D31-D1AE-44DC-8B86-C60A8E6B8D05/Derivates/744B2C83-F33A-4AB5-A7DD-0D59D555D0F6.jpg",
    price: 500,
    weight: 150,
    description:
      "A decadent chocolate dessert with a <b>molten chocolate center</b>. It's rich, indulgent, and perfect for chocolate lovers",
  },
  {
    id: generateUuid(),
    categoryId: categories[3].id,
    isActive: true,
    name: "New York Cheesecake",
    imageUrl:
      "https://img.taste.com.au/O8JC4F3Q/taste/2016/11/new-york-cheesecake-40742-1.jpeg",
    price: 600,
    weight: 200,
    description:
      "A creamy and dense cheesecake with a graham cracker crust. It's smooth, tangy, and incredibly satisfying",
  },
];

for (const dsh of [...drinks, ...fruits, ...pizzas, ...desserts]) {
  await db.insert(dish).values({
    ...dsh,
  });
}

for (const drink of drinks) {
  for (const modif of drinkModifications) {
    await db.insert(dishToModification).values({
      id: generateUuid(),
      dishId: drink.id,
      modificationId: modif.id,
    });
  }
}
for (const pizza of pizzas) {
  for (const modif of pizzaModifications) {
    await db.insert(dishToModification).values({
      id: generateUuid(),
      dishId: pizza.id,
      modificationId: modif.id,
    });
  }
}
for (const dessert of desserts) {
  for (const modif of dessertModifications) {
    await db.insert(dishToModification).values({
      id: generateUuid(),
      dishId: dessert.id,
      modificationId: modif.id,
    });
  }
}

// Dining tables

const tables: (typeof diningTable.$inferInsert)[] = [
  {
    id: generateUuid(),
    employeeId: waiterUuid,
    number: "22",
  },
  {
    id: generateUuid(),
    employeeId: waiterUuid,
    number: "17",
  },
];
for (const tbl of tables) {
  await db.insert(diningTable).values({
    ...tbl,
  });
}

logInfo("seeding complete.");
