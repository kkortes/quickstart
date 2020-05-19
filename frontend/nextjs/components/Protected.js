import { useGlobal } from 'reactn';
import StateChecks from './StateChecks';

import UsernameInput from './UsernameInput';
import CardPage from './CardPage';
import CharacterSheet from './CharacterSheet';
import World from './game/World';
import Player from './game/Player';
import Movement from './game/Movement';
import config from '../config';
import Debug from './Debug';
import TopBar from './TopBar';

export default ({ token }) => {
  const [
    {
      socket,
      account: { username },
    },
  ] = useGlobal();

  return (
    <>
      {username && <World />}
      {username && <Player />}
      <TopBar />
      {config.debug && <Debug token={token} socket={socket} />}
      {!username && <UsernameInput />}
      <StateChecks />
      <Movement />
    </>
  );
};
