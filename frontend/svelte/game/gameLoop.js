import { onMount } from 'svelte';

let previousTime = undefined;
let loopId = undefined;

export default (callback) => {
  const loop = (time) => {
    if (previousTime !== undefined) {
      const deltaTime = time - previousTime;
      callback(time, deltaTime);
    }

    previousTime = time;
    loopId = requestAnimationFrame(loop);
  };

  loopId = requestAnimationFrame(loop);
  return loopId;
};
