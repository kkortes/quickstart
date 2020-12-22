<script>
  import { USERNAME_AVAILABILITY } from "@shared/consts/SOCKET_ACTIONS.js";
  import Center from "./ui/Center.svelte";
  import Crow from "./ui/Crow.svelte";
  import TextInput from "./form/TextInput.svelte";
  import Button from "./form/Button.svelte";
  import { store, actions } from "../store";
  import { request } from "../common/socket";
  const { changeUsername, notify } = actions;

  let username = "";
  let loading = false;

  const confirmUsername = async username => {
    loading = true;

    try {
      const response = await request(USERNAME_AVAILABILITY, {
        username
      });
      changeUsername(response.username);
    } catch (error) {
      notify(error);
    }

    loading = false;
  };

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
