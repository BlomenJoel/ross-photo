<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit';
    export const prerender = true;
    export const load: Load = async ({ fetch, page }) => {
        try {
            const { slug }  = page.params
            const printPromise = await fetch('../prints/print.json?slug=' + slug)
            return { props: { print: await printPromise.json()}}
            
        } catch(err) {
            console.error('Error fetching inital image', err)
            return { error: new Error(err)}
        }
    }		
</script>


<script lang="ts">
    import {urlFor} from  '../../cms/imageBuilder'
    import Price from '../../lib/price.svelte'
    import Quantity from '../../lib/quantity.svelte'
    import { changeCart } from '../../store/cart'
    import type { Print, Size } from '$lib/types';
    export let print: Print;
    let quantity = 0;
    let size: Size = print.sizes ? print.sizes[0] : undefined
</script>

<svelte:head>
	<title>{print.slug} - Higher Perspective Droning</title>
</svelte:head>
<div class="print-wrapper lg:flex">
    <div class="image-wrapper">
        <img alt={print.alt} src={urlFor(print.image).url()} />
    </div>
    <div class="text-left">
        <h3 class="sm:pt-24">{print.title}</h3>
        <div class="flex">
            {#if print.categories && print.categories.length > 0}
                {#each print.categories as category }
                    <h4 class="pr-4">{category.title}</h4>
                {/each}
            {/if}
        </div>
        {#if size}
            <Price print={size} />
        {/if}
        <form on:submit|preventDefault={() => changeCart.addToCart(print, quantity, size)} class="sm:pt-12 pt-8">
            <label for="sizes">Sizes</label>
            <select required id="sizes" name="sizes" bind:value={size} >
                {#if print.sizes && print.sizes.length > 0}
                    {#each print.sizes as size }
                        <option value="{size}"> <div class="test">{size.size}</div></option>
                    {/each}
                    {/if}
                </select>
                <Quantity bind:quantity={quantity} />
            <input type="submit" class="mt-4" value="Add to cart">
        </form>
    </div>
</div>


<style scoped>
    form, select, input {
  max-width: 11rem;
}
    .image-wrapper {
        max-width: 40rem
    }
  
    .print-wrapper {
        text-align: -webkit-center;
        border: 2px solid black;
        padding: 2rem;
        margin-bottom: 2rem;
    }
</style>