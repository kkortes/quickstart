<script>
  import Hexagon from '@apeegg/svelte-component-kit/Hexagon.svelte';
  import Tooltip from '@apeegg/svelte-component-kit/Tooltip.svelte';
</script>

<Hexagon>
  Hexagon!
</Hexagon>

<div class="box">
  Hover me!
  <Tooltip direction="up">
    Up
  </Tooltip>
  <Tooltip direction="right">
    Right
  </Tooltip>
  <Tooltip direction="down">
    Down
  </Tooltip>
  <Tooltip direction="left">
    Left
  </Tooltip>
</div>

<style>
  .box {
    position: relative;
    background: lightgray;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
  :global(.tooltip) {
    opacity: 0;
  }
  .box:hover :global(.tooltip) {
    opacity: 1;
  }
</style>