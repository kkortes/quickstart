<script>
  import { TILE_AMOUNT, TILE_SIZE, WORLD_SIZE } from "../../constants/WORLD.js";
  import { renderable, width, height } from "../../game/game.js";
  import { getContext } from "svelte";
  import { makeTiles } from "../../game/tiles.js";
  import { key } from "../stores/fromCenter.js";
  import lodash from "lodash";
  import { compare } from "../common/helper.js";
  const { times } = lodash;

  let fromCenter = getContext(key);

  let color = "black";
  let sprite = new Image();
  sprite.src = "./static/world-map_2.png";

  // TODO: check if potentional bug, sprite.onloads might have to be called
  renderable(props => {
    const { context } = props;
    context.clearRect(0, 0, WORLD_SIZE, WORLD_SIZE);

    if (color) {
      context.fillStyle = color;
      context.fillRect(0, 0, WORLD_SIZE, WORLD_SIZE);
    }

    Object.values(makeTiles($fromCenter.x, $fromCenter.y))
      .sort((a, b) => compare(a.y, b.y))
      .forEach(value => {
        const { spriteCordinates, x, y } = value;
        context.drawImage(
          sprite,
          spriteCordinates.x,
          spriteCordinates.y,
          200,
          400,
          x * 200 +
            WORLD_SIZE / 2 -
            100 -
            $fromCenter.x * 200 +
            $fromCenter.horizontal,
          y * 200 +
            WORLD_SIZE / 2 -
            300 -
            $fromCenter.y * 200 +
            $fromCenter.vertical,
          200,
          400
        );
      });
  });
</script>

<slot />
