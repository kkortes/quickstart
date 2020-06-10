import store from '../store.js';

export default function () {
  let { player } = store;
  // console.log(player);
  player = 'en spelare';

  // console.log(player);
  $: console.log(player);
  console.log(store.player);

  // const { load, add } = this;
  // load.image('player', 'assets/player.png');
  // load.image('armorillo', 'assets/armorillo.jpg');
  // load.spritesheet('world-map', 'assets/world-map.png', {
  //   frameWidth: 200,
  //   frameHeight: 400,
  // });
}
