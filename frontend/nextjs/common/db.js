import { debounce, pickBy, pick } from 'lodash';
// import config from '../config';

let lastStoredState = {};

const isDifferentThanLastStored = (v, k) =>
  JSON.stringify(v) !== JSON.stringify(lastStoredState[k]);

const storeState = async (data) => {
  const dirtyKeys = Object.keys(pickBy(data, isDifferentThanLastStored));

  if (!dirtyKeys.length) return;

  const update = pick(data, dirtyKeys);
  const payload = {
    id: 'someid',
    update,
  };

  try {
    console.log(payload);
    await socket.request('storeState', payload);
    /// await axios.post(`${config.endpoint.api}/gameState`, payload);
    lastStoredState = data;
  } catch (error) {
    console.error(error);
  }
};

const storeStateWithDebounce = debounce(storeState, 2000, {
  maxWait: 20000,
});

export { storeStateWithDebounce, storeState };
