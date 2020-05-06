import { logout } from './functions';

export default ({ token }) => {
  return (
    <div>
      Logged in as {token}
      <br />
      <div onClick={logout}>Logout</div>
    </div>
  );
};
