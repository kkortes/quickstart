<script>
  import { TILE_AMOUNT, TILE_SIZE, WORLD_SIZE } from "../constants/WORLD.js";
  import { renderable } from "../engine";
  import { makeTiles } from "../engine/tiles.js";
  import { store } from "../store";
  import { compare } from "../common/helper.js";
  import lodash from "lodash";
  const { times } = lodash;

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

    Object.values(makeTiles($store.fromCenter.x, $store.fromCenter.y))
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
            $store.fromCenter.x * 200 +
            $store.fromCenter.horizontal,
          y * 200 +
            WORLD_SIZE / 2 -
            300 -
            $store.fromCenter.y * 200 +
            $store.fromCenter.vertical,
          200,
          400
        );
      });
  });
</script>

<slot />
