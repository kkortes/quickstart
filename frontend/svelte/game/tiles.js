import { TILE_AMOUNT } from '../constants/WORLD';
import SimplexNoise from 'simplex-noise';
import randomNumber from '../common/randomNumber';
import lodash from 'lodash';
const { times, isEmpty, range } = lodash;

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
      a,
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
  let position = biomes.nature.generate(noise);

  if (noise < 1) {
    position = biomes.nature.generate(noise, -1);
  }
  if (noise < 0.8) {
    position = biomes.nature.generate(noise, -1);
  }
  if (noise < 0.6) {
    position = biomes.nature.generate(noise, +1);
  }
  if (noise < 0.4) {
    position = biomes.nature.generate(noise, +1);
  }
  if (noise < 0.2) {
    position = biomes.nature.generate(noise);
  }
  if (noise < 0) {
    position = biomes.nature.generate(noise);
  }
  if (noise < -0.2) {
    position = biomes.nature.generate(noise);
  }
  if (noise < -0.4) {
    position = biomes.nature.generate(noise);
  }
  if (noise < -0.6) {
    position = biomes.nature.generate(noise, +1);
  }
  if (noise < -0.8) {
    position = biomes.nature.generate(noise, -1);
  }

  return {
    style: `background-image: url(./static/world-map-min.png);
      background-position: -${position.x}px -${position.y}px;
      height: 200%;
    `,
    spriteCordinates: {
      x: position.x,
      y: position.y,
    },
  };
};

const makeTile = (x, y) => {
  const noise = simplex.noise2D(x / 10, y / 10);

  const { style, spriteCordinates } = generateBackground(noise);

  return {
    x,
    y,
    style,
    zIndex: y,
    spriteCordinates,
    id: `${x}_${y}`,
  };
};

const initializeTile = (index, xOffset, yOffset) => {
  const tiles = Math.sqrt(TILE_AMOUNT);
  const column = (index % tiles) - (tiles - 1) / 2;
  const row = Math.floor(index / tiles) - (tiles - 1) / 2;

  const x = column + xOffset;
  const y = row + yOffset;

  return makeTile(x, y);
};

let tiles = {};
let cX = 0;
let cY = 0;
const makeTiles = (x, y) => {
  const ws = Math.sqrt(TILE_AMOUNT);
  const lessHalf = Math.floor(ws / 2);
  const greaterHalf = Math.ceil(ws / 2);

  if (isEmpty(tiles)) {
    tiles = times(TILE_AMOUNT, (index) => initializeTile(index, x, y)).reduce(
      (a, tile) => ({ ...a, [tile.id]: tile }),
      {}
    );
  }

  if (cY !== y) {
    range(x - lessHalf, x + greaterHalf).forEach((x) => {
      const addY = y - (cY > y ? lessHalf : -lessHalf);
      tiles[`${x}_${addY}`] = makeTile(x, addY);

      const removeY = y + (cY > y ? greaterHalf : -greaterHalf);
      delete tiles[`${x}_${removeY}`];
    });
  }

  if (cX !== x) {
    range(y - lessHalf, y + greaterHalf).forEach((y) => {
      const addX = x - (cX > x ? lessHalf : -lessHalf);
      tiles[`${addX}_${y}`] = makeTile(addX, y);

      const removeX = x + (cX > x ? greaterHalf : -greaterHalf);
      delete tiles[`${removeX}_${y}`];
    });
  }

  cY = y;
  cX = x;

  return tiles;
};

export { initializeTile, makeTile, makeTiles };
