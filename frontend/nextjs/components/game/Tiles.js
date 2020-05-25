import React, { memo } from 'reactn';
// import whyDidYouRender from '@welldone-software/why-did-you-render';
// whyDidYouRender(React, {
//   onlyLogs: false,
//   titleColor: 'green',
//   diffNameColor: 'darkturquoise',
// });
import { isEmpty } from 'lodash';
import EntityLink from './EntityLink';
import { entityOnLocation } from '../../game/entities';

const Tiles = ({ tiles, TILE_SIZE }) => (
  <>
    {tiles.map(({ x, y, style }) => {
      const entity = entityOnLocation(x, y);

      return (
        <div key={`tile_${x}_${y}`} className='tile'>
          <div className='background' style={style} />
          <div className='inner'>
            {/* {x}, {y}
            <br /> */}
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
        }
      `}
    </style>
    <style jsx>{`
      .background {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        background-size: 900% auto;
        pointer-events: none;
      }
      .tile {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: cover;
        color: #fff;
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

// Tiles.whyDidYouRender = true;

export default memo(Tiles);
