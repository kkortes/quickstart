import lodash from 'lodash';
import { STORE_STATE } from '@shared/consts/SOCKET_ACTIONS.js';
import { STATE_STORED } from '@shared/consts/NOTIFICATIONS.js';
import { request } from './socket';
const { debounce, pickBy, pick } = lodash;

let lastStoredState = {};

const isDifferentThanLastStored = (v, k) =>
  JSON.stringify(v) !== JSON.stringify(lastStoredState[k]);

const storeState = async (data, notify, store) => {
  const { token } = store;

  const dirtyKeys = Object.keys(pickBy(data, isDifferentThanLastStored));

  if (!dirtyKeys.length) return;

  const update = pick(data, dirtyKeys);
  const payload = {
    id: token,
    update,
  };

  let response;
  try {
    response = await request(STORE_STATE, payload);
    notify(STATE_STORED);
    lastStoredState = data;
  } catch (error) {
    notify(error);
  }

  return response;
};

const storeStateWithDebounce = debounce(storeState, 2000, {
  maxWait: 20000,
});

export { storeStateWithDebounce, storeState };
