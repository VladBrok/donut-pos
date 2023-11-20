import { createAction } from "./index.js";

export const loadDishCategoriesAction = createAction<{
  categories: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
}>("dishCategories/load");

export const createDishCategoryAction = createAction<{
  name: string;
  imageBase64: string;
}>("dishCategories/create");

export const dishCategoryCreatedAction = createAction<{
  id: string;
  name: string;
  imageUrl: string;
}>("dishCategories/created");

export const updateDishCategoryAction = createAction<{
  id: string;
  name: string;
  imageBase64: string;
}>("dishCategories/update");

export const dishCategoryUpdatedAction = createAction<
  Partial<{
    id: string;
    name: string;
    imageUrl: string;
  }>
>("dishCategories/updated");

export const deleteDishCategoryAction = createAction<{
  id: string;
}>("dishCategories/delete");

export const dishCategoryDeletedAction = createAction<{
  id: string;
}>("dishCategories/deleted");
