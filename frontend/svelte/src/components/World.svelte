<script>
  import {
    PERSPECTIVE,
    TILE_AMOUNT,
    WORLD_SIZE,
    ROTATEX
  } from "../constants/WORLD.js";
  // import Tiles from "./Tiles.svelte";
  import Canvas from "./Canvas.svelte";
  import Grid from "./Grid.svelte";
  import Movement from "./Movement.svelte";
  import { store } from "../store";

  $: offsetLeft = -(WORLD_SIZE / 2 - $store.fromCenter.horizontal);
  $: offsetRight = -(WORLD_SIZE / 2 - $store.fromCenter.vertical);
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
  .player {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    border: 3px solid pink;
    border-radius: 50%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 20px;
    background: black;
    text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.9);
  }
</style>

<div class="world-frame" style={`perspective: ${PERSPECTIVE};`}>
  <Canvas>
    <Grid />
    <Movement />
  </Canvas>
  <!-- <div
    class="world"
    style={`width: ${WORLD_SIZE}px;height: ${WORLD_SIZE}px;transform: rotateX(${ROTATEX}) translate3d(${offsetLeft}px, ${offsetRight}px, 0px);`}>
    <Tiles {tiles} />
  </div> -->
</div>

<div class="player">
  X:{$store.fromCenter.x} Y:{$store.fromCenter.y}
  <br />
  <br />
  Horizontal: {$store.fromCenter.horizontal}
  <br />
  Vertical: {$store.fromCenter.vertical}
</div>
