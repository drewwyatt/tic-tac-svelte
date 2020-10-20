<script lang="ts">
  import { Player } from './models'

  export let turn: Player
  export let value: Player
  export let index: number
  export let onSelect: (idx: number, value: Player) => void

  const handleClick = () => {
    onSelect(index, turn)
  }
</script>

<style>
  button {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .x {
    background: black;
    color: white;
  }

  .o {
    background: white;
    color: black;
  }
</style>

<button class={value} on:click={handleClick} disabled={value !== Player.None}>
  {value === Player.None ? '' : value}
</button>
