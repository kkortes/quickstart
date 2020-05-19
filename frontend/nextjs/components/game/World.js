//import whyDidYouRender from '@welldone-software/why-did-you-render';
import lodash from 'lodash';
import React, { useGlobal, memo, useMemo } from 'reactn';
import Tiles from './Tiles';
import {
  ROTATEX,
  PERSPECTIVE,
  TILE_AMOUNT,
  TILE_SIZE,
  WORLD_SIZE,
} from '../../constants/WORLD';
import makeTile from './makeTile';
const { times } = lodash;

// whyDidYouRender(React, {
//   onlyLogs: false,
//   titleColor: 'green',
//   diffNameColor: 'darkturquoise',
// });

const transformation = ({ horizontal, vertical, reset }) => ({
  transform: `rotateX(${ROTATEX}) translate3d(-${
    WORLD_SIZE / 2 - horizontal
  }px, -${WORLD_SIZE / 2 - vertical}px, 0px)`,
  // transition: !reset ? 'transform 60ms linear' : '',
});

const World = () => {
  const [{ fromCenter, position }] = useGlobal();

  const tiles = useMemo(
    () =>
      times(TILE_AMOUNT, (index) => makeTile(index, position.x, position.y)),
    [position]
  );

  return (
    <div className='world-frame'>
      <div className='world' style={transformation(fromCenter)}>
        <Tiles tiles={tiles} TILE_SIZE={TILE_SIZE} />
      </div>
      <style jsx>{`
        .world-frame {
          perspective: ${PERSPECTIVE};
        }
        .world {
          width: ${WORLD_SIZE}px;
          height: ${WORLD_SIZE}px;
        }
      `}</style>
      <style jsx>{`
        .world-frame {
          position: fixed;
          top: -25vh;
          left: 0;
          bottom: 0;
          right: 0;
        }
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

// World.whyDidYouRender = true;

export default memo(World);
