import { useDispatch, useGlobal } from 'reactn';
import Icon from './ui/Icon';
import StateChecks from './StateChecks';
import { ACCOUNT_LOGGED_OUT } from '../../../universal/NOTIFICATIONS';

export default ({ token }) => {
  const [{ socket }] = useGlobal();
  const { changeUsername, logout } = useDispatch();

  return (
    <div>
      <Icon name='apeegg' size={40} />
      Logged in as {token}
      <br />
      Socket ID: {socket.id}
      <br />
      <input type='text' onChange={(e) => changeUsername(e.target.value)} />
      <div onClick={() => logout(ACCOUNT_LOGGED_OUT)}>Logout</div>
      <StateChecks />
    </div>
  );
};
