<script>
  import Icon from "../ui/Icon.svelte";

  export let id;
  export let text = "";
  export let onChange = () => {};
  export let value;

  $: onChange(value);
</script>

<style>
  .check-box {
    display: flex;
    flex-direction: row;
  }
  input {
    display: none;
  }
  input:checked + .box :global(.icon) {
    display: flex;
  }
  label {
    display: flex;
    flex-direction: row;
    margin-right: 4px;
  }
  .box {
    width: 18px;
    height: 18px;
    border: 1px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
  }
  .box :global(.icon) {
    display: none;
  }
</style>

<div class="check-box">
  <label htmlFor={id}>
    <input type="checkbox" {id} bind:checked={value} />
    <div class="box">
      <Icon name="success" color="lightgreen" size={16} />
    </div>
    {text}
  </label>
</div>
