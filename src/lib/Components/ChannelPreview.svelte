<script>
    import { onMount } from 'svelte';
    import { introActive } from '$lib/stores.js';

    /** @type {{ video: string, poster: string }} */
    export let preview;
    export let alt = '';
    /** "cover" fills the tile, "contain" shows the whole clip (popup) */
    export let fit = 'cover';

    // Show the still poster frame until the page is running and the startup
    // intro is over — loading 8 videos behind the intro makes its animation stutter.
    // People who ask their OS for less motion only ever see the poster.
    let mounted = false;
    let reduceMotion = false;
    onMount(() => {
        reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        mounted = true;
    });

    $: playVideo = mounted && !reduceMotion && !$introActive;
</script>

{#if !playVideo}
    <img src={preview.poster} {alt} class="media" style:object-fit={fit} />
{:else}
    <video
        class="media"
        style:object-fit={fit}
        src={preview.video}
        poster={preview.poster}
        aria-label={alt}
        autoplay
        loop
        muted
        playsinline
        disablepictureinpicture
    ></video>
{/if}

<style>
    .media {
        display: block;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
</style>
