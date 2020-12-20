import { TILE_AMOUNT } from '../constants/WORLD.js';
import SimplexNoise from 'simplex-noise';
import randomNumber from '../common/randomNumber.js';
import lodash from 'lodash';
import produce from 'immer';
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

const makeInitialTiles = (xOffset, yOffset) =>
  times(TILE_AMOUNT, (index) => {
    const tiles = Math.sqrt(TILE_AMOUNT);
    const column = (index % tiles) - (tiles - 1) / 2;
    const row = Math.floor(index / tiles) - (tiles - 1) / 2;

    const x = column + xOffset;
    const y = row + yOffset;

    return makeTile(x, y);
  }).reduce((a, tile) => ({ ...a, [`${tile.x}_${tile.y}`]: tile }), {});

const regenerate = (tiles, oX, oY, x, y) =>
  isEmpty(tiles)
    ? makeInitialTiles(x, y)
    : produce(tiles, (tempTiles) => {
        const WORLD_LENGTH = Math.sqrt(TILE_AMOUNT);
        const lessHalf = Math.floor(WORLD_LENGTH / 2);
        const greaterHalf = Math.ceil(WORLD_LENGTH / 2);
        if (oX !== x) {
          range(y - lessHalf, y + greaterHalf).forEach((y) => {
            const addX = x - (oX > x ? lessHalf : -lessHalf);
            tempTiles[`${addX}_${y}`] = makeTile(addX, y);

            const removeX = x + (oX > x ? greaterHalf : -greaterHalf);
            delete tempTiles[`${removeX}_${y}`];
          });
        }
        if (oY !== y) {
          range(x - lessHalf, x + greaterHalf).forEach((x) => {
            const addY = y - (oY > y ? lessHalf : -lessHalf);
            tempTiles[`${x}_${addY}`] = makeTile(x, addY);

            const removeY = y + (oY > y ? greaterHalf : -greaterHalf);
            delete tempTiles[`${x}_${removeY}`];
          });
        }

        if (oY !== y && oX !== x) {
          const extra = tiles.length / 2;

          const gh = greaterHalf + extra;
          const removeX = x + (oX > x ? gh : -gh);
          const removeY = y + (oY > y ? greaterHalf : -greaterHalf);

          delete tempTiles[`${removeX}_${removeY}`];
        }
      });

export { makeTile, makeInitialTiles, regenerate };
