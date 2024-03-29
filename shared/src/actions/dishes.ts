import { createAction } from "./index.js";
import { loadModificationsAction } from "./modifications.js";

export const loadDishesAction = createAction<{
  dishes: {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    weight: number;
    isActive: boolean;
    category: {
      id: string;
      name: string;
    } | null;
    modifications: ReturnType<
      typeof loadModificationsAction
    >["payload"]["modifications"];
  }[];
}>("dishes/load");

export const deleteDishAction = createAction<{
  id: string;
}>("dishes/delete");

export const createDishAction = createAction<{
  name: string;
  description: string;
  price: number;
  weight: number;
  isActive: boolean;
  category: {
    id: string;
    name: string;
  };
  modifications: {
    id: string;
  }[];
  imageBase64: string;
}>("dishes/create");

export const dishCreatedAction =
  createAction<
    ReturnType<typeof loadDishesAction>["payload"]["dishes"][number]
  >("dishes/created");

export const updateDishAction = createAction<{
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  isActive: boolean;
  category: {
    id: string;
    name: string;
  };
  modifications: {
    id: string;
  }[];
  imageBase64: string;
}>("dishes/update");

export const dishUpdatedAction =
  createAction<
    Partial<ReturnType<typeof loadDishesAction>["payload"]["dishes"][number]>
  >("dishes/updated");

export const dishDeletedAction = createAction<{
  id: string;
}>("dishes/deleted");
