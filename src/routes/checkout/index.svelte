<script lang="ts">
import Table from '../../lib/table.svelte';

import type { Item } from '$lib/types';
import { cart as storeCart } from '../../store/cart'
import { contactInfo as contactInfoStore } from '../../store/contactInfo'
import CheckoutItems from './_checkoutItems.svelte';
import ContactInfo from './_contactInfo.svelte';
import { get } from 'svelte/store';
import EmailModal from '$lib/emailModal.svelte';
import { goto } from '$app/navigation';

let items: Item[] = []
contactInfoStore.useLocalStorage()
let contactInfo = get(contactInfoStore)
let data = undefined;
let triggerSubmit = false;
storeCart.subscribe((data) => {
    items = data;
})
const purchase = () => {
    data = {items, contactInfo}
    triggerSubmit = true;
}
const setStore = () => {
    contactInfoStore.set(contactInfo);
}
$: contactInfo, setStore()
</script>
<svelte:head>
    <title>
        Cart - Higher Perspective Droning
    </title>
</svelte:head>
<h1>Cart</h1>
{#if items && items.length > 0}
<Table header="Items">
    <CheckoutItems {items} />
</Table>
<div class="pt-10">
    <Table header="Contact info">
        <ContactInfo {purchase} bind:contactInfo={contactInfo}/>
    </Table>
</div>
<EmailModal 
    data={data} 
    bind:triggerSubmit={triggerSubmit}
    on:close={() => goto('/')}
>
    <span slot="header">
        <h1>Purchase successfull!</h1>
    </span>
    <span slot="body">
        <p>Your purchase will be processed and you´ll be contacted within 3 workdays how to proceed with payment.</p>
        <p>If you have any question please send a email to: <a href="mailto:example@test.com">example@test.com</a></p>
    </span>
</EmailModal>


{:else}
    <h2>No items in store</h2>
{/if}

   