import useKeyPress from '../../hooks/useKeyPress';
import { useDispatch, useGlobal } from 'reactn';
import { TILE_SIZE } from '../../constants/WORLD';
import useInterval from '../../hooks/useInterval';

export default () => {
  const [
    {
      fromCenter,
      position,
      account: {
        stats: { movementSpeed },
      },
    },
  ] = useGlobal();
  const { setFromCenter, setPosition } = useDispatch();

  const up = useKeyPress('w');
  const right = useKeyPress('d');
  const down = useKeyPress('s');
  const left = useKeyPress('a');
  const isMoving = up || right || down || left;

  useInterval(
    () => {
      const h = up || down;
      const v = right || left;

      const value = (h && v ? 5 : 5) * movementSpeed;

      const { vertical, horizontal } = fromCenter;

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
          reset: true,
        });
      } else {
        setFromCenter({
          vertical: vertical - (up ? -value : down ? value : 0),
          horizontal: horizontal - (left ? -value : right ? value : 0),
          reset: false,
        });
      }
    },
    isMoving ? 10 : null
  );

  return null;
};
