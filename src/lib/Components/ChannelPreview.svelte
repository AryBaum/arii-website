<script>
    import { onMount } from 'svelte';

    /** @type {{ video: string, poster: string }} */
    export let preview;
    export let alt = '';
    /** "cover" fills the tile, "contain" shows the whole clip (popup) */
    export let fit = 'cover';

    // People who ask their OS for less motion just see the still poster frame
    let reduceMotion = false;
    onMount(() => {
        reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
</script>

{#if reduceMotion}
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
