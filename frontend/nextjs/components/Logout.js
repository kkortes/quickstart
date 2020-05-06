import cookie from 'js-cookie';
import Router from 'next/router';

const logout = () => {
  cookie.remove('token');
  Router.push('/');
};

export default ({ token }) => {
  return (
    <div>
      Logged in as {token}
      <br />
      <div onClick={logout}>Logout</div>
    </div>
  );
};
