<script>
  import Phaser from "phaser";
  import { player, colliders, cursors } from "./stores/scene.js";

  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: {
      preload: function() {
        const { load } = this;

        load.image("player", "static/player.png");
        load.image("armorillo", "static/armorillo.jpg");
        load.spritesheet("world-map", "static/world-map_2.png", {
          frameWidth: 200,
          frameHeight: 400
        });
      },
      create: function() {
        const { physics, input } = this;

        $colliders = physics.add.staticGroup();
        $colliders.create(400, 500, "armorillo");
        $player = physics.add.image(400, 0, "player");

        $player.setBounce(0.2);
        $player.setCollideWorldBounds(true);

        $cursors = input.keyboard.createCursorKeys();

        physics.add.collider($player, $colliders);
      },
      update: function() {
        const { input } = this;
        const { left, right, up } = input.keyboard.createCursorKeys();

        if (left.isDown) {
          $player.setVelocityX(-160);
        } else if (right.isDown) {
          $player.setVelocityX(160);
        } else {
          $player.setVelocityX(0);
        }
        if (up.isDown && $player.body.touching.down) {
          $player.setVelocityY(-330);
        }
      }
    }
  };

  var game = new Phaser.Game(config);
</script>
