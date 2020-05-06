import { useGlobal, useDispatch, useEffect } from 'reactn';

let timeouts = {};

export default () => {
  const [notifications] = useGlobal('notifications');
  const { removeNotification } = useDispatch();

  useEffect(() => {
    const notification = notifications[notifications.length - 1];
    if (!notification) return;

    timeouts[notification.key] = setTimeout(() => {
      removeNotification(notification.key);

      clearTimeout(timeouts[notification.key]);
      delete timeouts[notification.key];
    }, 5000);
  }, [notifications]);

  return (
    <div className='notifications'>
      {notifications.map((notification) => (
        <div key={notification.key} className='notification'>
          {notification.title}
        </div>
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
