<script lang="ts">
    import Price from '$lib/price.svelte';
    import type { Item } from '$lib/types';
    import { changeCart } from '../../store/cart'
    import { onMount } from 'svelte';
    import { urlFor } from '../../cms/imageBuilder';
    import Quantity from '../../lib/quantity.svelte';
    export let items: Item[] = [];
        let thumbNails = []; 
    
        onMount(() => {
            const id = items.map(i => i._id)
            if (id && id.length > 0) {
                fetch('./checkout/images.json?' + id.map(i => 'id=' + i).join('&'))
                .then(res => res.json())
                .then(jsonRes => thumbNails = jsonRes)
            }
        })
    
        const totalCost = (item: Item) => item.size.discountPrice 
            ? item.size.discountPrice * item.quantity
            : item.size.originalPrice * item.quantity 
    
        const imageAlt = (item: Item) => 
                thumbNails?.find(nail => nail._id === item._id)?.alt
            
        const imageSrc = (item: Item) => 
                thumbNails?.find(nail => nail._id === item._id)?.image
    
        const checkQuantity = (item: Item) => item.quantity <= 0 
            ? changeCart.removeFromCart(item)
            : changeCart.addToCart(item, item.quantity, item.size) 
        
        const totalAmount = () =>  items
            .map(item => totalCost(item))
            .reduce((pre, curr) => pre + curr)
</script>

 <ul class="grid--container">
    <lh>Product details</lh>
    <lh>Quantity</lh>
    <lh>Price</lh>
    <lh>Total</lh>
    <lh/>
    {#each items as item }
        <div class="pr-4 ">
            <p>
                {item.title}
            </p>
            {#if thumbNails.length > 0}              
            <a href="{'prints/' + item.slug}" class="image-wrapper">
                <img alt={imageAlt(item)} src={urlFor(imageSrc(item)).url()} />
            </a>
            {/if}
        </div>
        <Quantity on:blur={() => checkQuantity(item)} bind:quantity={item.quantity} label={false}/>
        <div>
            <Price print={item.size} />
        </div>
        <p>
            {totalCost(item)}
        </p>
        <button on:click="{() => changeCart.removeFromCart(item)}" class="remove p-0 m-0">X</button>
    {/each}
    <lf class="total-amount-position-text">Total amount</lf>
    <lf class="total-amount-position">{totalAmount()} kr</lf>
</ul>

<style scoped>
    img {
            max-width: 8rem;
            max-height: 8rem;
        }
        .total-amount-position-text {
            grid-column: 3;
        }
        .total-amount-position {
            grid-column: 4 / span 2;
        }
        .grid--container {
            display: grid;
            grid-template-columns: 1.5fr .5fr .75fr .5fr .5fr;
            grid-row-gap: 1rem;
            grid-column-gap: 1rem;
            align-items: center;
        }
       .remove {
            height: 3rem;
            width: 3rem;
            font-weight: bolder;
            border-radius: .5rem;
            transition: all 0.1s;
        }
        button:hover {
            /* ACCENT COLOR w. opacity*/
            background-color: rgb(255, 62, 0, 0.5)
        }
        
@media (max-width: 480px) {
    img {
            max-width: 4rem;
            max-height: 4rem;
        }
}	
    </style>