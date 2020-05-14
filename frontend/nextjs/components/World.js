import whyDidYouRender from '@welldone-software/why-did-you-render';
import lodash from 'lodash';
import React, { useGlobal, useDispatch, useEffect } from 'reactn';
import WorldTiles from './WorldTiles';
const { times } = lodash;

whyDidYouRender(React, {
  onlyLogs: false,
  titleColor: 'green',
  diffNameColor: 'darkturquoise',
});

const TILE_AMOUNT = 9; // 81;
const TILE_SIZE = 60;

const makeTile = (index) => {
  const tiles = Math.sqrt(TILE_AMOUNT);
  const column = (index % tiles) - (tiles - 1) / 2;
  const row = Math.floor(index / tiles) - (tiles - 1) / 2;

  return {
    x: column,
    y: row,
  };
};

const offsetPosition = (position, { xOffset, yOffset }) => ({
  ...position,
  x: position.x + xOffset,
  y: position.y + yOffset,
});

const transformation = (worldSize, { horizontal, vertical }) => ({
  transform: `translate3d(-${worldSize / 2 - horizontal}px, -${
    worldSize / 2 - vertical
  }px, 0px)`,
});

const World = () => {
  const worldSize = Math.sqrt(TILE_AMOUNT) * TILE_SIZE;
  const { setFromCenter, setPosition } = useDispatch();
  const [{ fromCenter, position }] = useGlobal();

  const tiles = times(TILE_AMOUNT, makeTile).map((tile) =>
    offsetPosition(tile, {
      xOffset: position.x,
      yOffset: position.y,
    })
  );

  useEffect(() => {
    const { horizontal, vertical } = fromCenter;
    const HM = horizontal / TILE_SIZE;
    const VM = vertical / TILE_SIZE;

    if (HM <= -1 || HM >= 1 || VM <= -1 || VM >= 1) {
      setPosition({
        x: HM <= -1 ? position.x + 1 : HM >= 1 ? position.x - 1 : position.x,
        y: VM <= -1 ? position.y + 1 : VM >= 1 ? position.y - 1 : position.y,
      });
      setFromCenter({
        horizontal: 0 + (horizontal % TILE_SIZE),
        vertical: 0 + (vertical % TILE_SIZE),
      });
    }
  }, [fromCenter]);

  return (
    <div className='world' style={transformation(worldSize, fromCenter)}>
      <WorldTiles tiles={tiles} TILE_SIZE={TILE_SIZE} />
      <style jsx>{`
        .world {
          width: ${worldSize}px;
          height: ${worldSize}px;
        }
      `}</style>
      <style jsx>{`
        .world {
          display: flex;
          flex-wrap: wrap;
          position: fixed;
          top: 50%;
          left: 50%;
        }
      `}</style>
    </div>
  );
};

World.whyDidYouRender = true;

export default World;
