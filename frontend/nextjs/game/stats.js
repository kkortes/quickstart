const prettyValue = (statName, value) =>
  ((statName) => {
    switch (statName) {
      case 'damage':
      case 'health':
        return value;
      default:
        return `${value * 100}%`;
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
        return '99%';
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
        return 'tier * 3';
      case 'damage':
        return 'tier';
      case 'dodgeChance':
      case 'armor':
      case 'blockChance':
        return '0.99 * tier / (tier + 98)';
      default:
        return 'tier / (tier + 98)';
    }
  })(statName);

const valueByTier = (statName) =>
  ((statName) => {
    switch (statName) {
      case 'health':
        return (tier) => tier * 3;
      case 'damage':
        return (tier) => tier;
      case 'dodgeChance':
      case 'armor':
      case 'blockChance':
        return (tier, prettyPrint) => {
          const calculation = (0.99 * tier) / (tier + 98);
          return prettyPrint
            ? (calculation * 100).toFixed(2) + '%'
            : calculation;
        };
      default:
        return (tier, prettyPrint) => {
          const calculation = tier / (tier + 98);
          return prettyPrint
            ? (calculation * 100).toFixed(2) + '%'
            : calculation;
        };
    }
  })(statName);

const tierByValue = (statName) =>
  ((statName) => {
    switch (statName) {
      case 'health':
        return (value) => value / 3;
      case 'damage':
        return (value) => value;
      case 'dodgeChance':
      case 'armor':
      case 'blockChance':
        return (value, prettyPrint) => {
          const calculation = (9800 * value) / (99 - 100 * value);
          return prettyPrint ? Math.round(calculation) : calculation;
        };
      default:
        return (value, prettyPrint) => {
          const calculation = (98 * value) / (1 - value);
          return prettyPrint ? Math.round(calculation) : calculation;
        };
    }
  })(statName);

const spaceCamelCase = (statName) => {
  const name = statName.replace(/([A-Z]+)/g, ' $1');
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const transform = ([key, value]) => ({
  value,
  key,
  name: spaceCamelCase(key),
  prettyValue: prettyValue(key, value),
  max: getMax(key),
  formula: getFormula(key),
  valueByTier: valueByTier(key),
  tierByValue: tierByValue(key),
});

export { transform };
