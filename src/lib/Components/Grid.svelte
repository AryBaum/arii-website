<script>
    import App from './App.svelte';
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import leftArrow from '../assets/leftArrow.png';
    import rightArrow from '../assets/rightArrow.png';
    import RushHourGif from '../assets/RushHour.gif';


    const realApps = [
        { id: 1, name: "Rush Hour", gif: RushHourGif}
    ];

    // 2. Create a full list of 24
  // We map from 0 to 23. If a real app exists at that index, use it.
  // Otherwise, create a placeholder object.
  const allApps = Array.from({ length: 24 }, (_, i) => {
    return realApps[i] || { 
      id: i + 1, 
      name: "Coming Soon", 
      gif: null // No GIF for placeholders
    };
  });
  
    let innerWidth = 1;
    let currentPage = 0;
    let direction = 1;

    $: columns = innerWidth < 680 ? 1
              :  innerWidth < 1000 ? 2
              :  innerWidth < 1350 ? 3
              :  4;

    $: rows = 3;
    $: itemsPerPage = columns * rows;
    $: totalPages = Math.ceil(allApps.length / itemsPerPage);

    $: visibleApps = allApps.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            direction = 1;
            currentPage++;
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            direction = -1;
            currentPage--;
        }
    };

    $: if (itemsPerPage) currentPage = 0;
</script>

<svelte:window bind:innerWidth />

<div class="grid-section">
    <button class="arrow-btn left" on:click={prevPage} disabled={currentPage === 0}><img src={leftArrow} alt="<-"></button>

    <div class="grid-viewport">
        {#key currentPage}
        <div class="grid-layout" in:fly={{ x: 100 * direction, duration:500, easing: cubicOut }} out:fly={{ x: -100 * direction, duration:500, easing: cubicOut }} style="grid-template-columns: repeat({columns}, 1fr); grid-template-rows: repeat({rows}, 1fr);">
            {#each visibleApps as app}
                <div class="grid-cell">
                    <App appData={app} />
                </div>
            {/each}
        </div>
        {/key}
    </div>

    <button class="arrow-btn right" on:click={nextPage} disabled={currentPage === totalPages - 1}><img src={rightArrow} alt="->"></button>
</div>

<style>
    .grid-section {
        height: 80vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
    }

    .grid-viewport {
        width: 90%;
        height: 85%;
        position: relative;
        padding-bottom: 80px;
        box-sizing: border-box;
    }

    .grid-layout {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        gap: 10px;
    }

    .grid-cell {
        /* Ensure cell doesn't collapse */
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .arrow-btn {
        position: absolute;
        border: none;
        width: 56px;
        height: 56px;
        font-size: 1.5 rem;
        z-index: 20;
        transition: transform 0.2s;
       
    }

    .arrow-btn:hover:not(:disabled) { transform: scale(1.1); }
    .arrow-btn:disabled { opacity: 0; pointer-events: none; }
    .left { left: 2%; }
    .right { right: 2%; }
</style>