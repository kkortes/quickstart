import { useState } from 'react';
import Button from './ui/Button';
import { transform } from '../game/stats';
import { STATS } from '../constants/INITIALS';

export default () => {
  const [tier, setTier] = useState(1);

  return (
    <div className='character-sheet'>
      <h2>Current tier is: {tier}</h2>
      <h2>Current "stat points" are: {tier * 5}</h2>
      <Button onClick={() => setTier(tier + 1)}>Increase tier</Button>
      <br />
      <Button onClick={() => setTier(tier * 2)}>Double tier</Button>
      <br />
      <Button onClick={() => setTier(1)}>Reset tier</Button>

      <div className='stat headline'>
        <div className='name'>Stat</div>
        <div className='value'>Value</div>
        <div className='max'>Max</div>
        <div className='formula'>Formula</div>
        <div className='valueByTier'>ValueByTier</div>
        <div className='tierByValue'>TierByValue</div>
      </div>

      {Object.entries(STATS)
        .map(transform)
        .filter(({ key }) => key !== 'resistances')
        .map(
          ({ name, prettyValue, max, formula, valueByTier, tierByValue }) => (
            <div className='stat' key={name}>
              <div className='name'>{name}</div>
              <div className='value'>{prettyValue}</div>
              <div className='max'>{max}</div>
              <div className='formula'>{formula}</div>
              <div className='valueByTier'>{valueByTier(tier, true)}</div>
              <div className='tierByValue'>
                {tierByValue(valueByTier(tier), true)}
              </div>
            </div>
          )
        )}
      <style jsx>{`
        .headline {
          font-weight: 600;
          margin-bottom: 8px;
        }
        .stat {
          display: flex;
        }
        .stat > div {
          margin: 0 10px;
        }
        .name {
          flex: 1;
        }
        .value {
          flex: 1;
        }
        .max {
          flex: 1;
        }
        .formula {
          flex: 2;
        }
        .valueByTier {
          flex: 1;
        }
        .tierByValue {
          flex: 1;
        }
        .character-sheet {
          margin: 0 auto;
          width: 1000px;
          background: #fff;
        }
      `}</style>
    </div>
  );
};
