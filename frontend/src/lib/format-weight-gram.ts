import { useI18nStore } from "./i18n";

export function formatWeightGram(value: number): string {
  const t = useI18nStore();
  return `${value} ${t.value.weightGram}`;
}
