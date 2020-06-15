import { REGISTER_TOKEN } from '../../universal/SOCKET_ACTIONS.js';
import INITIAL_STORE from './initialStore.js';
import uuid from 'short-uuid';
import cookie from 'js-cookie';
import { storeState, storeStateWithDebounce } from '../common/db.js';
import { sleep } from '../../universal/helpers.js';

export default {
  removeNotification: (key, { notifications }) => ({
    notifications: notifications.filter(
      (notification) => notification.key !== key
    ),
  }),
  notify: ({ title, text, type }, { notifications }) => {
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
        x: dbData.position.x,
        y: dbData.position.y,
      },
    };
  },
  logout: (payload, store, { notify }) => {
    const { account, socket } = store;
    socket.emit(REGISTER_TOKEN, '');
    cookie.remove('token');

    storeState(account, notify, store);

    return {
      ...INITIAL_STORE,
      ...notify(payload),
    };
  },
};
