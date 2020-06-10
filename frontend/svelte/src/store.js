import { writable } from 'svelte/store';

const INITIAL_STORE = {
  playerName: 'nothing',
  points: 0,
};

const store = writable(INITIAL_STORE);

const reducers = {
  setNameAndPoints: (_payload, store, { setPoints, setName }) => {
    console.log(setPoints);
    return {
      ...store,
      // Solve this case
      ...setPoints({ points: 1337 }),
      ...setName({ playerName: 'hercules' }),
    };
  },
  setPoints: ({ points }, store) => {
    return {
      ...store,
      points,
    };
  },
  setName: ({ playerName }, store) => {
    return {
      ...store,
      playerName,
    };
  },
  resetAll: () => {
    return INITIAL_STORE;
  },
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
            addActionsRecursively({ ...st, ...ns })
          )
        ),
    }),
    {}
  );
});

export { store, actions };
