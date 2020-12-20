<script>
  import { ACCOUNT_LOGGED_OUT } from "../../universal/NOTIFICATIONS.js";
  import { store, actions } from "../store";
  const { logout } = actions;

  $: username = $store.account.username;
  $: x = $store.account.position.x;
  $: y = $store.account.position.y;
  $: horizontal = $store.fromCenter.horizontal;
  $: vertical = $store.fromCenter.vertical;
</script>

<style>
  .top-bar {
    position: relative;
    color: #fff;
    display: flex;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.75);
    padding: 10px;
  }
</style>

<div class="top-bar">
  <div>
    {username} X:{x} Y:{y} Vertical: {vertical} Horizontal: {horizontal}
  </div>
  <div on:click|preventDefault={() => logout(ACCOUNT_LOGGED_OUT)}>Logout</div>
</div>
