import reducers from './reducers.js';
import { writable } from 'svelte/store';
import INITIAL_STORE from './initialStore.js';

const store = writable({ ...INITIAL_STORE });

const addActionsRecursively = (store) =>
  Object.entries(reducers).reduce(
    (a, [action, reducer]) => ({
      ...a,
      [action]: (payload) =>
        reducer(payload, store, addActionsRecursively(store)),
    }),
    {}
  );

const { subscribe, update } = store;

let actions = {};

subscribe((st) => {
  actions = Object.entries(reducers).reduce(
    (a, [action, reducer]) => ({
      ...a,
      [action]: (payload) =>
        update((ns) => ({
          ...st,
          ...ns,
          ...reducer(
            payload,
            { ...st, ...ns },
            addActionsRecursively({ ...st, ...ns })
          ),
        })),
    }),
    {}
  );
});

export { store, actions };
