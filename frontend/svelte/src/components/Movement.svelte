<script>
  import { renderable } from "../engine";
  import { TILE_SIZE } from "../constants/WORLD.js";
  import { store, actions } from "../store";
  const { setFromCenter, setPosition } = actions;

  let pressedKeys = [];

  const keyIsPressed = key => pressedKeys.find(pk => pk === key.toLowerCase());

  const handleKeydown = ({ key }) => {
    const pressed = key.toLowerCase();

    pressedKeys = !pressedKeys.find(pk => pk === pressed)
      ? [...pressedKeys, pressed]
      : pressedKeys;
  };
  const handleKeyup = ({ key }) => {
    const unpressed = key.toLowerCase();

    pressedKeys = pressedKeys.filter(pk => pk !== unpressed);
  };

  $: up = pressedKeys && keyIsPressed("w");
  $: right = pressedKeys && keyIsPressed("d");
  $: down = pressedKeys && keyIsPressed("s");
  $: left = pressedKeys && keyIsPressed("a");

  renderable(props => {
    const { context } = props;

    const h = up || down;
    const v = right || left;

    const s = h && v ? 15 : 15;

    const { vertical, horizontal, x, y } = $store.fromCenter;
    const futureHorizontal = horizontal - (left ? -s : right ? s : 0);
    const futureVertical = vertical - (up ? -s : down ? s : 0);
    const HM = futureHorizontal / TILE_SIZE;
    const VM = futureVertical / TILE_SIZE;

    if (HM <= -0.5 || HM >= 0.5 || VM <= -0.5 || VM >= 0.5) {
      const newX = HM <= -0.5 ? x + 1 : HM >= 0.5 ? x - 1 : x;
      const newY = VM <= -0.5 ? y + 1 : VM >= 0.5 ? y - 1 : y;

      if (
        $store.account.position.x !== newX ||
        $store.account.position.y !== newY
      ) {
        // const entity = entityOnLocation(newX, newY);

        // if (!isEmpty(entity)) {
        //   pickUpEntity({
        //     entityRef: entity.ref,
        //     pickId: `${newX}_${newY}_${entity.tier}`,
        //   });
        // }

        setPosition({ x: newX, y: newY });
      }
    } else if (
      $store.account.position.x !== x ||
      $store.account.position.y !== y
    ) {
      setPosition({ x, y });
    }

    if (HM <= -1 || HM >= 1 || VM <= -1 || VM >= 1) {
      setFromCenter({
        horizontal: futureHorizontal % TILE_SIZE,
        vertical: futureVertical % TILE_SIZE,
        x: HM <= -1 ? x + 1 : HM >= 1 ? x - 1 : x,
        y: VM <= -1 ? y + 1 : VM >= 1 ? y - 1 : y
      });
    } else {
      setFromCenter({
        vertical: futureVertical,
        horizontal: futureHorizontal,
        x,
        y
      });
    }
  });
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />
<slot />
