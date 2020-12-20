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
  enitityInfo: undefined,
  worldTier: 1,
  fromCenter: {
    vertical: 0,
    horizontal: 0,
    x: 0,
    y: 0,
  },
  drops: [],
  account: {
    username: '',
    equipment: EQUIPMENT,
    stats: STATS,
    picks: [],
    position: {
      x: 0,
      y: 0,
    },
  },
  notifications: [],
};

const INITIAL_REDUCERS = {
  pickUpEntity: ({ account, drops }, _dispatch, payload) => ({
    account: {
      ...account,
      picks: [...account.picks, payload.pickId],
    },
    drops: [
      ...drops,
      {
        ref: payload.entityRef,
        id: new Date().getTime(),
      },
    ],
  }),
  setPosition: async (_store, { accountChanges }, payload) =>
    accountChanges({ position: payload }),
  setEntityInfo: (_store, _dispatch, payload) => ({
    entityInfo: payload,
  }),
  setStat: async ({ account }, { accountChanges }, payload) =>
    accountChanges({
      stats: {
        ...account.stats,
        [payload.key]:
          parseFloat(payload.value) + '' === payload.value
            ? parseFloat(payload.value)
            : payload.value,
      },
    }),
  setFromCenter: (_store, _dispatch, payload) => ({
    fromCenter: payload,
  }),
  accountChanges: async ({ account }, { notify }, payload) => {
    const merged = {
      ...account,
      ...payload,
    };

    storeStateWithDebounce(merged, notify);

    return {
      account: merged,
    };
  },
  changeUsername: async (_store, { accountChanges }, payload) =>
    accountChanges({
      username: payload,
    }),
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
    const newState = await notify(payload);
    await storeState(account, notify);
    return { ...INITIAL_STATE, notifications: newState.notifications };
  },
};

const MyApp = ({ Component, pageProps }) => (
  <Meta>
    <Component {...pageProps} />
  </Meta>
);

export default withInit(INITIAL_STATE, INITIAL_REDUCERS)(MyApp);
