import { useGlobal, useDispatch, useEffect } from 'reactn';
import config from '../node_modules/@shared/config';
import { LOGGED_IN_ELSWEHRE } from '../node_modules/@shared/consts/SOCKET_ACTIONS';
import {
  ACCOUNT_LOGGED_IN_ELSEWHERE,
  ACCOUNT_LOGGED_OUT,
} from '../node_modules/@shared/consts/NOTIFICATIONS';

export default () => {
  const [{ socket }] = useGlobal();
  const { logout } = useDispatch();

  const forceClear = () => {
    if (!config.debug) {
      logout(ACCOUNT_LOGGED_OUT);
    }
    return null;
  };

  const logMeOut = () => logout(ACCOUNT_LOGGED_IN_ELSEWHERE);

  useEffect(() => {
    window.addEventListener('beforeunload', forceClear);
    socket.on(LOGGED_IN_ELSWEHRE, logMeOut);

    return () => {
      window.removeEventListener('beforeunload', forceClear);
      socket.off(LOGGED_IN_ELSWEHRE, logMeOut);
    };
  }, []);

  return null;
};
