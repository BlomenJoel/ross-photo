<script lang="ts">
import Price from '$lib/price.svelte';
import type { Item } from '$lib/types';

import { get } from 'svelte/store';

    import { cart as storeCart } from '../../store/cart'
   
    const items: Item[] = get(storeCart);
    const totalCost = (item: Item) => item.size.discountPrice 
    ? item.size.discountPrice * item.quantity
    : item.size.originalPrice * item.quantity 
</script>
<h1>Cart</h1>
    <ul>
        <lh>Product details</lh>
        <lh>Quantity</lh>
        <lh>Price</lh>
        <lh>Total</lh>
        {#each items as item }
            <li>
                <div class="flex">
                    <div>
                        // IMAEG
                        {item.title}
                    </div>
                    {item.quantity}
                    <Price print={item.size} />
                    {totalCost(item)}
                </div>
            </li>
        {/each}
    </ul>