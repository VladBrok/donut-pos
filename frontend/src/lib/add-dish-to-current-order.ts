import { addDishToCurrentOrderAction } from "donut-shared";
import { animate } from "src/lib/animation";
import { ADD_TO_CART_ANIMATION_DURATION_MS } from "src/lib/constants";
import { useStore } from "src/store";

export function addDishToCurrentOrder(
  store: ReturnType<typeof useStore>,
  dishId: string,
  modificationCounts?: Map<string, number>,
  container?: HTMLElement
) {
  if (container) {
    const originalImg = container.querySelector(".product-card-image");
    const cloned = originalImg?.cloneNode(true);
    if (originalImg && cloned) {
      const clonedImg = cloned as HTMLElement;
      clonedImg.style.position = "absolute";
      document.body.appendChild(clonedImg);

      const startLeft =
        originalImg.getBoundingClientRect().left +
        document.documentElement.scrollLeft +
        10;
      const startTop =
        originalImg.getBoundingClientRect().top +
        document.documentElement.scrollTop -
        10;

      const basket = document.querySelector(".shopping-basket") as HTMLElement;
      const diffLeft =
        basket.getBoundingClientRect().left +
        document.documentElement.scrollLeft +
        10 -
        startLeft;
      const diffTop =
        basket.getBoundingClientRect().top +
        document.documentElement.scrollTop -
        10 -
        startTop;
      const startWidth = originalImg.getBoundingClientRect().width;
      const startHeight = originalImg.getBoundingClientRect().height;
      const widthDiff = startWidth / 4 - startWidth;
      const heightDiff = startHeight / 4 - startHeight;

      clonedImg.style.left = `${startLeft}px`;
      clonedImg.style.top = `${startTop}px`;
      clonedImg.style.width = `${originalImg.getBoundingClientRect().width}px`;
      clonedImg.style.height = `${
        originalImg.getBoundingClientRect().height
      }px`;
      clonedImg.style.zIndex = "9999";

      animate({
        duration: ADD_TO_CART_ANIMATION_DURATION_MS,
        timing: (time) => time,
        draw: (progress) => {
          clonedImg.style.left = `${startLeft + diffLeft * progress}px`;
          clonedImg.style.top = `${startTop + diffTop * progress}px`;
          clonedImg.style.width = `${startWidth + widthDiff * progress}px`;
          clonedImg.style.height = `${startHeight + heightDiff * progress}px`;
          clonedImg.style.opacity = Math.max(1 - progress, 0.1)?.toString();

          if (progress >= 1) {
            clonedImg.remove();
          }
        },
      });
    }
  }

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
