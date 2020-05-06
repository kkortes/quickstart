import useStore from '../hooks/useStore';
import { useEffect } from 'react';

let timeouts = {};

export default () => {
  const [{ notifications }, dispatch] = useStore();

  useEffect(() => {
    const notification = notifications[notifications.length - 1];
    if (!notification) return;

    timeouts[notification.key] = setTimeout(() => {
      dispatch({
        type: 'removeNotification',
        payload: {
          key: notification.key,
        },
      });
      clearTimeout(timeouts[notification.key]);
      delete timeouts[notification.key];
    }, 5000);
  }, [notifications]);

  return (
    <div className='notifications'>
      {notifications.map((notification) => (
        <div className='notification'>{notification.title}</div>
      ))}
      <style jsx>{`
        .notification {
          padding: 20px;
          text-align: right;
        }
        .notifications {
          position: fixed;
          left: 20px;
          right: 20px;
          bottom: 20px;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};
