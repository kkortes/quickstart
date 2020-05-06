import App from 'next/app';
import Meta from '../components/Meta';
import { StateProvider } from '../hooks/useStore';
import reducers from '../reducers/';
import { isEqual } from 'lodash';
import { storeStateWithDebounce } from '../common/db';

const database = {
  username: '',
};

const temporary = {
  notifications: [],
};

const cached = {
  rememberMe: false,
};

const initialState = {
  ...database,
  ...temporary,
  ...cached,
};

const mainReducer = (store, action) => {
  // const all = {
  //   notifications: notificationsReducer(notifications, action),
  // };

  // storeGameState(toStore);
  // storeGameStateWithDebounce(toStore);

  const databaseStorage = Object.keys(database).reduce(
    (a, key) =>
      console.log(key) || {
        ...a,
        [key]: reducers[key](store[key], action),
      },
    {}
  );

  if (!isEqual(databaseStorage, database)) {
    storeStateWithDebounce(databaseStorage);
  }

  return {
    ...databaseStorage,
    ...Object.keys(temporary).reduce(
      (a, key) => ({
        ...a,
        [key]: reducers[key](store[key], action),
      }),
      {}
    ),
    ...Object.keys(cached).reduce(
      (a, key) => ({
        ...a,
        [key]: reducers[key](store[key], action),
      }),
      {}
    ),
  };
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <StateProvider initialState={initialState} reducer={mainReducer}>
        <Meta>
          <Component {...pageProps} />
        </Meta>
      </StateProvider>
    );
  }
}

export default MyApp;
