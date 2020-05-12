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

const spaceCamelCase = (statName) => statName.replace(/([A-Z]+)/g, ' $1');

const transform = ([key, value]) => ({
  value,
  name: spaceCamelCase(key),
  suffix: getSuffix(key),
  max: getMax(key),
  formula: getFormula(key),
});

export { transform };
