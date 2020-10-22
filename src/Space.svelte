<script lang="ts">
  import type { Player } from './models'

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
    background: var(--disabled);
    color: var(--background);
  }

  .x {
    background: var(--pink);
  }

  .o {
    background: var(--cyan);
  }
</style>

<button class={value ?? ''} on:click={handleClick} disabled={value !== null}>
  {value === null ? '' : value}
</button>
