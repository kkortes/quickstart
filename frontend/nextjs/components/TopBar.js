import { ACCOUNT_LOGGED_OUT } from '../universal/NOTIFICATIONS';
import { useDispatch, useGlobal } from 'reactn';

export default () => {
  const { logout } = useDispatch();
  const [
    {
      position: { x, y },
      account: { username },
    },
  ] = useGlobal();
  return (
    <div className='top-bar'>
      <div>
        {username} X:{x} Y:{y}
      </div>
      <div onClick={() => logout(ACCOUNT_LOGGED_OUT)}>Logout</div>

      <style jsx>{`
        .top-bar {
          position: relative;
          color: #fff;
          display: flex;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.75);
          padding: 10px;
        }
      `}</style>
    </div>
  );
};
