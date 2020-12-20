import Crow from './ui/Crow';

export default ({ token, socket }) => (
  <div className='debug'>
    <Crow horizontal left gutter={10}>
      <div>User ID: {token}</div>
      <div>Socket ID: {socket.id}</div>
    </Crow>
    <style jsx>{`
      .debug {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.75);
        color: #fff;
        padding: 10px;
      }
    `}</style>
  </div>
);
