export function onFormValidationError(ref: any) {
  return ref.$el.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
}
