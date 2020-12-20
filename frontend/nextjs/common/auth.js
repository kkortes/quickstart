import nextCookie from 'next-cookies';

const auth = (ctx) => {
  const { token } = nextCookie(ctx);

  return token
    ? {
        token,
      }
    : {};
};

export default auth;
