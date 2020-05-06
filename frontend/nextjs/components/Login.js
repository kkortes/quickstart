import { useState } from 'react';
import sha1 from 'sha1';
import cookie from 'js-cookie';
import Router from 'next/router';
import socket from '../common/socket';
import { LOGIN, CREATE_ACCOUNT } from '../../../universal/SOCKET_ACTIONS';
import { validateEmail } from '../../../universal/helpers';
import { useDispatch } from 'reactn';

const login = (email, password, notify) => async (e) => {
  e.preventDefault();
  if (!validateEmail(email)) {
    notify('Invalid email address');
    return;
  }

  if (!password) {
    notify('No password');
    return;
  }

  const response = await socket.request(LOGIN, {
    email,
    password: sha1(password),
  });

  if (!response.error) {
    cookie.set('token', response.id, { expires: 1 });
    Router.push('/');
  } else {
    notify(response.error);
  }
};

const createAccount = (email, password, notify) => async (e) => {
  e.preventDefault();
  if (!validateEmail(email)) {
    notify('Invalid email address');
    return;
  }

  if (!password) {
    notify('No password');
    return;
  }

  const response = await socket.request(CREATE_ACCOUNT, {
    email,
    password: sha1(password),
  });

  if (response.error) {
    notify(response.error);
  }
};

export default () => {
  const { notify } = useDispatch();
  const [attemptLogin, setAttemptLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const toggleAttemptLogin = (e) => {
    e.preventDefault();

    setAttemptLogin(!attemptLogin);
  };

  const action = attemptLogin
    ? login(email, password, notify)
    : createAccount(email, password, notify);

  return (
    <div>
      <form onSubmit={action}>
        <input
          type='text'
          name='email'
          onChange={onChangeEmail}
          value={email}
        />
        <input
          type='password'
          name='password'
          onChange={onChangePassword}
          value={password}
        />
        <button onClick={action}>
          {attemptLogin ? 'Login' : 'Create account'}
        </button>
      </form>
      <a onClick={toggleAttemptLogin}>
        Go to {attemptLogin ? 'Create account' : 'Login'}
      </a>
    </div>
  );
};
