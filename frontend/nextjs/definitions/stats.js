export default {
  health: {
    suffix: '',
    max: '∞',
    formula: '(tier * 5) * 3',
    valueByTier: (tier) => tier * 5 * 3,
  },
  damage: {
    suffix: '',
    max: '∞',
    formula: 'tier * 5',
    valueByTier: (tier) => tier * 5,
  },
  armor: {
    suffix: '%',
    max: '95%',
    formula: '0.95 * (tier * 5) / (tier * 5 + 400)',
    valueByTier: (tier) => (0.95 * (tier * 5)) / (tier * 5 + 400),
  },
  dodgeChance: {
    suffix: '%',
    max: '95%',
    formula: '0.95 * (tier * 5) / (tier * 5 + 400)',
    valueByTier: (tier) => (0.95 * (tier * 5)) / (tier * 5 + 400),
  },
  blockChance: {
    suffix: '%',
    max: '95%',
    formula: '0.95 * (tier * 5) / (tier * 5 + 400)',
    valueByTier: (tier) => (0.95 * (tier * 5)) / (tier * 5 + 400),
  },
  criticalChance: {
    suffix: '%',
    max: '100%',
    formula: '(tier * 5) / (tier * 5 + 400)',
    valueByTier: (tier) => (tier * 5) / (tier * 5 + 400),
  },
  criticalDamage: {
    suffix: '%',
    max: '250%',
    formula: '(tier * 5) / (tier * 5 + 400)',
    valueByTier: (tier) => (tier * 5) / (tier * 5 + 400),
  },
  attackSpeed: {
    suffix: '%',
    max: '200%',
    formula: '(tier * 5) / (tier * 5 + 400)',
    valueByTier: (tier) => (tier * 5) / (tier * 5 + 400),
  },
  movementSpeed: {
    suffix: '%',
    max: '200%',
    formula: '(tier * 5) / (tier * 5 + 400)',
    valueByTier: (tier) => (tier * 5) / (tier * 5 + 400),
  },
  range: {
    suffix: '%',
    max: '200%',
    formula: '(tier * 5) / (tier * 5 + 400)',
    valueByTier: (tier) => (tier * 5) / (tier * 5 + 400),
  },
  void: {
    suffix: '%',
    max: '100%',
    formula: '(tier * 5) / (tier * 5 + 400)',
    valueByTier: (tier) => (tier * 5) / (tier * 5 + 400),
  },
  fire: {
    suffix: '%',
    max: '100%',
    formula: '(tier * 5) / (tier * 5 + 400)',
    valueByTier: (tier) => (tier * 5) / (tier * 5 + 400),
  },
  lightning: {
    suffix: '%',
    max: '100%',
    formula: '(tier * 5) / (tier * 5 + 400)',
    valueByTier: (tier) => (tier * 5) / (tier * 5 + 400),
  },
  nature: {
    suffix: '%',
    max: '100%',
    formula: '(tier * 5) / (tier * 5 + 400)',
    valueByTier: (tier) => (tier * 5) / (tier * 5 + 400),
  },
  earth: {
    suffix: '%',
    max: '100%',
    formula: '(tier * 5) / (tier * 5 + 400)',
    valueByTier: (tier) => (tier * 5) / (tier * 5 + 400),
  },
  water: {
    suffix: '%',
    max: '100%',
    formula: '(tier * 5) / (tier * 5 + 400)',
    valueByTier: (tier) => (tier * 5) / (tier * 5 + 400),
  },
  frost: {
    suffix: '%',
    max: '100%',
    formula: '(tier * 5) / (tier * 5 + 400)',
    valueByTier: (tier) => (tier * 5) / (tier * 5 + 400),
  },
};
