import Login from '../components/Login';
import Logout from '../components/Logout';
import auth from '../common/auth';

const Index = ({ token }) => (token ? <Logout token={token} /> : <Login />);

Index.getInitialProps = (ctx) => ({
  ...auth(ctx),
});

export default Index;
