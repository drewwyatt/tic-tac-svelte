<script lang="ts">
  import Space from './Space.svelte'
  import machine from './state/machine'
  import useMachine from './state/useMachine'

  const { state, send } = useMachine(machine)

  $: moves = $state.context.moves
  $: turn = $state.context.turn
</script>

<style>
  div {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    color: var(--foreground);
  }
</style>

<div>
  {#each moves as value, index}
    <Space
      {index}
      {value}
      {turn}
      onSelect={position => send('MOVE', { position })} />
  {/each}
</div>
