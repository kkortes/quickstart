import {
  logout,
  addNotification,
  clearNotifications,
  changeUsername,
} from './functions';
import Icon from '../Icon';
import useStore from '../../hooks/useStore';
import { useEffect, useState } from 'react';
import socket from '../../common/socket';

export default ({ token }) => {
  const dispatch = useStore()[1];
  const [socketID, setSocketID] = useState(undefined);

  useEffect(() => setSocketID(socket.id), []);

  return (
    <div>
      <Icon name='apeegg' size={40} />
      Logged in as {token}
      <br />
      Socket ID: {socketID}
      <br />
      <input type='text' onChange={changeUsername(dispatch)} />
      <div onClick={addNotification(dispatch)}>Add notifications</div>
      <div onClick={clearNotifications(dispatch)}>Clear notifications</div>
      <div onClick={logout}>Logout</div>
    </div>
  );
};
