<script>
  import { store, actions } from "./store.js";

  const { toggleName, togglePoints, toggleBoth } = actions;

  $: playerName = $store.playerName;
  $: points = $store.points;

  // const toggleName = ({ playerName }) => {
  //   console.log($store);
  //   $store = {
  //     playerName
  //   };
  // };
</script>

Current value of player name: {playerName}
<br />
Current points: {points}
<br />
<br />
<button on:click|preventDefault={() => toggleName({ playerName: 'somethign' })}>
  Set name to "somethign"
</button>
<br />
<button on:click|preventDefault={() => togglePoints('first ran')}>
  Toggle points
</button>
<br />
<button on:click|preventDefault={() => toggleBoth()}>Toggle both</button>
