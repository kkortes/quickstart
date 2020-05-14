export default () => (
  <div className='center-indicator'>
    <style jsx>{`
      .center-indicator {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: fixed;
        width: 58px;
        height: 58px;
        border: 1px solid pink;
      }
    `}</style>
  </div>
);
