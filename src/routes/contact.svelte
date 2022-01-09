
<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit';
    export const prerender = true;
    export const load: Load = async ({ fetch, page }) => {
        try {
            const test = await fetch('initial.json')
            return { props: { data: await test.json()}}
            
        } catch(err) {
            console.error('Error fetching inital data', err)
            return { error: new Error(err)}
        }
    }		
</script>

<script lang="ts">
    import ContactForm from '$lib/contactForm.svelte';

    export let data;
</script>
<section>
    <ContactForm  data={data[0]}/>
</section>

<style scoped>
    section {
        max-width: 60%;
        place-self: center;

            }
</style>
