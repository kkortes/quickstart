const RESISTANCES = {
  void: 0,
  fire: 0,
  lightning: 0,
  nature: 0,
  earth: 0,
  water: 0,
  frost: 0,
};

const STATS = {
  health: 3,
  damage: 1,
  armor: 0.01,
  dodgeChance: 0.01,
  blockChance: 0.01,
  criticalChance: 0.01,
  criticalDamage: 1.5,
  attackSpeed: 1,
  movementSpeed: 1,
  range: 1,
  resistances: RESISTANCES,
};

const EQUIPMENT = {
  armor: {},
  mainHand: {},
  offHand: {},
  accessory: {},
};

export { EQUIPMENT, STATS };
