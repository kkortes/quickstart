import { writable } from 'svelte/store';
import lodash from 'lodash';
const { isEmpty } = lodash;

const store = writable({
  playerName: 'nothing',
  points: 0,
});

const reducers = {
  toggleBoth: (store, _payload, _actions) => {
    return {
      ...store,
      points: 1337,
      playerName: 'hercules',
    };
  },
  togglePoints: (store, _payload, actions) => {
    return {
      ...actions.toggleBoth(),
      points: store.points === 0 ? 2 : 0,
    };
  },
  toggleName: (_store, payload, _actions) => {
    return {
      ...togglePoints('hehe'),
      playerName: payload.playerName,
    };
  },
};

let actions = {};
store.subscribe((st) => {
  const bareActions = Object.entries(reducers).reduce(
    (a, [action, reducer]) => ({
      ...a,
      [action]: (store, payload, actions = {}) =>
        reducer(store, payload, actions),
    }),
    {}
  );

  const cleanActions = (store) =>
    Object.entries(bareActions).reduce(
      (a, [action, reducer]) => ({
        ...a,
        [action]: (payload) =>
          reducer(store, payload, isEmpty(store) ? {} : cleanActions()),
      }),
      {}
    );

  actions = Object.entries(bareActions).reduce(
    (a, [action, reducer]) => ({
      ...a,
      [action]: (payload) =>
        store.update((ns) =>
          reducer({ ...st, ...ns }, payload, cleanActions({ ...st, ...ns }))
        ),
    }),
    {}
  );
});

export { store, actions };
