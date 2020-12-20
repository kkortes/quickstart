import { useGlobal, useDispatch } from 'reactn';
import { transform } from '../../game/stats';
import TextInput from '../ui/TextInput';
import Crow from '../ui/Crow';

export default () => {
  const [
    {
      account: { stats },
    },
  ] = useGlobal();
  const { setStat } = useDispatch();

  return (
    <div className='stats'>
      <Crow horizontal gutter={8}>
        {Object.entries(stats)
          .map(transform)
          .filter(({ key }) => key !== 'resistances')
          .map(({ name, key, value, prettyValue, tierByValue }) => {
            const extra =
              key !== 'health' && key !== 'damage'
                ? tierByValue(value, true) * 5
                : '';
            return (
              <div key={key} className={`stat ${name}`}>
                <div>{name}</div>
                <div>
                  {prettyValue} {extra}
                </div>
                <div className='input'>
                  <TextInput
                    type='text'
                    name={key}
                    onChange={(value) =>
                      setStat({
                        value: value.replace(/[^0-9\.]/g, ''),
                        key,
                      })
                    }
                    value={value + ''}
                  />
                </div>
              </div>
            );
          })}
      </Crow>
      <style jsx>{`
        .input {
          width: 50px;
        }
        .input :global(input) {
          color: #fff;
        }
        .stat {
          text-align: center;
        }
        .stats {
          position: fixed;
          top: 40px;
          right: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.9);
          color: #fff;
          padding: 10px;
          display: flex;
          flex-direction: row;
        }
      `}</style>
    </div>
  );
};
