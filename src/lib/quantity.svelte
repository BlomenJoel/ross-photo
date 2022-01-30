<script lang="ts">
     import { createEventDispatcher } from 'svelte';
     export let quantity = 0;
     export let label = true;
     const dispatch = createEventDispatcher();
</script>
           
<div>
    {#if label}
        <label class="block" for="quantity">Quantity </label>
    {/if}
    <input on:blur={() => dispatch('blur')} type="number" min="1" max="10" id="quantity" bind:value={quantity}>
</div>

<style scoped>
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input {
    max-width: 4rem;
}
</style>