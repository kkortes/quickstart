import seedrandom from 'seedrandom';

export default (min, max, factor = Math.random()) =>
  Math.floor(seedrandom(factor)() * (max - min + 1)) + min;
