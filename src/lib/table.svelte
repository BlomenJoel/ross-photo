<script lang="ts">
    export let header = '';
    let showContent = false;
</script>

<div class="wrapper">
    <div class="flex justify-between"> 
        <h3>{header}</h3>
        <button on:click={() => showContent = !showContent}>{showContent ? 'close' : 'open'}</button>
    </div>
    {#if showContent}
        <slot />
        {/if}
</div>

<style scoped>
.wrapper {
    background: white;
    padding: 1rem
}
h3 {
    align-self: center;
}
</style>