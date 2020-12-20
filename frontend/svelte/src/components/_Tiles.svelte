<script>
  import { TILE_SIZE, WORLD_SIZE } from "../constants/WORLD.js";
  import { store } from "../../store";

  export let tiles;

  $: iteratableTiles = Object.entries(tiles);
</script>

<style>
  .background {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-size: 900% auto;
    pointer-events: none;
  }
  .tile {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    color: #fff;
    position: fixed;
  }
  .inner {
    position: relative;
    text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.9);
    font-weight: 600;
    font-size: 30px;
  }
  .tile:hover .inner {
    opacity: 1;
  }
</style>

{#each iteratableTiles as [key, { x, y, style, id, zIndex }] (id)}
  <div
    class="tile"
    style={`width: ${TILE_SIZE}px;height: ${TILE_SIZE}px; z-index: ${zIndex}; top: ${(y - $store.fromCenter.y) * TILE_SIZE + WORLD_SIZE / 2 - TILE_SIZE / 2 + TILE_SIZE}px; left: ${(x - $store.fromCenter.x) * TILE_SIZE + WORLD_SIZE / 2 - TILE_SIZE / 2}px;`}>
    <div class="background" {style} />
    <div class="inner">{x}, {y}</div>
  </div>
{/each}
