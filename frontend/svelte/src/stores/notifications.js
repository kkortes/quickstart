import { writable } from 'svelte/store';
import uuid from 'short-uuid';

const key = Symbol();

const notifications = writable([]);

const notify = ({ title, text, type }) =>
  notifications.update((notifications) => [
    ...notifications,
    {
      key: uuid.generate(),
      title,
      text,
      type,
    },
  ]);

const removeNotification = (key) =>
  notifications.update((notifications) =>
    notifications.filter((notification) => notification.key !== key)
  );

export { key, notifications, notify, removeNotification };
