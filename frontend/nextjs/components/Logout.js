import Icon from './Icon';
import { useState } from 'react';
import socket from '../common/socket';
import { useDispatch } from 'reactn';
import cookie from 'js-cookie';
import Router from 'next/Router';

const logout = () => {
  cookie.remove('token');
  Router.push('/');
};

export default ({ token }) => {
  const { notify, clearNotifications, changeUsername } = useDispatch();

  return (
    <div>
      <Icon name='apeegg' size={40} />
      Logged in as {token}
      <br />
      <input type='text' onChange={(e) => changeUsername(e.target.value)} />
      <div onClick={() => notify('hey!')}>Add notifications</div>
      <div onClick={() => clearNotifications()}>Clear notifications</div>
      <div onClick={logout}>Logout</div>
    </div>
  );
};
