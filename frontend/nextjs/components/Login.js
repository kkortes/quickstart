import sha1 from 'sha1';
import {
  LOGIN_ACCOUNT,
  CREATE_ACCOUNT,
} from '../../../universal/SOCKET_ACTIONS';
import { validateEmail } from '../../../universal/helpers';
import { useDispatch, useGlobal, useState, setGlobal } from 'reactn';
import TextInput from './ui/TextInput';
import Crow from './ui/Crow';
import Button from './ui/Button';
import CheckBox from './ui/CheckBox';
import {
  PASSWORD_MISSING,
  ACCOUNT_LOGGED_IN,
  EMAIL_INVALID,
  ACCOUNT_CREATED,
} from '../../../universal/NOTIFICATIONS';
import cookie from 'js-cookie';

export default () => {
  const [{ socket }] = useGlobal();
  const { notify, login } = useDispatch();
  const [attemptLogin, setAttemptLogin] = useState(true);
  const [email, setEmail] = useState(cookie.get('email') || '');
  const [password, setPassword] = useState(cookie.get('password') || '');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(!!cookie.get('rememberMe'));

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

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
      login(response.token);
    }
  };

  const action = attempt(
    attemptLogin ? LOGIN_ACCOUNT : CREATE_ACCOUNT,
    email,
    password,
    rememberMe
  );

  return (
    <div className='login'>
      <div className='card'>
        <form onSubmit={action}>
          <Crow vertical gutter={14}>
            <TextInput
              type='text'
              name='email'
              onChange={onChangeEmail}
              value={email}
              text='Email'
              disabled={loading}
            />
            <TextInput
              type='password'
              name='password'
              onChange={onChangePassword}
              value={password}
              text='Password'
              disabled={loading}
            />
            <CheckBox
              id='agree1'
              onChange={setRememberMe}
              value={rememberMe}
              text='Remember me'
            />
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
      </div>
      <style jsx>{`
        .card {
          padding: 100px;
          background-color: #fff;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        }
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
