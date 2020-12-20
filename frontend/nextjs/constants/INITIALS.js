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
  health: 0,
  damage: 0,
  armor: 0,
  dodgeChance: 0,
  blockChance: 0,
  criticalChance: 0,
  criticalDamage: 0,
  attackSpeed: 0,
  movementSpeed: 0,
  range: 0,
  resistances: RESISTANCES,
};

const EQUIPMENT = {
  armor: {},
  mainHand: {},
  offHand: {},
  accessory: {},
};

export { EQUIPMENT, STATS };
