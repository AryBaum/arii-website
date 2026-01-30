<script>
    export let appData;

    const placeholderGif = "";
</script>

<div class="app-wrapper">
    <div class="app-card" class:is-placeholder={!appData.gif}>
        {#if appData.gif}
            <img src={appData.gif} alt={appData.name} class="app-gif" loading="lazy" />
        {:else}
            <div class="placeholder-content">
                <span>{appData.name}</span>
            </div>
        {/if}
    </div>

    <div class="tooltip">
        {appData.name}
    </div>
</div>

<style>
    .app-wrapper{
        width: 270px;
        height: 145px;
        flex-shrink: 0;
        position: relative;
    }
    .app-card {
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, #ededed, #c9c9c9);
        border-radius: 17px;
        border: 3px solid;
        border-color: lightgray;
        box-sizing: border-box;
        box-shadow: 0;
        transition: box-shadow 0.7s ease;
        transition: border-color 0.7s ease;
        overflow: hidden;

    }

    .app-wrapper:hover .app-card {
        border-color: aqua;
        box-shadow: 0 0 5px 3px aqua;
    }

    .tooltip {
        position: absolute;
        bottom: -50px;
        left: 50%;
        transform: translateX(-50%);

        background-color: white;
        color: grey;
        padding: 8px 20px;
        border-radius: 50px;
        font-family: Continuum;
        white-space: nowrap;
        pointer-events: none;

        opacity: 0;
        transition: all 0.2s ease-out;
        z-index: 100;
    }

    .app-wrapper:hover .tooltip {
        opacity: 1;
        bottom: -30px;
    }

    .is-placeholder {
        background-color: grey;
    }

    .app-gif {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .placeholder-content {
        text-align: center;
        color: black;
        font-family: sans-serif;
    }
</style>
