export interface IAnimateProps {
  duration: number;
  timing: (fraction: number) => number;
  draw: (progress: number) => void;
}

export function animate({ timing, draw, duration }: IAnimateProps) {
  const start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    const progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}
