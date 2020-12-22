import uuid from 'short-uuid';
import cookie from 'js-cookie';
import { REGISTER_TOKEN } from '@shared/consts/SOCKET_ACTIONS.js';
import INITIAL_STORE from './initialStore';
import { storeState, storeStateWithDebounce } from '../common/db';
import socket from '../common/socket';

export default {
  removeNotification: (key, { notifications }) => ({
    notifications: notifications.filter(
      (notification) => notification.key !== key
    ),
  }),
  notify: ({ title, ...notification }, { notifications }) => {
    const type = notification.hasOwnProperty('error')
      ? 'error'
      : notification.type;
    const text = notification.hasOwnProperty('error')
      ? notification.error
      : notification.text;

    const key = uuid.generate();
    return {
      notifications: [
        ...notifications,
        {
          key,
          title,
          text,
          type,
        },
      ],
    };
  },
  accountChanges: (payload, store, { notify }) => {
    const { account } = store;
    const merged = {
      ...account,
      ...payload,
    };

    storeStateWithDebounce(merged, notify, store);

    return {
      account: merged,
    };
  },
  changeUsername: (payload, _store, { accountChanges }) =>
    accountChanges({
      username: payload,
    }),
  setPosition: (payload, _store, { accountChanges }) =>
    accountChanges({ position: payload }),
  setFromCenter: (payload) => ({
    fromCenter: payload,
  }),
  login: (payload, { account, fromCenter }) => {
    const { token, ...dbData } = payload;

    cookie.set('token', token, { expires: 1 });

    return {
      token,
      account: {
        ...account,
        ...dbData,
      },
      fromCenter: {
        ...fromCenter,
        x: dbData.hasOwnProperty('position') ? dbData.position.x : 0,
        y: dbData.hasOwnProperty('position') ? dbData.position.y : 0,
      },
    };
  },
  logout: async (payload, store, { notify }) => {
    const { account } = store;
    socket.emit(REGISTER_TOKEN, '');
    cookie.remove('token');

    await storeState(account, notify, store);

    notify(payload);

    return {
      ...INITIAL_STORE,
      notifications: [...store.notifications],
    };
  },
};
