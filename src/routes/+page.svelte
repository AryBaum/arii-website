<script>
	import Footer from "$lib/Components/Footer.svelte";
	import Grid from "$lib/Components/Grid.svelte";

</script>

<div class="page">
  <Grid />
  <Footer />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden; /* Disables browser scrolling */
    background-color: hsl(220, 14%, 96%); /* Optional bg color */
    font-family: "Continuum";
  }

  :global(html), :global(body), :global(button), :global(a) {
    cursor: url('../lib/assets/wiiCursor3.png') 16 16, auto !important;
  }

  :global(button:active), :global(a:active) {
    cursor: url('../lib/assets/wiiCursor3.png') 16 16, auto !important;
  }

  .page {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    /* --- STRIPED BACKGROUND LOGIC --- */
    background: repeating-linear-gradient(
      0deg,              /* 1. Angle of the stripes */
      #ededed,            /* 2. Color A Start */
      #ededed 3px,       /* 3. Color A End (width of white stripe) */
      #e6e6e6 3px,       /* 4. Color B Start */
      #e6e6e6 6px        /* 5. Color B End (width of grey stripe) */
    );
  }
</style>