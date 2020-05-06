import { logout } from './functions';
import Icon from '../Icon';

export default ({ token }) => {
  return (
    <div>
      <Icon name='apeegg' size={40} />
      Logged in as {token}
      <br />
      <div onClick={logout}>Logout</div>
    </div>
  );
};
