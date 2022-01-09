
<!-- <script context="module" lang="ts">
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
    </script> -->

<script lang="ts">
    // export let data;
</script>

<section>
    <nav>
		<ul>
			<li><a sveltekit:prefetch href="/">Start</a></li>
			<li><a sveltekit:prefetch href="/prints">Prints</a></li>
			<li><a sveltekit:prefetch href="/contact">Contact</a></li>
		</ul>
	</nav>

</section>

<style scoped>
    section {
        align-items: baseline;
        margin-left: 10rem;
    }

    li {
        margin-bottom: 1rem;
        font-size: 3rem;
        text-transform: uppercase;
    }
    li:hover {
        transform: translate(1rem);
        transition: all 0.3s ease-out;
    }

    @media (max-width: 480px) {
        section {
            justify-content: end;
            align-self: self-start;
            margin-left: 0;
        }

        li {
            margin-bottom: 0.5rem;
        }
    }
</style>