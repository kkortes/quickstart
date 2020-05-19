import { PERSPECTIVE, ROTATEX, WORLD_SIZE } from '../../constants/WORLD';

export default () => (
  <div className='player'>
    <div className='frame'>
      <div className='radius' />
      <div className='character' />
    </div>

    <style jsx>{`
      .frame {
        transform: rotateX(${ROTATEX}) translate3d(-50%, -50%, 0px);
      }
      .player {
        perspective: ${PERSPECTIVE};
      }
    `}</style>
    <style jsx>{`
      .frame {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        top: 50%;
        left: 50%;
        width: ${WORLD_SIZE}px;
        height: ${WORLD_SIZE}px;
      }
      .character,
      .radius {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .character {
        background-color: green;
      }
      .radius {
        width: 400px;
        height: 400px;
        border: 1px solid rgba(255, 255, 255, 0.9);
      }
      .player {
        position: fixed;
        top: -25vh;
        right: 0;
        left: 0;
        bottom: 0;
        pointer-events: none;
      }
    `}</style>
  </div>
);
