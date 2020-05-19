import { withInit } from 'reactn';
import uuid from 'short-uuid';
import Meta from '../components/Meta';
import socket from '../common/socket';
import { storeState, storeStateWithDebounce } from '../common/db';
import cookie from 'js-cookie';
import Router from 'next/router';
import { REGISTER_TOKEN } from '../universal/SOCKET_ACTIONS';
import { EQUIPMENT, STATS } from '../constants/INITIALS';

const INITIAL_STATE = {
  socket,
  token: '',
  fromCenter: {
    vertical: 0,
    horizontal: 0,
  },
  position: {
    x: 0,
    y: 0,
  },
  account: {
    username: '',
    equipment: EQUIPMENT,
    stats: STATS,
  },
  notifications: [],
};

const INITIAL_REDUCERS = {
  setStat: async ({ account }, { accountChanges }, payload) => {
    const store = await accountChanges({
      ...account,
      stats: {
        ...account.stats,
        [payload.key]: payload.value,
      },
    });
    return {
      account: store.account,
    };
  },
  setPosition: (_store, _dispatch, payload) => ({
    position: payload,
  }),
  setFromCenter: (_store, _dispatch, payload) => ({
    fromCenter: payload,
  }),
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
    await storeState(account, notify);
    return INITIAL_STATE;
  },
};

const MyApp = ({ Component, pageProps }) => (
  <Meta>
    <Component {...pageProps} />
  </Meta>
);

export default withInit(INITIAL_STATE, INITIAL_REDUCERS)(MyApp);
