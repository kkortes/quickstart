import App from 'next/app';
import Meta from '../components/Meta';
import { StateProvider } from '../hooks/useStore';
import notificationsReducer from '../reducers/notificationsReducer';

const initialState = {
  notifications: [],
};

const mainReducer = ({ notifications }, action) => {
  const fullStore = {
    notifications: notificationsReducer(notifications, action),
  };

  return fullStore;
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
