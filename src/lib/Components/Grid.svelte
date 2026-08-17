<script>
    import App from './App.svelte';
    import Popup from './Popup.svelte';
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { playSound } from '$lib/sound.js';
    import selectSfx from '$lib/assets/sfx/Select.wav';
    import openSfx from '$lib/assets/sfx/Open.wav';
    import leftArrow from '../assets/leftArrow.png';
    import rightArrow from '../assets/rightArrow.png';
    import RushHourGif from '../assets/RushHour3.gif';
    import PunchInGif from '../assets/PunchIn3.gif';
    import AboutMiiGif from '../assets/AboutMii.gif';
    import SliderGif from '../assets/Slider.gif';
    import LoadingGif from '../assets/LoadingIcon.gif';
    import DontDieGif from '../assets/DontDie.gif';
    import ResumeGif from '../assets/Resume.gif';

    const realApps = [
        { id: 1, name: "Rush Hour", gif: RushHourGif, route: "/projects/rushhour", description:""},
        {id: 2, name: "Punch-In", gif: PunchInGif, route: "/projects/punch-in", description:"" },
        {id: 3, name: "About Mii", gif: AboutMiiGif, route: "/projects/about", description:""},
        {id: 4, name: "Slider", gif: SliderGif, route: "/projects/slider", description:""},
        {id: 5, name: "Loading Icon", gif: LoadingGif, route: "/projects/loadingicon", description:""},
        {id: 6, name: "Don't Die", gif: DontDieGif, route: "/projects/dontdie", description:""},
        {id: 7, name: "Resume", gif: ResumeGif, route: "/projects/resume", description:""},
        { id: 8, name: "3D Western", gif: RushHourGif, route: "/projects/3dwestern", description: "A club website rebuilt around..." },
    ];

    const allApps = Array.from({ length: 24 }, (_, i) => {
    return realApps[i] || { 
      id: i + 1, 
      name: "Coming Soon",
      gif: null
    };
  });

    let selectedAppIndex = -1;

    function openPopup(index) {
        if(allApps[index].name !== "Coming Soon") {
            playSound(selectSfx, 0.5);
            playSound(openSfx, 0.5);
            selectedAppIndex = index;
        }
    }

    function closePopup() {
        selectedAppIndex = -1;
    }

    function nextPopupApp() {
        if (selectedAppIndex !== -1) {
            selectedAppIndex = (selectedAppIndex + 1) % allApps.length;
        }
    }

    function prevPopupApp() {
        if (selectedAppIndex !== -1) {
            selectedAppIndex = (selectedAppIndex - 1 + allApps.length) % allApps.length;
        }
    }

  
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
            {#each visibleApps as app, i}
                <div class="grid-cell">
                    <App appData={app} on:click={() => openPopup((currentPage * itemsPerPage)+i)}/>
                </div>
            {/each}
        </div>
        {/key}
    </div>
    {#if selectedAppIndex != -1}
        <Popup app={allApps[selectedAppIndex]} on:close={closePopup} on:next={nextPopupApp} on:prev={prevPopupApp}></Popup>
    {/if}
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