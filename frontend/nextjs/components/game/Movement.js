import useKeyPress from '../../hooks/useKeyPress';
import { useDispatch, useGlobal } from 'reactn';
import { TILE_SIZE } from '../../constants/WORLD';
import useInterval from '../../hooks/useInterval';
import { entityOnLocation } from '../../game/entities';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import useGameLoop from '../../hooks/useGameLoop';

export default () => {
  const [
    {
      fromCenter,
      account: {
        stats: { movementSpeed },
        position,
      },
    },
  ] = useGlobal();
  const { setFromCenter, setPosition, pickUpEntity } = useDispatch();

  const up = useKeyPress('w');
  const right = useKeyPress('d');
  const down = useKeyPress('s');
  const left = useKeyPress('a');
  const isMoving = up || right || down || left;

  useGameLoop(() => {
    const h = up || down;
    const v = right || left;

    const value = (h && v ? 10 : 10) * (movementSpeed + 1);

    const { vertical, horizontal, x, y } = fromCenter;
    // console.log(fromCenter);

    const futureHorizontal = horizontal - (left ? -value : right ? value : 0);
    const futureVertical = vertical - (up ? -value : down ? value : 0);

    const HM = futureHorizontal / TILE_SIZE;
    const VM = futureVertical / TILE_SIZE;

    if (HM <= -0.5 || HM >= 0.5 || VM <= -0.5 || VM >= 0.5) {
      const newX = HM <= -0.5 ? x + 1 : HM >= 0.5 ? x - 1 : x;
      const newY = VM <= -0.5 ? y + 1 : VM >= 0.5 ? y - 1 : y;

      if (position.x !== newX || position.y !== newY) {
        const entity = entityOnLocation(newX, newY);

        if (!isEmpty(entity)) {
          pickUpEntity({
            entityRef: entity.ref,
            pickId: `${newX}_${newY}_${entity.tier}`,
          });
        }

        setPosition({ x: newX, y: newY });
      }
    } else if (position.x !== x || position.y !== y) {
      setPosition({ x, y });
    }

    if (HM <= -1 || HM >= 1 || VM <= -1 || VM >= 1) {
      setFromCenter({
        horizontal: futureHorizontal % TILE_SIZE,
        vertical: futureVertical % TILE_SIZE,
        x: HM <= -1 ? x + 1 : HM >= 1 ? x - 1 : x,
        y: VM <= -1 ? y + 1 : VM >= 1 ? y - 1 : y,
      });
    } else {
      setFromCenter({
        vertical: futureVertical,
        horizontal: futureHorizontal,
        x,
        y,
      });
    }
  }, [isMoving]);

  // useInterval(
  //   () => {
  //     const h = up || down;
  //     const v = right || left;

  //     const value = (h && v ? 2 : 2) * (movementSpeed + 1);

  //     const { vertical, horizontal, x, y } = fromCenter;

  //     const futureHorizontal = horizontal - (left ? -value : right ? value : 0);
  //     const futureVertical = vertical - (up ? -value : down ? value : 0);

  //     const HM = futureHorizontal / TILE_SIZE;
  //     const VM = futureVertical / TILE_SIZE;

  //     // if (HM <= -0.5 || HM >= 0.5 || VM <= -0.5 || VM >= 0.5) {
  //     //   const newX = HM <= -0.5 ? x + 1 : HM >= 0.5 ? x - 1 : x;
  //     //   const newY = VM <= -0.5 ? y + 1 : VM >= 0.5 ? y - 1 : y;

  //     //   if (position.x !== newX || position.y !== newY) {
  //     //     const entity = entityOnLocation(newX, newY);

  //     //     if (!isEmpty(entity)) {
  //     //       pickUpEntity({
  //     //         entityRef: entity.ref,
  //     //         pickId: `${newX}_${newY}_${entity.tier}`,
  //     //       });
  //     //     }

  //     //     setPosition({ x: newX, y: newY });
  //     //   }
  //     // } else if (position.x !== x || position.y !== y) {
  //     //   setPosition({ x, y });
  //     // }

  //     if (HM <= -1 || HM >= 1 || VM <= -1 || VM >= 1) {
  //       setFromCenter({
  //         horizontal: futureHorizontal % TILE_SIZE,
  //         vertical: futureVertical % TILE_SIZE,
  //         x: HM <= -1 ? x + 1 : HM >= 1 ? x - 1 : x,
  //         y: VM <= -1 ? y + 1 : VM >= 1 ? y - 1 : y,
  //       });
  //     } else {
  //       setFromCenter({
  //         vertical: futureVertical,
  //         horizontal: futureHorizontal,
  //         x,
  //         y,
  //       });
  //     }
  //   },
  //   isMoving ? 1000 / 60 : null
  // );

  return null;
};
