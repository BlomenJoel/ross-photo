<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit';
    export const load: Load = async ({ fetch }) => {
        try {
            const data = await fetch('./prints/prints.json').then(res => res.json())
            return { props: { allPrints: data.prints, categories: data.categories }}

        } catch(err) {
            console.error('Error fetching inital image', err)
            return { error: new Error(err)}
        }
    }
</script>


<script lang="ts">
    import {urlFor} from  '../../cms/imageBuilder'
    import { page } from '$app/stores'
    import Price from '../../lib/price.svelte'
    import type { Category, Print } from '$lib/types';

    export let allPrints: Print[], categories: Category[], horizontal = false, redirect = true;
    let currentPrints: Print[] = allPrints;
    console.log('currentprints', currentPrints)
    let activeCategory = '';    
    page.subscribe((currentPage) => {
        activeCategory = currentPage.query.get('category')
    })
    const setCurrentPrints = () => {
        if(activeCategory) {
            currentPrints = allPrints
            .filter(print => {
                if(!print.categories) {
                    return;
                }
                return print.categories
                    .find(category => category.title === activeCategory)})
        } else {
            currentPrints = allPrints
        }
    }
    $: activeCategory, setCurrentPrints();
</script>


<svelte:head>
	<title>Prints - Higher Perspective Droning</title>
</svelte:head>
<div class="mx-auto">
    <h4>Categories</h4>
    <ul class="flex">
        <li class="pr-4">
            {#if redirect}
            <a class:active-category={!activeCategory} href="prints">All</a>
            {:else}
            <p on:click={() => activeCategory = ""} class:active-category={!activeCategory}>All</p>
            {/if}
        </li>
        {#each categories as category }
        <li class="pr-4">
            {#if redirect}
            <a class:active-category={activeCategory === category.title} href="prints?category={category.title}">{category.title}</a>
            {:else}
            <p on:click={() => activeCategory = category.title} class:active-category={activeCategory === category.title} >{category.title}</p>
            {/if}
        </li>
        {/each}
    </ul>
</div>
<div class:horizontal-wrapper={horizontal}>
    <ul class:horizontal={horizontal}>
        {#each currentPrints as print}
        <li>
            <a class="print-wrapper" href={'prints/' + print.slug}>
                    <img class="image-wrapper" alt={print.alt} src={urlFor(print.image).url()} />
                    <div class="bottom-0">
                        <div class="flex justify-center">
                            {#if print.categories && print.categories.length > 0}
                            {#each print.categories as category }
                            <h4> {category.title} </h4>
                            {/each}
                            {/if}
                        </div>
                        <h3>{print.title}</h3>
                        <Price print={{originalPrice: print.minimumPrice, discountPrice: print.discountMinimumPrice}}/>
                    </div>
            </a>
        </li>
        {/each}
    </ul>
</div>
    
    
    <style scoped>
    .horizontal-wrapper {
        position: relative;
        width: 100vw;
        height: 100%;
    }
    .horizontal {
        display: flex;
        overflow-y: scroll;
    }
    .active-category {
        color: var(--accent-color);
    }
    a { color: black}
    .image-wrapper {
        max-width: 16rem;
        max-height: 16rem;
    }
    .print-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 25rem;
        height: 25rem;
        display: flex;
        margin: 2rem;
        text-align: -webkit-center;
        background-color: #c1c1c18a;
        padding: 2rem;
        transition: all 0.3s;
    }
    .print-wrapper:hover {
        transform: scale(1.05);
        cursor: pointer;
    }
    .print-wrapper:hover h3 {
        text-decoration: underline;
    }
    p  {
        cursor: pointer;
    }
</style>