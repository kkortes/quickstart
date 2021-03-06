import React, { memo, useGlobal } from 'reactn';
import whyDidYouRender from '@welldone-software/why-did-you-render';
whyDidYouRender(React, {
  onlyLogs: false,
  titleColor: 'green',
  diffNameColor: 'darkturquoise',
});
import { isEmpty } from 'lodash';
import EntityLink from './EntityLink';
import { entityOnLocation } from '../../game/entities';
import { TILE_SIZE, WORLD_SIZE } from '../../constants/WORLD';

const tileStyle = (x, y, fX, fY, zIndex) => ({
  left: `${(x - fX) * TILE_SIZE + WORLD_SIZE / 2 - TILE_SIZE / 2}px`,
  top: `${(y - fY) * TILE_SIZE + WORLD_SIZE / 2 - TILE_SIZE / 2}px`,
  zIndex,
});

const Tiles = ({ tiles }) => {
  const [{ fromCenter }] = useGlobal();
  return (
    <>
      {Object.values(tiles).map(({ x, y, style, zIndex }) => {
        const entity = entityOnLocation(x, y);

        return (
          <div
            key={`${x}_${y}`}
            className='tile'
            style={tileStyle(x, y, fromCenter.x, fromCenter.y, zIndex)}
          >
            <div className='background' style={style} />
            <div className='inner'>
              <br />
              {!isEmpty(entity) ? <EntityLink entity={entity} /> : ''}
            </div>
          </div>
        );
      })}
      <style jsx>
        {`
        .tile {
          width: ${TILE_SIZE}px;
          height: ${TILE_SIZE}px;
      `}
      </style>
      <style jsx>{`
        .background {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          pointer-events: none;
        }
        .tile {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          background-size: cover;
          color: #fff;
          position: absolute;
        }
        .inner {
          position: relative;
          text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.9);
          font-weight: 600;
        }
        .tile:hover .inner {
          opacity: 1;
        }
      `}</style>
    </>
  );
};

Tiles.whyDidYouRender = true;

export default memo(Tiles);
