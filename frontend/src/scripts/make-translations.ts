import { messagesToJSON } from "@nanostores/i18n";

import("../lib/i18n").then((res) => {
  const translations = res.messages;
  const json = messagesToJSON(translations);
  console.log(json);
});
