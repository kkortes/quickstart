import { pick } from 'lodash';
import nextCookie from 'next-cookies';

const auth = (ctx) => pick(nextCookie(ctx), ['token']);

export default auth;
