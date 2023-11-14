import { t } from "./AdminDishCategories.vue";

export const columns: any[] = [
  {
    name: "index",
    label: "#",
    field: "index",
    align: "center",
    classes: "text-body1",
  },
  {
    name: "image",
    label: t.value.image,
    align: "center",
    field: "imageUrl",
  },
  {
    name: "name",
    label: t.value.name,
    align: "center",
    field: "name",
    format: capitalize,
  },
  { name: "actions", label: "", align: "right" },
];
