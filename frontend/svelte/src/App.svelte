<script>
  // import World from "./World.svelte";
  import Game from "./Game.svelte";
  import Movement from "./Movement.svelte";
</script>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>

<Movement>
  <Game />
</Movement>
