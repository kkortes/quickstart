import { TILE_AMOUNT } from '../../constants/WORLD';
import SimplexNoise from 'simplex-noise';
import { randomNumber } from '../../../../universal/helpers';
import seedrandom from 'seedrandom';

const simplex = new SimplexNoise('testar');

const getRow = (row) => row * 400;

const biomes = {
  nature: {
    generate: (seed, mod = 0) => ({
      x: randomNumber(0, 3, seed) * 200,
      y: getRow(4 + mod),
    }),
  },
  desert: {
    generate: (seed, mod = 0) => ({
      x: randomNumber(1, 3, seed) * 200,
      y: getRow(1 + mod),
    }),
  },
  snow: {
    generate: (seed, mod = 0) => ({
      x: randomNumber(0, 3, seed) * 200,
      y: getRow(7 + mod),
    }),
  },
  wasteland: {
    generate: (seed, mod = 0) => ({
      x: randomNumber(0, 3, seed) * 200,
      y: getRow(10 + mod),
    }),
  },
  water: {
    generate: (seed, mod = 0) => ({
      x: randomNumber(0, 3, seed) * 200,
      y: getRow(12 + mod),
    }),
  },
  dryland: {
    generate: (seed, mod = 0) => ({
      x: randomNumber(0, 3, seed) * 200,
      y: getRow(15 + mod),
    }),
  },
};

const generateBackground = (noise) => {
  const seed = seedrandom(noise)();

  let position = biomes.nature.generate(seed);

  if (noise < 1) {
    position = biomes.nature.generate(seed, -1);
  }
  if (noise < 0.8) {
    position = biomes.nature.generate(seed, -1);
  }
  if (noise < 0.6) {
    position = biomes.nature.generate(seed, +1);
  }
  if (noise < 0.4) {
    position = biomes.nature.generate(seed, +1);
  }
  if (noise < 0.2) {
    position = biomes.nature.generate(seed);
  }
  if (noise < 0) {
    position = biomes.nature.generate(seed);
  }
  if (noise < -0.2) {
    position = biomes.nature.generate(seed);
  }
  if (noise < -0.4) {
    position = biomes.nature.generate(seed);
  }
  if (noise < -0.6) {
    position = biomes.nature.generate(seed, +1);
  }
  if (noise < -0.8) {
    position = biomes.nature.generate(seed, -1);
  }

  return {
    backgroundImage: 'url(./static/world-map-min.png)',
    backgroundPosition: `-${position.x}px -${position.y}px`,
    height: '200%',
    background: position,
  };
};

export default (index, xOffset, yOffset) => {
  const tiles = Math.sqrt(TILE_AMOUNT);
  const column = (index % tiles) - (tiles - 1) / 2;
  const row = Math.floor(index / tiles) - (tiles - 1) / 2;

  const x = column + xOffset;
  const y = row + yOffset;
  const noise = simplex.noise2D(x / 10, y / 10);

  return {
    x,
    y,
    style: generateBackground(noise),
  };
};
