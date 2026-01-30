<script>
    import { onMount } from 'svelte';

    let date = new Date();
    let mounted = false;

    onMount(() => {
        mounted = true;
        const interval = setInterval(() => {
        date = new Date();
        }, 1000); // Updates every second
        return () => clearInterval(interval);
    });

    $: dateString = `${date.getHours() % 12 || 12}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} ${date.getHours() >= 12 ? 'PM' : 'AM'}  \t\t ${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.getDate()}/${date.getMonth() + 1}`
</script>

<div class="footer-wrap">
  <svg
    class="footer-svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    <path 
      d="M0 0 H20 C22 0 25 25 30 25 H70 C75 25 78 0 80 0 H100 V100 H0 Z" 
      class="trapezoid-fill" 
    />

    <path
      d="M0 0 H20 C22 0 25 25 30 25 H70 C75 25 78 0 80 0 H100"
      class="trapezoid-stroke"
    />
  </svg>

    <div class="footer-content">
        {#if mounted}
            <span class="time">{dateString}</span>
        {:else}
            <span class="time" style="opacity:0">00:00 Mon 01/01</span>
        {/if}
    </div>
</div>

<style>
  .footer-wrap {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 25vh;
    z-index: 10;
    /* Ensure the shadow doesn't get cut off if it spills out */
    overflow: visible; 
    justify-content: center;
    align-items: center;
  }

  /* This container holds both the shape and the stroke */
  .footer-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    display: block;
    overflow: visible; /* Important for shadow visibility */
  }
/* Put content ON TOP of the SVG */
  .footer-content {
    position: relative;
    z-index: 20; /* Must be higher than footer-svg z-index */
    text-align: center;
    color: #6c6c6c;
    margin-top: 80px; /* Pushes text down into the "meat" of the trapezoid */
  }

  .time {
    font-size: 3rem;
    font-weight: bold;
    line-height: 1;
    display: block;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .trapezoid-fill {
    fill: #CECFD7;
  }

  /* We apply the shadow here using CSS.
     CSS filters are "post-process", so they don't get stretched 
     by the SVG viewBox!
  */
  .trapezoid-stroke {
    fill: none;
    stroke: #43BBE5;
    stroke-width: 4px; /* Consistent thickness */
    stroke-linecap: round;
    stroke-linejoin: round;
    /* 1. Fixes line thickness: 
          Prevents the stroke from zooming in/out with the SVG 
    */
    vector-effect: non-scaling-stroke;
    
    /* 2. Fixes shadow distortion & depth: 
          drop-shadow(x-offset y-offset blur-radius color)
    */
    filter: drop-shadow(0px 10px 8px rgba(0, 0, 0, 0.801));
  }
</style>