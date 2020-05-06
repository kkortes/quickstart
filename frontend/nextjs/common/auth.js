import { pick } from 'lodash';
import nextCookie from 'next-cookies';
// import cookies from 'js-cookie';
// import config from '../../../config';

const auth = (ctx) => {
  const keys = pick(nextCookie(ctx), ['token']);
  // if (!config.debug) {
  //   cookies.remove('token');
  //   cookies.remove('sessionLoginKey');
  // }
  return keys;
};

export default auth;
