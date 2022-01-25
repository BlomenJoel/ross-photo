<script lang="ts">
    export let print;
</script>
{#if print.discountPrice }
    <h4 class="line-through">{print.originalPrice} kr</h4>
    <h4>{print.discountPrice} kr</h4>
{:else}
    <h4>{print.originalPrice} kr</h4>
{/if}