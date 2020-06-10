import { writable } from 'svelte/store';

const store = writable({
  playerName: 'nothing',
  points: 0,
});

const reducers = {
  toggleBoth: (_payload, store, _actions) => {
    return {
      ...store,
      points: 1337,
      playerName: 'hercules',
    };
  },
  togglePoints: (_payload, store, { toggleBoth }) => {
    return {
      ...toggleBoth(),
      points: store.points === 0 ? 2 : 0,
    };
  },
  toggleName: (payload, _store, { togglePoints }) => {
    return {
      ...togglePoints('hehe'),
      playerName: payload.playerName,
    };
  },
};

const cleanActions = (store, repeat = false) =>
  Object.entries(reducers).reduce(
    (a, [action, reducer]) => ({
      ...a,
      [action]: (payload) =>
        reducer(payload, store, repeat ? cleanActions(store) : {}),
    }),
    {}
  );

let actions = {};

store.subscribe((st) => {
  actions = Object.entries(reducers).reduce(
    (a, [action, reducer]) => ({
      ...a,
      [action]: (payload) =>
        store.update((ns) =>
          reducer(
            payload,
            { ...st, ...ns },
            cleanActions({ ...st, ...ns }, true)
          )
        ),
    }),
    {}
  );
});

export { store, actions };
