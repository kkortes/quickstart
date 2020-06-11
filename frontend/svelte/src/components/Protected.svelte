<script>
  import Interface from "./Interface.svelte";
  import UsernameInput from "./UsernameInput.svelte";

  import { store } from "../store";
</script>

{#if $store.account.username}
  <Interface />
{:else}
  <UsernameInput />
{/if}
