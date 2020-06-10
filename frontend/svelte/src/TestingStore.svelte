<script>
  import { store, actions } from "./store.js";

  const { setName, setPoints, setNameAndPoints, increaseX, resetAll } = actions;
  let stores = [];
  $: stores = [...stores, $store];
  $: playerName = $store.playerName;
  $: points = $store.points;
  $: fromCenter = $store.fromCenter;

  $: console.log(stores);
  $: {
    if (stores.length > 1) {
      console.log("CHECK EQUALITY");
      if (
        stores[stores.length - 2].fromCenter ===
        stores[stores.length - 1].fromCenter
      ) {
        console.log("EQUAL!");
      }
    }
  }
  const startTimeout = () => {
    for (let i = 0; i < 1000; i++) {
      increaseX();
    }
  };
</script>

<pre>{JSON.stringify($store, null, 2)}</pre>

<button on:click={() => increaseX()}>Inc X</button>

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
<br />
<br />
<button on:click|preventDefault={() => startTimeout()}>
  Increment X by 1; 1000 times
</button>
