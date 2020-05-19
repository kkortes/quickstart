import { useGlobal } from 'reactn';
import { transform } from '../../game/stats';
import lodash from 'lodash';
const { isEmpty } = lodash;

export default () => {
  const [
    {
      account: { equipment },
    },
  ] = useGlobal();

  return (
    <div className='inventory'>
      {Object.entries(equipment)
        .map(transform)
        .map(({ name, key, value }) => (
          <div key={key} className={`${name}`}>
            {name} {!isEmpty(value) ? value.name : 'n/a'}
          </div>
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
