import { useState } from 'react';
import Button from './ui/Button';
import { transform } from '../game/stats';

const resistances = {
  void: 0,
  fire: 0,
  lightning: 0,
  nature: 0,
  earth: 0,
  water: 0,
  frost: 0,
};

const characterStats = {
  health: 3,
  damage: 1,
  armor: 0,
  dodgeChance: 0,
  blockChance: 0,
  criticalChance: 0,
  criticalDamage: 150,
  attackSpeed: 100,
  movementSpeed: 100,
  range: 100,
  ...resistances,
};

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

      {Object.entries(characterStats)
        .map(transform)
        .map(
          ({ name, value, suffix, max, formula, valueByTier, tierByValue }) => (
            <div className='stat' key={name}>
              <div className='name'>{name}</div>
              <div className='value'>
                {value}
                {suffix}
              </div>
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
        .name:first-letter {
          text-transform: uppercase;
        }
        .character-sheet {
          margin: 0 auto;
          width: 1000px;
        }
      `}</style>
    </div>
  );
};
