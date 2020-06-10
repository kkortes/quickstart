<script>
  // export let wingSpan;
  // export let gutter;
  // export let up = false;
  // export let right = false;
  // export let down = false;
  // export let left = false;
  export let vertical = false;
  export let horizontal = false;
</script>

<style>
  .crow {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
  .crow > * {
    display: flex;
  }
  .auto > * {
    flex: 1;
  }
  .horizontal {
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
  }
  .horizontal > div {
    height: 100%;
  }
  .vertical {
    flex-direction: column;
    display: inline-flex;
    width: 100%;
  }
  .vertical > div {
    width: 100%;
  }
</style>

<div class={`crow ${vertical ? 'vertical' : ''}`}>
  <slot />
</div>
