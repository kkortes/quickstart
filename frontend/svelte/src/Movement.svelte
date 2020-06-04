<script>
  import gameLoop from "../game/gameLoop.js";
  import { TILE_SIZE } from "../constants/WORLD.js";
  import { onMount, onDestroy, setContext, getContext } from "svelte";
  import { key } from "./fromCenter.js";
  import CONTEXTS from "../constants/CONTEXTS.js";
  import { writable } from "svelte/store";
  import { fromCenter } from "../game/store.js";

  setContext(key, fromCenter);

  let gameLoopId,
    pressedKeys = [];

  const keyIsPressed = key => pressedKeys.find(pk => pk === key.toLowerCase());

  const handleKeydown = ({ key }) => {
    const pressed = key.toLowerCase();

    pressedKeys = !pressedKeys.find(pk => pk === pressed)
      ? [...pressedKeys, pressed]
      : pressedKeys;
  };
  const handleKeyup = ({ key }) => {
    const unpressed = key.toLowerCase();

    pressedKeys = pressedKeys.filter(pk => pk !== unpressed);
  };

  $: up = pressedKeys && keyIsPressed("w");
  $: right = pressedKeys && keyIsPressed("d");
  $: down = pressedKeys && keyIsPressed("s");
  $: left = pressedKeys && keyIsPressed("a");

  onMount(() => {
    gameLoopId = gameLoop((time, deltaTime) => {
      const h = up || down;
      const v = right || left;

      const s = h && v ? 15 : 15;

      const { vertical, horizontal, x, y } = $fromCenter;
      const futureHorizontal = horizontal - (left ? -s : right ? s : 0);
      const futureVertical = vertical - (up ? -s : down ? s : 0);
      const HM = futureHorizontal / TILE_SIZE;
      const VM = futureVertical / TILE_SIZE;

      if (HM <= -1 || HM >= 1 || VM <= -1 || VM >= 1) {
        $fromCenter = {
          horizontal: futureHorizontal % TILE_SIZE,
          vertical: futureVertical % TILE_SIZE,
          x: HM <= -1 ? x + 1 : HM >= 1 ? x - 1 : x,
          y: VM <= -1 ? y + 1 : VM >= 1 ? y - 1 : y
        };
      } else {
        $fromCenter = {
          vertical: futureVertical,
          horizontal: futureHorizontal,
          x,
          y
        };
      }
    });
  });

  onDestroy(() => cancelAnimationFrame(gameLoopId));
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />
<slot />
