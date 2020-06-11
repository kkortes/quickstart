<script>
  import { USERNAME_AVAILABILITY } from "../../universal/SOCKET_ACTIONS.js";
  import Center from "./ui/Center.svelte";
  import Crow from "./ui/Crow.svelte";
  import TextInput from "./form/TextInput.svelte";
  import Button from "./form/Button.svelte";
  import { store, actions } from "../store";
  const { changeUsername } = actions;

  let loading = false;

  const confirmUsername = async username => {
    loading = true;

    const response = await $store.socket.request(USERNAME_AVAILABILITY, {
      username
    });

    loading = false;

    if (response.type === "error") {
      notify(response);
    } else {
      changeUsername(response.username);
    }
  };

  $: username = $store.account.username;

  const style = `${loading ? "pointer-events: none" : ""}`;
</script>

<style>
  .username-input {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="username-input" {style}>
  <Center>
    <form on:submit|preventDefault={confirmUsername(username)}>
      <Crow vertical gutter={14}>
        <TextInput
          text="Username"
          type="text"
          value={username}
          onChange={value => (username = value.replace(/[^A-Za-z]/g, ''))} />
        <div>
          Max 8 letters and no special
          <br />
          characters or spaces are allowed.
        </div>
        <Button
          primary
          onClick={() => confirmUsername(username)}
          disabled={username.length < 3 || username.length > 8 || loading}>
          Confirm
        </Button>
      </Crow>
    </form>
  </Center>
</div>
