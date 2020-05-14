import { useEffect, useState, useDispatch, useGlobal } from 'reactn';
import useInterval from '../hooks/useInterval';

export default () => {
  const [keysPressed, setKeysPressed] = useState([]);
  const [isMoving, setIsMoving] = useState(false);
  const [{ fromCenter }] = useGlobal();
  const { setFromCenter } = useDispatch();

  const keydown = ({ key, repeat }) => {
    if (repeat) return;
    setKeysPressed((kp) => [...kp.filter((keyP) => keyP !== key), key]);
    setIsMoving(`${Math.random()}`);
  };

  const keyup = ({ key }) => {
    setKeysPressed((kp) => {
      const keys = kp.filter((keyP) => keyP !== key);

      if (!keys.length) {
        setIsMoving(false);
      } else {
        setIsMoving(`${Math.random()}`);
      }
      return keys;
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);

    return () => {
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('keyup', keyup);
    };
  }, [keysPressed]);

  useInterval(
    () => {
      const up = keysPressed.find((key) => key === 'w');
      const right = keysPressed.find((key) => key === 'd');
      const down = keysPressed.find((key) => key === 's');
      const left = keysPressed.find((key) => key === 'a');

      const h = up || down;
      const v = right || left;

      const value = h && v ? 1 : 1;

      const { vertical, horizontal } = fromCenter;

      setFromCenter({
        vertical: vertical - (up ? -value : down ? value : 0),
        horizontal: horizontal - (left ? -value : right ? value : 0),
      });
    },
    isMoving ? 1 : null
  );

  return null;
};
