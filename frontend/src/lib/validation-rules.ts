import { getDishCategoryNameRules } from "donut-shared";
import { useI18nStore } from "./i18n";

export function dishCategoryNameRules(
  t: ReturnType<typeof useI18nStore>["value"]
) {
  return getDishCategoryNameRules(t.fieldRequired, (max) =>
    t.maxLength({ max })
  );
}
