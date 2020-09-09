<script>
  import sha1 from "sha1";
  import cookie from "js-cookie";
  import Center from "./ui/Center.svelte";
  import Crow from "./ui/Crow.svelte";
  import TextInput from "./form/TextInput.svelte";
  import PasswordInput from "./form/PasswordInput.svelte";
  import Button from "./form/Button.svelte";
  import CheckBox from "./form/CheckBox.svelte";
  import { validateEmail } from "../../universal/helpers.js";
  import {
    LOGIN_ACCOUNT,
    CREATE_ACCOUNT
  } from "../../universal/SOCKET_ACTIONS";
  import {
    PASSWORD_MISSING,
    ACCOUNT_LOGGED_IN,
    EMAIL_INVALID,
    ACCOUNT_CREATED
  } from "../../universal/NOTIFICATIONS";
  import { store, actions } from "../store";
  import { request } from "../common/socket";

  const { notify, login } = actions;

  let email = cookie.get("email") || "";
  let password = cookie.get("password") || "";
  let rememberMe = !!cookie.get("rememberMe");
  let attemptLogin = true;
  let loading = false;

  const attempt = (action, email, password, rememberMe) => async e => {
    if (!validateEmail(email)) {
      notify(EMAIL_INVALID);
      return;
    }

    if (!password) {
      notify(PASSWORD_MISSING);
      return;
    }

    loading = true;

    let response;
    try {
      response = await request(action, {
        email,
        password: sha1(password)
      });
    } catch (error) {
      notify(error);
      loading = false;
      return;
    }

    loading = false;

    if (action === CREATE_ACCOUNT) {
      notify(ACCOUNT_CREATED);
      attemptLogin = !attemptLogin;
    }

    if (action === LOGIN_ACCOUNT) {
      if (rememberMe) {
        cookie.set("email", email);
        cookie.set("password", password);
        cookie.set("rememberMe", true);
      } else {
        cookie.remove("email");
        cookie.remove("password");
        cookie.remove("rememberMe");
      }
      notify(ACCOUNT_LOGGED_IN);
      login(response);
    }
  };

  $: action = attempt(
    attemptLogin ? LOGIN_ACCOUNT : CREATE_ACCOUNT,
    email,
    password,
    rememberMe
  );

  $: {
    if (!attemptLogin) {
      email = "";
      password = "";
    }
  }
</script>

<style>
  .info {
    margin-top: 20px;
  }
  span {
    color: #1eadfa;
    text-decoration: underline;
  }
  .login {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="login">
  <Center>
    <form on:submit|preventDefault={action}>
      <Crow vertical gutter={14}>
        <TextInput
          name="email"
          onChange={value => (email = value)}
          value={email}
          text="Email" />
        <PasswordInput
          name="password"
          onChange={value => (password = value)}
          value={password}
          text="Password" />
        {#if attemptLogin}
          <CheckBox
            id="agree1"
            onChange={value => (rememberMe = value)}
            value={rememberMe}
            text="Remember me" />
        {/if}
        <Button primary onClick={action} disabled={loading}>
          {#if attemptLogin}Log in{:else}Create account{/if}
        </Button>
      </Crow>
    </form>

    <div
      class="info"
      on:click|preventDefault={() => (attemptLogin = !attemptLogin)}>
      {#if attemptLogin}
        Create an account
        <span>here</span>
      {/if}

      {#if !attemptLogin}
        <span>Go back</span>
      {/if}

    </div>
  </Center>
</div>
