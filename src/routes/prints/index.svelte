<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit';
    export const load: Load = async ({ fetch, page }) => {
        const { query } = page;
        const category = query.get('category');
        
        try {
            const data = await fetch('./prints/prints.json?category=' + category).then(res => res.json())
            return { props: { prints: data.prints, categories: data.categories }}

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

    
    export let prints: Print[], categories: Category[];
    let activeCategory = '';
    page.subscribe((test) => {
        activeCategory = test.query.get('category')
    })
</script>


<svelte:head>
	<title>Prints - Higher Perspective Droning</title>
</svelte:head>

<h4>Categories</h4>
<ul class="flex">
    {#each categories as category }
        <li class="pr-4">
            <a class:active-category={activeCategory === category.title} href="prints?category={category.title}">{category.title}</a>
        </li>
    {/each}
</ul>

<ul>
    {#each prints as print}
        <li>
            <a class="print-wrapper" href={'prints/' + print.slug}>
                <div class="image-wrapper">
                    <img alt={print.alt} src={urlFor(print.image).url()} />
                </div>
                <div class="flex justify-center">
                    {#each print.categories as category }
                    <h4> {category.title} </h4>
                    {/each}
                </div>
                <h3>{print.title}</h3>
                <Price print={{originalPrice: print.minimumPrice, discountPrice: print.discountMinimumPrice}}/>
            </a>
        </li>
    {/each}
</ul>


<style scoped>
    .active-category {
        color: var(--accent-color);
    }
    a { color: black}
    .image-wrapper {
        max-width: 20rem
    }
    .print-wrapper {
        margin: 2rem;
        display: block;
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
</style>