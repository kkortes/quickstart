<script>
  import { store } from "../store";

  let storePrint;
  $: {
    const { notifications, ...rest } = $store;
    storePrint = rest;
  }
</script>

<style>
  .dev-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    background: black;
    color: #fff;
  }
</style>

<div class="dev-bar">
  <pre>{JSON.stringify(storePrint, null, 2)}</pre>
</div>
