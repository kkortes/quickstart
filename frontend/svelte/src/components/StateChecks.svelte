<script>
  import { onMount } from "svelte";
  import config from "../../config";
  import { store, actions } from "../store";
  import { LOGGED_IN_ELSWEHRE } from "../../universal/SOCKET_ACTIONS";
  import {
    ACCOUNT_LOGGED_IN_ELSEWHERE,
    ACCOUNT_LOGGED_OUT
  } from "../../universal/NOTIFICATIONS";
  import socket from "../common/socket";

  const { logout } = actions;

  const forceClear = () => {
    if (!config.debug) {
      logout(ACCOUNT_LOGGED_OUT);
    }
    return null;
  };

  const logMeOut = () => logout(ACCOUNT_LOGGED_IN_ELSEWHERE);

  onMount(() => {
    window.addEventListener("beforeunload", forceClear);
    socket.on(LOGGED_IN_ELSWEHRE, logMeOut);

    return () => {
      window.removeEventListener("beforeunload", forceClear);
      socket.off(LOGGED_IN_ELSWEHRE, logMeOut);
    };
  });
</script>
