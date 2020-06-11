<script>
  import Icon from "./Icon.svelte";
  import { store, actions } from "../../store";
  const { removeNotification } = actions;
  const { notifications } = $store;

  let timeouts = {};

  const getStyle = color =>
    `background: linear-gradient(135deg, #fff, ${color} 300%)`;

  const getColor = type =>
    (type => {
      switch (type) {
        case "success":
          return "#008000";
        case "error":
          return "#FF0000";
        case "info":
        default:
          return "#CCCC00";
      }
    })(type);

  $: notificationsToRender = $store.notifications.map(notification => {
    const color = getColor(notification.type);
    return {
      ...notification,
      style: getStyle(color),
      color
    };
  });

  $: {
    const notification = $store.notifications[$store.notifications.length - 1];
    if (notification) {
      timeouts[notification.key] = setTimeout(() => {
        removeNotification(notification.key);

        clearTimeout(timeouts[notification.key]);
        delete timeouts[notification.key];
      }, 5000);
    }
  }
</script>

<style>
  .notifications :global(.icon) {
    margin-right: 14px;
  }
  .content {
    overflow: hidden;
    letter-spacing: 1px;
  }
  span {
    display: inline-block;
    color: gray;
  }
  span::first-letter {
    text-transform: uppercase;
  }
  .notification {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px 16px 14px 16px;
    border-radius: 2px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
    opacity: 0;
    transition-property: opacity, transform;
    transition-duration: 250ms;
  }
  .notifications {
    position: fixed;
    left: 20px;
    right: 20px;
    bottom: 20px;
    pointer-events: none;
  }
  .notification:nth-last-child(4) {
    opacity: 0.1;
    transform: translateY(calc(-300% - 30px));
  }
  .notification:nth-last-child(3) {
    opacity: 0.25;
    transform: translateY(calc(-200% - 20px));
  }
  .notification:nth-last-child(2) {
    opacity: 0.5;
    transform: translateY(calc(-100% - 10px));
  }
  .notification:nth-last-child(1) {
    opacity: 1;
  }
  .animate-enter {
    opacity: 0.01;
    transform: translateY(100%);
  }
  .animate-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition-timing-function: ease-out;
  }
  .animate-exit {
    opacity: 1;
    transform: translateY(0);
  }
  .animate-exit-active {
    opacity: 0.01;
    transform: translateY(100%);
  }
</style>

<div class="notifications">
  {#each notificationsToRender as { key, title, text, type, color, style } (key)}
    <div class="notification" {style}>
      <Icon name={type} size={24} {color} />
      <div class="content">
        <h3>{title}</h3>
        <span>{text}</span>
      </div>
    </div>
  {/each}
</div>
