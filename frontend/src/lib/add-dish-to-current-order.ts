import { addDishToCurrentOrderAction } from "donut-shared";
import { useStore } from "src/store";

export function addDishToCurrentOrder(
  store: ReturnType<typeof useStore>,
  dishId: string,
  modificationCounts?: Map<string, number>
) {
  store.commit.crossTab(
    addDishToCurrentOrderAction({
      dish: {
        id: dishId,
        modifications: [...(modificationCounts?.entries() || [])]
          .filter(([, count]) => count > 0)
          .map(([id, count]) => ({
            id: id,
            count: count,
          })),
      },
    })
  );
}
