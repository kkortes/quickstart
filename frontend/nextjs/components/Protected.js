import { useDispatch, useGlobal } from 'reactn';
import Icon from './ui/Icon';
import StateChecks from './StateChecks';
import { ACCOUNT_LOGGED_OUT } from '../../../universal/NOTIFICATIONS';

import UsernameInput from './UsernameInput';

export default ({ token }) => {
  const [
    {
      socket,
      account: { username },
    },
  ] = useGlobal();
  const { logout } = useDispatch();

  return (
    <>
      <div>
        Logged in as {token}
        <br />
        Socket ID: {socket.id}
        <br />
        <div onClick={() => logout(ACCOUNT_LOGGED_OUT)}>Logout</div>
      </div>
      {!username && <UsernameInput />}
      <StateChecks />
    </>
  );
};
