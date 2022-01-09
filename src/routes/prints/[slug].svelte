<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit';
    export const prerender = true;
    export const load: Load = async ({ fetch, page }) => {
        try {
            const { slug }  = page.params
            const test = await fetch('../prints/print.json?slug=' + slug)
            return { props: { print: await test.json()}}
            
        } catch(err) {
            console.error('Error fetching inital image', err)
            return { error: new Error(err)}
        }
    }		
</script>


<script lang="ts">
    import {urlFor} from  '../../cms/imageBuilder'

    export let print;
</script>

<div class="print-wrapper" href={'prints/' + print.slug}>
    <div class="image-wrapper">
        <img alt={print.alt} src={urlFor(print.image).url()} />
    </div>
    <h3>{print.title}</h3>
    <button class="mt-4 px-24">BUY</button>
</div>


<style scoped>
    .image-wrapper {
        max-width: 20rem
    }
    .print-wrapper {
        text-align: -webkit-center;
        border: 2px solid black;
        padding: 2rem;
        margin-bottom: 2rem;
    }
</style>