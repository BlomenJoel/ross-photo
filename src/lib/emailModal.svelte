<script lang="ts">
    import Modal from "./Modal.svelte";
    export let data;
    export let triggerSubmit = false;
    export let timeOut = undefined;
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    let emailSuccessFull = undefined;
    const submit = async () => {
        if(triggerSubmit === true) {
            const res = await fetch('send-email.json', 
            { method: 'POST', body: JSON.stringify(data)});
            
            emailSuccessFull = res.status === 200;
            triggerSubmit = false;
            if(timeOut) {
                setTimeout(() => {emailSuccessFull = undefined }, timeOut);
            }
        }
    }
    const checkIfModalClosed = () => {
        if(!emailSuccessFull) {
            dispatch('close')
        }
    }

    $: triggerSubmit, submit()
    $: emailSuccessFull, checkIfModalClosed();
</script>
{#if emailSuccessFull}
<Modal on:close={() => emailSuccessFull = false}>
    <span slot="header">
        <slot name="header"/>
    </span>
    <span slot="body">
        <slot name="body"/>
    </span>
    <span slot="button">
        <slot name="button"/>
    </span>
</Modal>
{/if}
    