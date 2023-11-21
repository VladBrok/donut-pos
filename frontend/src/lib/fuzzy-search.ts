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
    keys: keys.map((x) => x.toString()),
  });

  return {
    search: (pattern: string) => {
      return fuse.search(pattern).map((x) => x.item);
    },
  };
}
