import { writable } from 'svelte/store';

const INITIAL_STORE = {
  playerName: 'nothing',
  points: 0,
  fromCenter: {
    x: 0,
    y: 0,
  },
};

const store = writable(INITIAL_STORE);

const reducers = {
  increaseX: (_payload, { fromCenter }) => ({
    fromCenter: {
      ...fromCenter,
      x: fromCenter.x + 1,
    },
  }),
  setNameAndPoints: (_payload, _store, { setPoints, setName }) => ({
    ...setPoints({ points: 1337 }),
    ...setName({ playerName: 'hercules' }),
  }),
  setPoints: ({ points }, store) => ({
    points,
  }),
  setName: ({ playerName }, store) => ({
    playerName,
  }),
  resetAll: () => INITIAL_STORE,
};

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
