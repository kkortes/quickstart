import { useDispatch, useGlobal } from 'reactn';
import { ACCOUNT_LOGGED_OUT } from '../node_modules/@shared/consts/NOTIFICATIONS';

export default () => {
  const { logout } = useDispatch();
  const [store] = useGlobal();
  const {
    account: {
      username,
      position: { x, y },
    },
    fromCenter: { horizontal, vertical },
  } = store;

  return (
    <div className='top-bar'>
      <div>
        {username} X:{x} Y:{y} Vertical: {vertical} Horizontal: {horizontal}
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
