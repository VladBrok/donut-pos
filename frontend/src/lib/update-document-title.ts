import { useI18nStore } from "src/lib/i18n";

export function updateDocumentTitle(
  titleKey: string,
  t: ReturnType<typeof useI18nStore>
) {
  document.title = titleKey
    ? `${t.value[titleKey as string]} | Donut`
    : "Donut";
}
