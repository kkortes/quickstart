<script>
  import cookie from "js-cookie";
  import { LOGIN_ACCOUNT } from "@shared/consts/SOCKET_ACTIONS";
  import Login from "./components/Login.svelte";
  import Protected from "./components/Protected.svelte";
  import Loader from "./components/Loader.svelte";
  import Notifications from "./components/ui/Notifications.svelte";
  import { store, actions } from "./store";
  import { request } from "./common/socket";
  const { login, notify } = actions;

  $: token = $store.token || tryLogin();
  $: loggedIn = $store.account._id;

  const tryLogin = () => {
    
    const token = cookie.get("token");
    
    if (token) {
      (async () => {
        try {
          const response = await request(LOGIN_ACCOUNT, { token });
          
          $store.token = token;
          login(response);
          loggedIn = true;
        } catch {}
      })();
    }

    return token;
  };
</script>

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
