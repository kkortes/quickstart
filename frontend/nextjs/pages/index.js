import Login from '../components/Login';
import Protected from '../components/Protected';
import auth from '../common/auth';

export default ({ token }) => (token ? <Protected token={token} /> : <Login />);
export const getServerSideProps = async (ctx) => ({ props: { ...auth(ctx) } });
