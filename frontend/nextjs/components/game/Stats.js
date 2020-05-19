import { useGlobal, useDispatch } from 'reactn';
import { transform } from '../../game/stats';
import TextInput from '../ui/TextInput';

export default () => {
  const [
    {
      account: { stats },
    },
  ] = useGlobal();
  const { setStat } = useDispatch();

  return (
    <div className='stats'>
      {Object.entries(stats)
        .map(transform)
        .filter(({ key }) => key !== 'resistances')
        .map(({ name, key, value, prettyValue }) => {
          return (
            <div key={key} className={`stat ${name}`}>
              <div>
                {name} {prettyValue}
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
                  value={value}
                  text={name}
                />
              </div>
            </div>
          );
        })}
      <style jsx>{`
        .input {
          overflow: hidden;
        }
        .input :global(input) {
          color: #fff;
        }
        .stats {
          position: fixed;
          bottom: 40px;
          right: 0;
          width: 500px;
          background: rgba(0, 0, 0, 0.9);
          color: #fff;
          padding: 10px;
        }
        .stat {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};
