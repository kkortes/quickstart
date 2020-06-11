import { REGISTER_TOKEN } from '../../universal/SOCKET_ACTIONS.js';
import INITIAL_STORE from './initialStore.js';
import uuid from 'short-uuid';
import cookie from 'js-cookie';

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
  accountChanges: (payload, { account }, { notify }) => {
    const merged = {
      ...account,
      ...payload,
    };

    // storeStateWithDebounce(merged, notify);

    return {
      account: merged,
    };
  },
  changeUsername: (payload, _store, { accountChanges }) =>
    accountChanges({
      username: payload,
    }),
  login: (payload, { account }) => {
    const { token, ...dbData } = payload;
    cookie.set('token', token, { expires: 1 });

    return {
      token,
      account: {
        ...account,
        ...dbData,
      },
    };
  },
  logout: (payload, { account, socket }, { notify }) => {
    socket.emit(REGISTER_TOKEN, '');
    cookie.remove('token');

    // await storeState(account, notify);

    return {
      ...INITIAL_STORE,
      ...notify(payload),
    };
  },
};
