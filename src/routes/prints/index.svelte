<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit';
    export const prerender = true;
    export const load: Load = async ({ fetch, page }) => {
        try {
            const test = await fetch('./prints/prints.json')
            return { props: { prints: await test.json()}}
            
        } catch(err) {
            console.error('Error fetching inital image', err)
            return { error: new Error(err)}
        }
    }		
</script>


<script lang="ts">
    import {urlFor} from  '../../cms/imageBuilder'
    export let prints;
</script>

{#each prints as print}
<a class="print-wrapper" href={'prints/' + print.slug}>
    <div class="image-wrapper">
        <img alt={print.alt} src={urlFor(print.image).url()} />
    </div>
    <h3>{print.title}</h3>
</a>
{/each}


<style scoped>
    h3 { color: black}
    .image-wrapper {
        max-width: 20rem
    }
    .print-wrapper {
        text-align: -webkit-center;
        border: 2px solid black;
        padding: 2rem;
        margin-bottom: 2rem;
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