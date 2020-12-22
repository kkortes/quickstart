<script>
  import cookies from "js-cookie";
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
    const token = cookies.get("token");

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
  import shared from '@apeegg/svelte-component-kit'
	console.log(shared);
	import config from '@shared/config'
  console.log(config)
  import {PASSWORD_INCORRECT} from '@shared/consts/NOTIFICATIONS'
  console.log(PASSWORD_INCORRECT)
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
