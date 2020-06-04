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
import makeTile from '../../game/makeTile';
const { times } = lodash;

// whyDidYouRender(React, {
//   onlyLogs: false,
//   titleColor: 'green',
//   diffNameColor: 'darkturquoise',
// });

const transformation = ({ horizontal, vertical }) => ({
  transform: `rotateX(${ROTATEX}) translate3d(-${
    WORLD_SIZE / 2 - horizontal
  }px, -${WORLD_SIZE / 2 - vertical}px, 0px)`,
});

const World = () => {
  const [{ fromCenter }] = useGlobal();

  const tiles = useMemo(() =>
    times(TILE_AMOUNT, (index) => makeTile(index, fromCenter.x, fromCenter.y))
  );

  return (
    <div className='world-frame'>
      <div className='world' style={transformation(fromCenter)}>
        <Tiles tiles={tiles} />
      </div>
      {/* <div className='fog'>
        <div className='top' />
        <div className='right' />
        <div className='left' />
      </div> */}
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
        .fog {
          position: fixed;
          top: 50%;
          right: 0;
          left: 50%;
          bottom: 0;
          pointer-events: none;
          transform: rotateX(20deg) translate(-50%, -50%);
          width: ${WORLD_SIZE * 1.2}px;
          height: ${WORLD_SIZE}px;
        }
        .top {
          position: absolute;
          top: -15%;
          bottom: 90%;
          left: 0;
          right: 0;
          background: linear-gradient(#000000 90%, transparent);
        }
        .left {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 82.5%;
          right: 0;
          background: linear-gradient(to right, transparent, #000000 10%);
        }
        .right {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 82.5%;
          background: linear-gradient(to left, transparent, #000000 10%);
        }
      `}</style>
    </div>
  );
};

// World.whyDidYouRender = true;

export default memo(World);
