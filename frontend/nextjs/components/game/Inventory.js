import { useGlobal } from 'reactn';

export default () => {
  const [{ account }] = useGlobal();
  console.log(account);
  return null;
  return (
    <div className='inventory'>
      {Object.entries(equipment).map(([key, value]) => (
        <div className={`${key}`}>{value.name}</div>
      ))}
      <style jsx>{`
        .inventory {
          position: fixed;
          bottom: 40px;
          left: 0;
          width: 500px;
          background: rgba(0, 0, 0, 0.9);
          color: #fff;
          padding: 10px;
        }
      `}</style>
    </div>
  );
};
