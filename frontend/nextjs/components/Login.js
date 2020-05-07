import sha1 from 'sha1';
import cookie from 'js-cookie';
import Router from 'next/router';
import {
  LOGIN_ACCOUNT,
  CREATE_ACCOUNT,
} from '../../../universal/SOCKET_ACTIONS';
import { validateEmail } from '../../../universal/helpers';
import { useDispatch, useGlobal, useState, setGlobal } from 'reactn';

export default () => {
  const [{ socket }] = useGlobal();
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

  const attempt = (action, email, password) => async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      notify('Invalid email address');
      return;
    }

    if (!password) {
      notify('No password');
      return;
    }

    const response = await socket.request(action, {
      email,
      password: sha1(password),
    });

    if (response.error) {
      notify(response.error);
      return;
    }

    if (action === CREATE_ACCOUNT) {
      notify('Account was created!');
      setAttemptLogin(!attemptLogin);
    }

    if (action === LOGIN_ACCOUNT) {
      cookie.set('token', response.id, { expires: 1 });
      Router.push('/');
    }
  };

  const action = attempt(
    attemptLogin ? LOGIN_ACCOUNT : CREATE_ACCOUNT,
    email,
    password
  );

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
