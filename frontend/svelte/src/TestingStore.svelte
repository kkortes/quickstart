<script>
  import { store, actions } from "./store.js";

  const { setName, setPoints, setNameAndPoints, resetAll } = actions;

  $: playerName = $store.playerName;
  $: points = $store.points;
</script>

Current value of player name: {playerName}
<br />
Current points: {points}
<br />
<br />
<button on:click|preventDefault={() => setName({ playerName: 'something' })}>
  Set name to "something"
</button>
<br />

<button on:click|preventDefault={() => setPoints({ points: points - 1 })}>
  -1
</button>
<button on:click|preventDefault={() => setPoints({ points: points + 1 })}>
  +1
</button>
<button on:click|preventDefault={() => setPoints({ points: 0 })}>Reset</button>
<br />
<button on:click|preventDefault={() => setNameAndPoints()}>
  Set name to "hercules" and points to "1337"
</button>
<br />
<button on:click|preventDefault={() => resetAll()}>Reset all</button>
