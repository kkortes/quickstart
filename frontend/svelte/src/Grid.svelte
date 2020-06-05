<script>
  import { TILE_AMOUNT, TILE_SIZE } from "../constants/WORLD.js";
  import { renderable, width, height } from "../game/game.js";
  import { getContext } from "svelte";
  import { makeTiles } from "../game/tiles.js";
  import { key } from "./fromCenter.js";
  import lodash from "lodash";
  const { times } = lodash;

  let fromCenter = getContext(key);

  let color = "black";
  let sprite = new Image();
  sprite.src = "./static/world-map_2.png";

  // TODO: check if potentional bug, sprite.onload might have to be called
  renderable(props => {
    const { context, width, height } = props;
    context.clearRect(0, 0, width, height);

    if (color) {
      context.fillStyle = color;
      context.fillRect(0, 0, width, height);
    }

    Object.values(makeTiles($fromCenter.x, $fromCenter.y)).forEach(value => {
      const { spriteCordinates, x, y } = value;
      context.drawImage(
        sprite,
        spriteCordinates.x,
        spriteCordinates.y,
        200,
        400,
        x * 200 +
          width / 2 -
          100 -
          $fromCenter.x * 200 +
          $fromCenter.horizontal,
        y * 200 + height / 2 - 300 - $fromCenter.y * 200 + $fromCenter.vertical,
        200,
        400
      );
    });
  });
</script>

<slot />
