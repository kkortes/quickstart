import { useDispatch, useGlobal } from 'reactn';
import StateChecks from './StateChecks';
import { ACCOUNT_LOGGED_OUT } from '../../../universal/NOTIFICATIONS';

import UsernameInput from './UsernameInput';
import CardPage from './CardPage';
import CharacterSheet from './CharacterSheet';

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
      {/* {username && <CardPage />} */}
      {username && <CharacterSheet />}
      <StateChecks />
    </>
  );
};
