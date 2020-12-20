import { debounce, pickBy, pick } from 'lodash';
import { STORE_STATE } from '../universal/SOCKET_ACTIONS';
import { getGlobal } from 'reactn';
import { STATE_STORED } from '../universal/NOTIFICATIONS';

let lastStoredState = {};

const isDifferentThanLastStored = (v, k) =>
  JSON.stringify(v) !== JSON.stringify(lastStoredState[k]);

const storeState = async (data, notify) => {
  const { socket, token } = getGlobal();

  const dirtyKeys = Object.keys(pickBy(data, isDifferentThanLastStored));

  if (!dirtyKeys.length) return;

  const update = pick(data, dirtyKeys);
  const payload = {
    id: token,
    update,
  };

  const response = await socket.request(STORE_STATE, payload);

  if (response.type === 'error') {
    notify(response);
  } else {
    notify(STATE_STORED);
    lastStoredState = data;
  }

  return response;
};

const storeStateWithDebounce = debounce(storeState, 2000, {
  maxWait: 20000,
});

export { storeStateWithDebounce, storeState };
