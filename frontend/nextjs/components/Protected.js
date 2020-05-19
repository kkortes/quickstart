import { useGlobal } from 'reactn';
import StateChecks from './StateChecks';

import UsernameInput from './UsernameInput';
import config from '../config';
import Debug from './Debug';
import Interface from './game/Interface';

export default ({ token }) => {
  const [
    {
      socket,
      account: { username },
    },
  ] = useGlobal();

  return (
    <>
      {username && <Interface />}
      {!username && <UsernameInput />}
      {config.debug && <Debug token={token} socket={socket} />}
      <StateChecks />
    </>
  );
};
