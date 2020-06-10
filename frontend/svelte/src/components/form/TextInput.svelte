<script>
  export let onChange = () => {};
  export let value = "";
  export let text = "";
  export let disabled = false;
  export let name = "";

  $: onChange(value);
</script>

<style>
  .text-input {
    position: relative;
    display: flex;
  }
  .text {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 1.6rem;
    line-height: 1.6rem;
    padding: 4px 4px 4px 0;
    color: #808080;
    pointer-events: none;
    transition: top 0.15s ease, font-size 0.15s ease;
  }
  /* input:focus {
            border-color: ${borderColor};
          } */
  input:focus + .text,
  input.focus + .text {
    pointer-events: auto;
    font-size: 1.2rem;
    top: -24px;
  }
  input {
    border: 0;
    border-bottom: 1px solid #eee;
    font-size: 1.6rem;
    line-height: 1.6rem;
    padding: 0 8px 8px 0;
    outline: 0;
    transition: border-color 0.15s ease;
    flex: 1;
    background: none;
    color: #000;
  }
</style>

<div class="text-input">
  <input
    {disabled}
    {name}
    type="text"
    bind:value
    class={`${value !== '' ? 'focus' : ''}`} />
  <div class="text">{text}</div>
</div>
