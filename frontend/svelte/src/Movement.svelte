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

      const value = h && v ? 10 : 10;

      const { vertical, horizontal, x, y } = $fromCenter;
      const HM = horizontal / TILE_SIZE;
      const VM = vertical / TILE_SIZE;

      // if (HM <= -0.5 || HM >= 0.5 || VM <= -0.5 || VM >= 0.5) {
      //   const newX = HM <= -0.5 ? x + 1 : HM >= 0.5 ? x - 1 : x;
      //   const newY = VM <= -0.5 ? y + 1 : VM >= 0.5 ? y - 1 : y;

      //   if (position.x !== newX || position.y !== newY) {
      //     const entity = entityOnLocation(newX, newY);

      //     if (!isEmpty(entity)) {
      //       pickUpEntity({
      //         entityRef: entity.ref,
      //         pickId: `${newX}_${newY}_${entity.tier}`
      //       });
      //     }

      //     setPosition({ x: newX, y: newY });
      //   }
      // } else if (position.x !== x || position.y !== y) {
      //   setPosition({ x, y });
      // }

      if (HM <= -1 || HM >= 1 || VM <= -1 || VM >= 1) {
        $fromCenter = {
          horizontal: 0 + (horizontal % TILE_SIZE),
          vertical: 0 + (vertical % TILE_SIZE),
          x: HM <= -1 ? x + 1 : HM >= 1 ? x - 1 : x,
          y: VM <= -1 ? y + 1 : VM >= 1 ? y - 1 : y
        };
        // fromCenter.update(() => ({
        //   horizontal: 0 + (horizontal % TILE_SIZE),
        //   vertical: 0 + (vertical % TILE_SIZE),
        //   x: HM <= -1 ? x + 1 : HM >= 1 ? x - 1 : x,
        //   y: VM <= -1 ? y + 1 : VM >= 1 ? y - 1 : y
        // }));
      } else {
        $fromCenter = {
          vertical: vertical - (up ? -value : down ? value : 0),
          horizontal: horizontal - (left ? -value : right ? value : 0),
          x,
          y
        };

        // fromCenter.update(() => ({
        //   vertical: vertical - (up ? -value : down ? value : 0),
        //   horizontal: horizontal - (left ? -value : right ? value : 0),
        //   x,
        //   y
        // }));
      }
    });
  });

  onDestroy(() => cancelAnimationFrame(gameLoopId));
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />
<slot />
