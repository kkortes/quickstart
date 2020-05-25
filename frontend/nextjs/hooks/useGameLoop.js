import { useRef, useEffect } from 'reactn';

export default (callback, trigger) => {
  const requestID = useRef();
  const previousTime = useRef();

  const loop = (time) => {
    if (previousTime.current !== undefined) {
      const deltaTime = time - previousTime.current;
      callback(time, deltaTime);
    }

    previousTime.current = time;
    requestID.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    requestID.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(requestID.current);
  }, [trigger]);
};
