<script>
  export let onClick = () => {};
  export let text = "";
  export let ghost = false;
  export let disabled = false;
  export let primary = false;

  const style = `${text ? "margin-right: 8px;" : ""}`;
</script>

<style>
  button {
    display: inline-flex;
    flex: 1;
    outline: 0;
    height: 30px;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    font-size: 1.6rem;
    transition: color 0.05s ease, background-color 0.15s ease;
    padding-left: 8px;
    padding-right: 8px;
    background: none;
    border: 1px solid #1eadfa;
    color: #1eadfa;
  }
  button > :global(.icon) {
    color: #1eadfa;
  }
  button:hover {
    background-color: #1eadfa;
    color: #fff;
  }
  button:hover > :global(.icon) {
    color: #fff;
  }
  button:active:not(:disabled) {
    transform: translate(1px, 1px);
  }
  button.ghost {
    border-color: transparent;
  }
  button.ghost:hover {
    background-color: transparent;
    color: #1eadfa;
  }
  button.ghost:hover > :global(.icon) {
    color: #1eadfa;
  }
  button.primary {
    border-color: #1eadfa;
    background-color: #1eadfa;
    color: #fff;
  }
  button.primary > :global(.icon) {
    color: #fff;
  }
  button.primary:hover:not(:disabled) {
  }
  button:disabled {
    background: #fafafa;
    border-color: #eee;
    color: #d3d3d3 !important;
    text-decoration: none !important;
    pointer-events: none;
  }
  button:disabled.ghost {
    background: none;
    border-color: transparent;
  }
  button:disabled > :global(.icon) {
    color: #d3d3d3 !important;
  }
  button:disabled:hover {
    cursor: not-allowed;
  }
</style>

<button
  class={`${ghost ? 'ghost' : ''} ${primary ? 'primary' : ''}`}
  {onClick}
  type="submit"
  {disabled}
  {style}>
  <slot />
  {text}
</button>
