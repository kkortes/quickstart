import sha1 from 'sha1';
import { useState } from 'react';
import socket from '../common/socket';
import { LOGIN, CREATE_ACCOUNT } from '../../../universal/SOCKET_ACTIONS';
import { validateEmail } from '../../../universal/helpers';

const login = (email, password) => async (e) => {
  e.preventDefault();
  if (!validateEmail(email)) {
    console.error('Invalid email address');
    return;
  }

  if (!password) {
    console.error('No password');
    return;
  }

  const response = await socket.request(LOGIN, {
    email,
    password: sha1(password),
  });

  console.log('login status', response);
};

const createAccount = (email, password) => async (e) => {
  e.preventDefault();
  if (!validateEmail(email)) {
    console.error('Invalid email address');
    return;
  }

  if (!password) {
    console.error('No password');
    return;
  }

  const response = await socket.request(CREATE_ACCOUNT, {
    email,
    password: sha1(password),
  });

  console.log('create account status', response);
};

export default () => {
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
    ? login(email, password)
    : createAccount(email, password);

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
