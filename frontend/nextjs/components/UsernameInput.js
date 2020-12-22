import { useDispatch, useGlobal, useState } from 'reactn';
import { USERNAME_AVAILABILITY } from '../node_modules/@shared/consts/SOCKET_ACTIONS';
import TextInput from './ui/TextInput';
import Crow from './ui/Crow';
import Button from './ui/Button';
import Center from './ui/Center';

export default () => {
  const [username, setUsername] = useState('');
  const [{ socket }] = useGlobal();
  const { changeUsername, notify } = useDispatch();
  const [loading, setLoading] = useState(false);

  const confirmUsername = (username) => async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await socket.request(USERNAME_AVAILABILITY, {
      username,
    });

    setLoading(false);

    if (response.type === 'error') {
      notify(response);
    } else {
      changeUsername(response.username);
    }
  };

  return (
    <div className='username-input'>
      <Center>
        <form onSubmit={confirmUsername(username)}>
          <Crow vertical gutter={14}>
            <TextInput
              text='Username'
              type='text'
              value={username}
              onChange={(value) => setUsername(value.replace(/[^A-Za-z]/g, ''))}
            />
            <div>
              Max 8 letters and no special
              <br />
              characters or spaces are allowed.
            </div>
            <Button
              primary
              onClick={confirmUsername(username)}
              disabled={username.length < 3 || username.length > 8 || loading}
            >
              Confirm
            </Button>
          </Crow>
        </form>
      </Center>
      <style jsx>{`
        .username-input {
          ${loading ? 'pointer-events: none;' : ''}
        }
      `}</style>
      <style jsx>{`
        .username-input {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};
