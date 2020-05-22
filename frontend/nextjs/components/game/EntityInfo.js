import { useGlobal } from 'reactn';
import { isEmpty } from 'lodash';
import { transform } from '../../game/stats';
import { STATS } from '../../constants/INITIALS';
import Crow from '../ui/Crow';

const isCombatStat = (key) => Object.keys(STATS).includes(key);

export default () => {
  const [{ entityInfo }] = useGlobal();

  if (isEmpty(entityInfo)) return null;

  const { name, tier } = entityInfo;

  return (
    <div className='entity-info'>
      {name}
      {Object.entries(entityInfo)
        .map(transform)
        .filter(({ key }) => isCombatStat(key))
        .map(({ key, name, valueByTier, tierByValue }) => (
          <div key={key} className='stat'>
            <Crow left gutter={8}>
              {name}
              {tierByValue(valueByTier(tier)) * 5}
            </Crow>
          </div>
        ))}
      <style jsx>{`
        .entity-info {
          position: fixed;
          right: 4px;
          bottom: 130px;
          background: rgba(0, 0, 0, 0.5);
          padding: 10px;
          color: #fff;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};
