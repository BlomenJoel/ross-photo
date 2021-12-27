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
		import Three from '../three/three.svelte'
		import ContactForm from '$lib/contactForm.svelte';
		export let data;
		let loaded = false;
		console.log('data', data)

		const dispatchLoaded = () => loaded = true;

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1 class="pb-72">
		HIGHER <br/>PERSPECTIVE <br/> DRONING
	</h1>
	<Three on:loaded={dispatchLoaded} />
		<ContactForm data={data[0]}/>
</section>

<style scoped>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
		color:whitesmoke;
		z-index: 2;
		text-align: left;
		margin-left: auto;
		width: auto;
		margin-right:auto;
		font-weight: bolder;
		font-size: 5rem;
		text-shadow: 3px 3px var(--accent-color);
	}
	
	@media (max-width: 480px) {
		h1 {
			font-size: 3rem;
		}
	}
	
</style>
