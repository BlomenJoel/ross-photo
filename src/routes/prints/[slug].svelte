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
    import { cart as storeCart } from '../../store/cart'
    import { get } from 'svelte/store';
    import type { Print, Size } from '$lib/types';
    export let print: Print;
    let quantity = 0;
    let size: Size = print.sizes[0]
    
    const addToCart = () => {
        const previousStore = get(storeCart)
        let match = false;
        const newStore = previousStore.map(item => {
          if(item.slug === print.slug && item.size.size === size.size) {
              match = true;
              item.quantity = quantity;
          }    
          return item;
        })
        if(!match) {
            newStore.push({
                size, title: print.title, slug: print.slug, quantity 
            })
        }
        storeCart.set(newStore)
    }
</script>

<svelte:head>
	<title>{print.slug} - Higher Perspective Droning</title>
</svelte:head>
<div class="print-wrapper sm:flex">
    <div class="image-wrapper">
        <img alt={print.alt} src={urlFor(print.image).url()} />
    </div>
    <div class="text-left">
        <h3 class="sm:pt-24">{print.title}</h3>
        <div class="flex">
            {#each print.categories as category }
                <h4 class="pr-4">{category.title}</h4>
            {/each}
        </div>
        <Price print={size} />
        <form on:submit|preventDefault={addToCart} class="sm:pt-12 pt-8">
            <label for="sizes">Sizes</label>
            <select required id="sizes" name="sizes" bind:value={size} >
                {#each print.sizes as size }
                <option value="{size}"> <div class="test">{size.size}</div></option>
                {/each}
            </select>
            <div>
                <label class="block" for="quantity">Quantity </label>
                <input type="number" min="1" max="10" id="quantity" bind:value={quantity}>
            </div>
            <input type="submit" class="mt-4" value="Add to cart">
        </form>

    </div>
</div>


<style scoped>
    input[type=submit] {
  min-width: -webkit-fill-available;
}
    .image-wrapper {
        max-width: 40rem
    }
    input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input {
    max-width: 4rem;
}
    .print-wrapper {
        text-align: -webkit-center;
        border: 2px solid black;
        padding: 2rem;
        margin-bottom: 2rem;
    }
</style>