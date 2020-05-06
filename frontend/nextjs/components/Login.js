import sha1 from 'sha1';
import { useState } from 'react';
import socket from '../common/socket';
import { LOGIN, CREATE_ACCOUNT } from '../../../universal/SOCKET_ACTIONS';
import { validateEmail } from '../../../universal/helpers';
import cookie from 'js-cookie';
import Router from 'next/router';
import useStore from '../hooks/useStore';

const login = (email, password, dispatch) => async (e) => {
  e.preventDefault();
  if (!validateEmail(email)) {
    dispatch({
      type: 'notify',
      payload: {
        title: 'Invalid email address',
      },
    });
    return;
  }

  if (!password) {
    dispatch({
      type: 'notify',
      payload: {
        title: 'No password',
      },
    });
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
    dispatch({
      type: 'notify',
      payload: {
        title: response.error,
      },
    });
  }
};

const createAccount = (email, password, dispatch) => async (e) => {
  e.preventDefault();
  if (!validateEmail(email)) {
    dispatch({
      type: 'notify',
      payload: {
        title: 'Invalid email address',
      },
    });
    return;
  }

  if (!password) {
    dispatch({
      type: 'notify',
      payload: {
        title: 'No password',
      },
    });
    return;
  }

  const response = await socket.request(CREATE_ACCOUNT, {
    email,
    password: sha1(password),
  });

  if (response.error) {
    dispatch({
      type: 'notify',
      payload: {
        title: response.error,
      },
    });
  }
};

export default () => {
  const dispatch = useStore()[1];
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
    ? login(email, password, dispatch)
    : createAccount(email, password, dispatch);

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
