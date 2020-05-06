import cookie from 'js-cookie';
import Router from 'next/router';

const logout = () => {
  cookie.remove('token');
  Router.push('/');
};

export { logout };
