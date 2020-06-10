<script>
  import Login from "./components/Login.svelte";
  import Protected from "./components/Protected.svelte";
  import Loader from "./components/Loader.svelte";
  import Notifications from "./components/ui/Notifications.svelte";

  let loggedIn = false;
  let token = false;
</script>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>

{#if !token}
  <Login />
{/if}

{#if token && !loggedIn}
  <Loader text="fetching state" />
{/if}

{#if token && loggedIn}
  <Protected />
{/if}

<Notifications />
