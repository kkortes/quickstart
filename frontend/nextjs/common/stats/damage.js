// const Damage = {
//   // formulaAsString: '(tier * 5)',
//   // max:
// };

function Damage(name) {
  this.name = name;
  this.max = Infinity;
  this.formula = '(tier * 5)';
  this.calcByTier = (tier) => {
    return tier * 5;
  };
}

export default Damage;
