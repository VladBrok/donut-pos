import Fuse from "fuse.js";

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export function createFuzzySearcher<T extends object>(
  list: T[],
  keys: NestedKeyOf<T>[]
) {
  const fuse = new Fuse(list, {
    keys: keys,
    threshold: 0.5,
  });

  return {
    search: (pattern: string) => {
      return pattern ? fuse.search(pattern).map((x) => x.item) : list;
    },
  };
}
