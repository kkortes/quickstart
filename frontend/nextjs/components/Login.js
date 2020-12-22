import { useEffect, useDispatch, useGlobal, useState, setGlobal } from 'reactn';
import sha1 from 'sha1';
import {
  LOGIN_ACCOUNT,
  CREATE_ACCOUNT,
} from '../node_modules/@shared/consts/SOCKET_ACTIONS';
import { validateEmail } from '../node_modules/@shared/utils';
import {
  PASSWORD_MISSING,
  ACCOUNT_LOGGED_IN,
  EMAIL_INVALID,
  ACCOUNT_CREATED,
} from '../node_modules/@shared/consts/NOTIFICATIONS';
import TextInput from './ui/TextInput';
import Crow from './ui/Crow';
import Button from './ui/Button';
import CheckBox from './ui/CheckBox';
import cookie from 'js-cookie';
import Center from './ui/Center';

export default () => {
  const [{ socket }] = useGlobal();
  const { notify, login } = useDispatch();
  const [attemptLogin, setAttemptLogin] = useState(true);
  const [email, setEmail] = useState(cookie.get('email') || '');
  const [password, setPassword] = useState(cookie.get('password') || '');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(!!cookie.get('rememberMe'));

  const toggleAttemptLogin = (e) => {
    e.preventDefault();
    setAttemptLogin(!attemptLogin);
  };

  const attempt = (action, email, password, rememberMe) => async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      notify(EMAIL_INVALID);
      return;
    }

    if (!password) {
      notify(PASSWORD_MISSING);
      return;
    }

    setLoading(true);

    const response = await socket.request(action, {
      email,
      password: sha1(password),
    });

    setLoading(false);

    if (response.type === 'error') {
      notify(response);
      return;
    }

    if (action === CREATE_ACCOUNT) {
      notify(ACCOUNT_CREATED);
      setAttemptLogin(!attemptLogin);
    }

    if (action === LOGIN_ACCOUNT) {
      if (rememberMe) {
        cookie.set('email', email);
        cookie.set('password', password);
        cookie.set('rememberMe', true);
      } else {
        cookie.remove('email');
        cookie.remove('password');
        cookie.remove('rememberMe');
      }
      notify(ACCOUNT_LOGGED_IN);
      login(response);
    }
  };

  const action = attempt(
    attemptLogin ? LOGIN_ACCOUNT : CREATE_ACCOUNT,
    email,
    password,
    rememberMe
  );

  useEffect(() => {
    if (!attemptLogin) {
      setEmail('');
      setPassword('');
    }
  }, [attemptLogin]);

  // Todo, make "<Crow />" support null returns
  const checkBox = attemptLogin ? (
    <CheckBox
      id='agree1'
      onChange={setRememberMe}
      value={rememberMe}
      text='Remember me'
    />
  ) : (
    []
  );

  return (
    <div className='login'>
      <Center>
        <form onSubmit={action}>
          <Crow vertical gutter={14}>
            <TextInput
              type='text'
              name='email'
              onChange={setEmail}
              value={email}
              text='Email'
            />
            <TextInput
              type='password'
              name='password'
              onChange={setPassword}
              value={password}
              text='Password'
            />
            {checkBox}
            <Button primary onClick={action} disabled={loading}>
              {attemptLogin ? 'Log in' : 'Create account'}
            </Button>
          </Crow>
        </form>

        <div className='info' onClick={toggleAttemptLogin}>
          {attemptLogin && (
            <>
              Create an account <span>here</span>
            </>
          )}
          {!attemptLogin && <span>Go back</span>}
        </div>
      </Center>
      <style jsx>{`
        .login {
          ${loading ? 'pointer-events: none;' : ''}
        }
      `}</style>
      <style jsx>{`
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
      `}</style>
    </div>
  );
};
