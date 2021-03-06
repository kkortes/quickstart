<script>
  import { onMount } from "svelte";
  import { LOGGED_IN_ELSWEHRE } from "@shared/consts/SOCKET_ACTIONS";
  import {
    ACCOUNT_LOGGED_IN_ELSEWHERE,
    ACCOUNT_LOGGED_OUT
  } from "@shared/consts/NOTIFICATIONS";
  import { store, actions } from "../store";
  import socket from "../common/socket";

  const { logout } = actions;

  const forceClear = () => {
    if (process.env.NODE_ENV === 'production') {
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
