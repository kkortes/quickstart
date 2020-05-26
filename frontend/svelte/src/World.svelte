<script>
  import lodash from "lodash";
  import {
    PERSPECTIVE,
    TILE_AMOUNT,
    WORLD_SIZE,
    ROTATEX
  } from "../constants/WORLD.js";
  import makeTile from "../game/makeTile.js";
  import Tiles from "./Tiles.svelte";
  import { getContext } from "svelte";
  import { key } from "./fromCenter.js";
  const { times } = lodash;

  let fromCenter = getContext(key);

  $: tiles = times(TILE_AMOUNT, index =>
    makeTile(index, $fromCenter.x, $fromCenter.y)
  );
</script>

<style>
  .world-frame {
    position: fixed;
    top: -25vh;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .world {
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    top: 50%;
    left: 50%;
  }
</style>

<!-- {JSON.stringify($fromCenter)} -->
<div class="world-frame" style={`perspective: ${PERSPECTIVE};`}>
  <div
    class="world"
    style={`width: ${WORLD_SIZE}px;height: ${WORLD_SIZE}px;transform: rotateX(${ROTATEX}) translate3d(-${WORLD_SIZE / 2 - $fromCenter.horizontal}px, -${WORLD_SIZE / 2 - $fromCenter.vertical}px, 0px);`}>
    <Tiles {tiles} />
  </div>
</div>
