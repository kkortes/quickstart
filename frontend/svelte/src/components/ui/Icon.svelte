<script>
  export let name = "";
  export let size = 20;
  export let color = "#444";

  const style = `color: ${color}; font-size: ${size}px; line-height: ${size}px;`;
</script>

<style>
  .icon {
    display: inline-block;
    text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.35);
  }
</style>

<span class={`icon-${name} icon ${name}`} {style} />
