<script lang="ts">
  import { inspect } from '@xstate/inspect'
  import Space from './Space.svelte'
  import { events, machine, useMachine } from './state'
  import { isDev } from './env'

  const devTools = isDev()
  if (devTools) {
    inspect({ iframe: false })
  }

  const [state, dispatch] = useMachine(machine, { devTools })

  $: done = $state.matches('end')
  $: moves = $state.context.moves
  $: turn = $state.context.turn
  $: winner = $state.context.winner
</script>

<style>
  div {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-items: center;
  }

  .board {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    color: var(--foreground);
    max-height: 350px;
  }

  nav {
    color: var(--foreground);
    display: flex;
    flex-direction: row;
  }

  .x {
    color: var(--pink);
  }
  .o {
    color: var(--cyan);
  }
</style>

<div>
  <nav>
    {#if done}
      <h1>
        {#if winner}
          <span class={`winner ${winner}`}>{(winner ?? '').toUpperCase()}</span>
          wins!
        {:else}Draw{/if}
      </h1>
    {:else}
      <h1>
        <span class={`turn ${turn}`}>{(turn ?? '').toUpperCase()}</span>'s turn!
      </h1>
    {/if}
  </nav>
  <div class="board">
    {#each moves as value, index}
      <Space
        {index}
        {value}
        {turn}
        onSelect={position => dispatch(events.move(position))} />
    {/each}
  </div>
  <button on:click={() => dispatch(events.restart())}>Restart</button>
</div>
