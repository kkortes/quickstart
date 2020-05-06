import sha1 from 'sha1';
import cookie from 'js-cookie';
import Router from 'next/router';
import socket from '../../common/socket';
import { LOGIN, CREATE_ACCOUNT } from '../../../../universal/SOCKET_ACTIONS';
import { validateEmail } from '../../../../universal/helpers';

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

export { login, createAccount };
