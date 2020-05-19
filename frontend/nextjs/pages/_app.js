import { withInit } from 'reactn';
import uuid from 'short-uuid';
import Meta from '../components/Meta';
import socket from '../common/socket';
import { storeState, storeStateWithDebounce } from '../common/db';
import cookie from 'js-cookie';
import Router from 'next/router';
import { ACCOUNT_LOGGED_OUT } from '../../../universal/NOTIFICATIONS';
import { REGISTER_TOKEN } from '../../../universal/SOCKET_ACTIONS';

const INITIAL_STATE = {
  socket,
  token: '',
  account: {
    username: '',
  },
  notifications: [],
};

const INITIAL_REDUCERS = {
  accountChanges: ({ account }, { notify }, payload) => {
    const merged = {
      ...account,
      ...payload,
    };

    storeStateWithDebounce(merged, notify);

    return {
      account: merged,
    };
  },
  changeUsername: async (_store, { accountChanges }, payload) => {
    const store = await accountChanges({
      username: payload,
    });

    return {
      account: store.account,
    };
  },
  clearNotifications: () => ({
    notifications: [],
  }),
  removeNotification: ({ notifications }, _dispatch, payload) => ({
    notifications: notifications.filter(({ key }) => key !== payload),
  }),
  notify: ({ notifications }, _dispatch, { title, text, type }) => ({
    notifications: notifications.concat({
      key: uuid.generate(),
      title,
      text,
      type,
    }),
  }),
  login: ({ account }, _dispatch, payload) => {
    const { token, ...dbData } = payload;
    cookie.set('token', token, { expires: 1 });
    Router.push('/');

    return {
      token,
      account: {
        ...account,
        ...dbData,
      },
    };
  },
  logout: async ({ account, socket }, { notify }, payload) => {
    socket.emit(REGISTER_TOKEN, '');
    cookie.remove('token');
    Router.push('/');
    notify(payload);
    return storeState(account, notify);
  },
};

const MyApp = ({ Component, pageProps }) => (
  <Meta>
    <Component {...pageProps} />
  </Meta>
);

export default withInit(INITIAL_STATE, INITIAL_REDUCERS)(MyApp);
