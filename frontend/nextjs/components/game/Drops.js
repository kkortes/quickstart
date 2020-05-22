import { useGlobal } from 'reactn';
import { getEntity } from '../../game/entities';
import EntityLink from '../game/EntityLink';

export default () => {
  const [{ drops }] = useGlobal();

  return (
    <div className='drops'>
      <h3>Drops</h3>
      {drops.map(getEntity).map((entity) => (
        <div key={entity.id} className='entity'>
          <EntityLink entity={entity} />
        </div>
      ))}
      <style jsx>{`
        .drops {
          position: fixed;
          right: 0;
          top: 50%;
          width: 200px;
          background: rgba(0, 0, 0, 0.9);
          color: #fff;
          padding: 10px;
        }
      `}</style>
    </div>
  );
};
