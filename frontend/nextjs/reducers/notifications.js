import uuid from 'short-uuid';

export default (notifications, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'notify':
      return notifications.concat({
        key: uuid.generate(),
        title: payload.title,
      });
    // case "removeByIndex":
    // return [
    //   ...notifications.slice(0, payload),
    //   ...notifications.slice(payload + 1)
    // ];
    case 'clearNotifications':
      return notifications;
    case 'removeNotification':
      return notifications.filter(
        (notification) => notification.key !== payload.key
      );
    default:
      return notifications;
  }
};
