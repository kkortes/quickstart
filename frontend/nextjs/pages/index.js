import Login from '../components/Login';
import Protected from '../components/Protected';
import auth from '../common/auth';
import { useEffect, setGlobal } from 'reactn';

export default ({ token }) => {
  useEffect(() => {
    if (token) {
      setGlobal({ token });
    }
  }, [token]);
  return token ? <Protected token={token} /> : <Login />;
};
export const getServerSideProps = async (ctx) => ({ props: { ...auth(ctx) } });
