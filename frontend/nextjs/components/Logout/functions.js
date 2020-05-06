import cookie from 'js-cookie';
import Router from 'next/router';

const logout = () => {
  cookie.remove('token');
  Router.push('/');
};

const addNotification = (dispatch) => () => {
  dispatch({
    type: 'notify',
    payload: {
      title: 'Hey!',
    },
  });
};

const clearNotifications = (dispatch) => () => {
  dispatch({
    type: 'clearNotifications',
  });
};

let cuTimeout = setTimeout(() => {});

const changeUsername = (dispatch) => (e) => {
  dispatch({
    type: 'changeUsername',
    payload: e.target.value,
  });
  // clearTimeout(cuTimeout);

  // cuTimeout = setTimeout(
  //   (value) => {

  //   },
  //   2000,
  //   e.target.value
  // );
};

export { logout, addNotification, clearNotifications, changeUsername };
