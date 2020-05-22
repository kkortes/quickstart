import { useDispatch } from 'reactn';

export default ({ entity }) => {
  const { setEntityInfo } = useDispatch();
  const { name, tier } = entity;

  return (
    <div
      className='entity-link'
      onMouseOver={() => setEntityInfo(entity)}
      onMouseOut={() => setEntityInfo({})}
    >
      [{name} {tier}]
      <style jsx>{`
        .entity-link {
          display: inline-block;
          color: #fff;
          border-bottom: 1px solid transparent;
          text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.9);
        }
        .entity-link:hover {
          border-color: #fff;
        }
      `}</style>
    </div>
  );
};
