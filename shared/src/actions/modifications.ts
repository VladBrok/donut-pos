import { createAction } from "./index.js";

export const loadModificationsAction = createAction<{
  modifications: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    weight: number;
  }[];
}>("modifications/load");

export const deleteModificationAction = createAction<{
  id: string;
}>("modifications/delete");

export const createModificationAction = createAction<{
  name: string;
  price: number;
  weight: number;
  imageBase64: string;
}>("modifications/create");

export const modificationCreatedAction = createAction<
  ReturnType<typeof loadModificationsAction>["payload"]["modifications"][number]
>("modifications/created");

export const updateModificationAction = createAction<{
  id: string;
  name: string;
  price: number;
  weight: number;
  imageBase64: string;
}>("modifications/update");

export const modificationUpdatedAction = createAction<
  Partial<{
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    weight: number;
  }>
>("modifications/updated");

export const modificationDeletedAction = createAction<{
  id: string;
}>("modifications/deleted");
