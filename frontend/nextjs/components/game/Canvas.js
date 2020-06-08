import { useRef, useGlobal, memo } from 'reactn';
import useWindowResize from '../../hooks/useWindowResize';
import useGameLoop from '../../hooks/useGameLoop';
import { WORLD_SIZE, ROTATEX } from '../../constants/WORLD';

const Canvas = ({ tiles }) => {
  const canvasRef = useRef();
  const refX = useRef();
  const refY = useRef();
  const { width, height } = useWindowResize();
  const [{ fromCenter }] = useGlobal();

  let sprite = new Image();
  sprite.src = './static/world-map.png';

  useGameLoop(() => {
    const context = canvasRef.current.getContext('2d', {});
    context.save();

    context.clearRect(0, 0, WORLD_SIZE, WORLD_SIZE);

    Object.values(tiles).forEach((value) => {
      const {
        style: { spriteCordinates },
        x,
        y,
      } = value;

      context.drawImage(
        sprite,
        spriteCordinates.x,
        spriteCordinates.y,
        200,
        400,
        x * 200 +
          WORLD_SIZE / 2 -
          100 -
          fromCenter.x * 200 +
          fromCenter.horizontal,
        y * 200 +
          WORLD_SIZE / 2 -
          300 -
          fromCenter.y * 200 +
          fromCenter.vertical,
        200,
        400
      );
    });

    context.restore();

    refX.current = fromCenter.x;
    refY.current = fromCenter.y;
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={`${WORLD_SIZE}px`}
        height={`${WORLD_SIZE}px`}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </>
  );
};

export default memo(Canvas);
