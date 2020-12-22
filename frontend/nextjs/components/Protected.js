import { useGlobal } from 'reactn';
import config from '../node_modules/@shared/config';
import StateChecks from './StateChecks';
import UsernameInput from './UsernameInput';
import Debug from './Debug';
import Interface from './game/Interface';
import CharacterSheet from './CharacterSheet';

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
      {/* {username && <CharacterSheet />} */}
      {!username && <UsernameInput />}
      {config.debug && <Debug token={token} socket={socket} />}
      <StateChecks />
    </>
  );
};
