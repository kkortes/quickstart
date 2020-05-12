import { useState } from 'react';
import Button from './ui/Button';
import stats from '../definitions/stats';

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
  health: 15,
  damage: 5,
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

const spaceCamelCase = (statName) => statName.replace(/([A-Z]+)/g, ' $1');

const transform = ([key, value]) => ({
  value,
  name: spaceCamelCase(key),
  ...stats[key],
});

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

      {Object.entries(characterStats)
        .map(transform)
        .map(({ name, value, suffix, max, formula, valueByTier }) => (
          <div className='stat' key={name}>
            <div className='name'>{name}</div>
            <div className='value'>
              {value}
              {suffix}
            </div>
            <div className='max'>max {max}</div>
            <div className='formula'>{formula}</div>
            <div className='valueByTier'>{valueByTier(tier)}</div>
          </div>
        ))}
      <style jsx>{`
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
        .name:first-letter {
          text-transform: uppercase;
        }
        .character-sheet {
          margin: 0 auto;
          width: 900px;
        }
      `}</style>
    </div>
  );
};
