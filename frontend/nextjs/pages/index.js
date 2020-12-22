import { useEffect, setGlobal, useDispatch, useState, getGlobal } from 'reactn';
import { LOGIN_ACCOUNT } from '../node_modules/@shared/consts/SOCKET_ACTIONS';
import Login from '../components/Login';
import Protected from '../components/Protected';
import auth from '../common/auth';
import Loader from '../components/Loader';

export default ({ token }) => {
  const {
    socket,
    account: { _id },
  } = getGlobal();

  const [loggedIn, setLoggedIn] = useState(false);
  const { login } = useDispatch();

  useEffect(() => {
    if (_id) {
      setLoggedIn(true);
    }
  }, [_id]);

  useEffect(() => {
    if (token) {
      (async () => {
        const response = await socket.request(LOGIN_ACCOUNT, { token });

        if (response.type !== 'error') {
          setGlobal({ token });
          login(response);
          setLoggedIn(true);
        }
      })();
    }
  }, []);

  let render;

  if (!token) {
    render = <Login />;
  }

  if (token && !loggedIn) {
    render = <Loader text='fetching state' />;
  }

  if (token && loggedIn) {
    render = <Protected token={token} />;
  }

  return render;
};
export const getServerSideProps = async (ctx) => ({ props: { ...auth(ctx) } });
