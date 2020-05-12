import { useState } from 'react';
import Button from './ui/Button';

// Will be in another file
const resistances = {
  void: 0,
  fire: 0,
  lightning: 0,
  nature: 0,
  earth: 0,
  water: 0,
  frost: 0,
};

// Will be in another file
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

// Will be in another file
const getSuffix = (statName) =>
  ((statName) => {
    switch (statName) {
      case 'damage':
      case 'health':
        return '';
      default:
        return '%';
    }
  })(statName);

// Will be in another file
const getMax = (statName) =>
  ((statName) => {
    switch (statName) {
      case 'attackSpeed':
      case 'movementSpeed':
      case 'range':
        return '200%';
      case 'damage':
      case 'health':
        return '∞';
      case 'armor':
      case 'dodgeChance':
      case 'blockChance':
        return '95%';
      case 'criticalDamage':
        return '250%';
      default:
        return '100%';
    }
  })(statName);

// Will be in another file
const getFormula = (statName) =>
  ((statName) => {
    switch (statName) {
      case 'health':
        return {
          present: '(tier * 5) * 3',
          calculate: (level = 1) => {
            return level * 5 * 3;
          },
        };
      case 'damage':
        return {
          present: '(tier * 5)',
          calculate: (level = 1) => {
            return level * 5;
          },
        };
      case 'dodgeChance':
      case 'armor':
      case 'blockChance':
        return {
          present: '(0.95 * (level * 5)) / (level * 5 + 400)',
          calculate: (level = 1) => {
            const calculated = (0.95 * (level * 5)) / (level * 5 + 400);
            return `${(calculated * 100).toFixed(2)}%`;
          },
        };
      case 'criticalChance':
        return {
          present: '(1.00 * (level * 5)) / (level * 5 + 400)',
          calculate: (level = 1) => {
            const calculated = (1 * (level * 5)) / (level * 5 + 400);
            return `${(calculated * 100).toFixed(2)}%`;
          },
        };
      case 'criticalDamage':
      case 'attackSpeed':
      case 'movementSpeed':
      case 'range':
        return {
          present: '(1.00 * (level * 5)) / (level * 5 + 400)',
          calculate: (level = 1) => {
            const calculated = (1 * (level * 5)) / (level * 5 + 400);
            return `${(calculated * 100).toFixed(2)}%`;
          },
        };
      default:
        return {
          present: '((level * 5)) / (level * 5 + 400)',
          calculate: (level = 1) => {
            const calculated = (level * 5) / (level * 5 + 400);
            return `${(calculated * 100).toFixed(2)}%`;
          },
        };
    }
  })(statName);

// Could be here
const spaceCamelCase = (statName) => statName.replace(/([A-Z]+)/g, ' $1');

// Could be here
const transform = ([key, value]) => ({
  value,
  name: spaceCamelCase(key),
  suffix: getSuffix(key),
  max: getMax(key),
  formula: getFormula(key),
});

export default () => {
  const [level, setLevel] = useState(1);
  return (
    <div className='character-sheet'>
      <h2>Current level is: {level}</h2>
      <h2>Current "stat points" are: {level * 5}</h2>
      <Button onClick={() => setLevel(level + 1)}>Increase level</Button>
      <br />
      <Button onClick={() => setLevel(level * 2)}>Double level</Button>
      <br />
      <Button onClick={() => setLevel(1)}>Reset level</Button>

      {Object.entries(characterStats)
        .map(transform)
        .map(({ name, value, suffix, max, formula }) => (
          <div className='stat' key={name}>
            <div className='name'>{name}</div>
            <div className='value'>
              {value}
              {suffix}
            </div>
            <div className='max'>max {max}</div>
            <div className='formula'>{formula.present}</div>
            <div className='calculate'>{formula.calculate(level)}</div>
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
        .calculate {
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
