<script lang="ts">
  import { Player } from './models'
  import Space from './Space.svelte'

  let moves = [Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None];
  let turn = Player.X

  const handleMove = (space: number, move: Player) => {
    moves = [...moves.slice(0, space), move, ...moves.slice(space + 1)]
    turn = move === Player.X ? Player.O : Player.X
  }
</script>

<div>
  {#each moves as value, index }
    <Space {index} {value} {turn} onSelect={handleMove} />
  {/each}
</div>

<style>
  div {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
  }
</style>
