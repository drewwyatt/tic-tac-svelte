<script lang="ts">
  import Board from './Board.svelte'
</script>

<style>
  :global(:root) {
    --background: #282a36;
    --foreground: #f8f8f2;
    --disabled: #6272a4;
    --cyan: #8be9fd;
    --green: #50fa7b;
    --orange: #ffb86c;
    --pink: #ff79c6;
    --purple: #bd93f9;
    --red: #ff5555;
    --yellow: #f1fa8c;
  }

  :global(html) {
    background: var(--background);
  }
</style>

<main>
  <Board />
</main>
