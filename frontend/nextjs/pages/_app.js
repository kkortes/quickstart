import { withInit } from 'reactn';
import uuid from 'short-uuid';
import Meta from '../components/Meta';
import socket from '../common/socket';

const INITIAL_STATE = {
  socket,
  username: '',
  notifications: [],
};

const INITIAL_REDUCERS = {
  changeUsername: (_store, _dispatch, payload) => ({
    username: payload,
  }),
  clearNotifications: () => ({
    notifications: [],
  }),
  removeNotification: ({ notifications }, _dispatch, payload) => ({
    notifications: notifications.filter(({ key }) => key !== payload),
  }),
  notify: ({ notifications }, _dispatch, payload) => ({
    notifications: notifications.concat({
      key: uuid.generate(),
      title: payload,
    }),
  }),
};

const MyApp = ({ Component, pageProps }) => (
  <Meta>
    <Component {...pageProps} />
  </Meta>
);

export default withInit(INITIAL_STATE, INITIAL_REDUCERS)(MyApp);
