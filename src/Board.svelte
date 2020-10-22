<script lang="ts">
  import { inspect } from '@xstate/inspect'
  import Space from './Space.svelte'
  import machine from './state/machine'
  import useMachine from './state/useMachine'
  import { isDev } from './env'

  const devTools = isDev()
  if (devTools) {
    inspect({ iframe: false })
  }

  const { state, send } = useMachine(machine, { devTools })

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
