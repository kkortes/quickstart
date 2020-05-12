import damage from './stats/damage';

const Stat = (name) =>
  ((name) => {
    switch (name) {
      case 'damage':
        return new damage(name);
      default:
        return {};
    }
  })(name);

export default Stat;

// const calculateStat = (statName) =>
//   ((statName) => {
//     switch (statName) {
//       case 'health':
//         return {
//           present: '(tier * 5) * 3',
//           calculate: (level = 1) => {
//             return level * 5 * 3;
//           },
//         };
//       case 'damage':
//         return {
//           present: '(tier * 5)',
//           calculate: (level = 1) => {
//             return level * 5;
//           },
//         };
//       case 'dodgeChance':
//       case 'armor':
//       case 'blockChance':
//         return {
//           present: '(0.95 * (level * 5)) / (level * 5 + 400)',
//           calculate: (level = 1) => {
//             const calculated = (0.95 * (level * 5)) / (level * 5 + 400);
//             return `${(calculated * 100).toFixed(2)}%`;
//           },
//         };
//       case 'criticalChance':
//         return {
//           present: '(1.00 * (level * 5)) / (level * 5 + 400)',
//           calculate: (level = 1) => {
//             const calculated = (1 * (level * 5)) / (level * 5 + 400);
//             return `${(calculated * 100).toFixed(2)}%`;
//           },
//         };
//       case 'criticalDamage':
//       case 'attackSpeed':
//       case 'movementSpeed':
//       case 'range':
//         return {
//           present: '(1.00 * (level * 5)) / (level * 5 + 400)',
//           calculate: (level = 1) => {
//             const calculated = (1 * (level * 5)) / (level * 5 + 400);
//             return `${(calculated * 100).toFixed(2)}%`;
//           },
//         };
//       default:
//         return {
//           present: '((level * 5)) / (level * 5 + 400)',
//           calculate: (level = 1) => {
//             const calculated = (level * 5) / (level * 5 + 400);
//             return `${(calculated * 100).toFixed(2)}%`;
//           },
//         };
//     }
//   })(statName);

// export { calculateStat };
