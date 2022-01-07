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
		import { slide, fly } from 'svelte/transition';
		import Three from '../three/three.svelte'
		import ContactForm from '$lib/contactForm.svelte';

		export let data;

		const pages = ['start', 'contactForm']

		let loaded = false, show = false, page = 0, transistioning = false;
		type Direction = 'up' | 'down';

		const dispatchLoaded = () => loaded = true;

		const changePage = (direction: Direction, scrolling: boolean) => {
			transistioning = scrolling;
			if(scrolling) {
				if(direction === 'down' && page < pages.length - 1) {
					page ++;
				} else if(direction === 'up' && page > 0) {
					page --;
				}
			} 
		};
</script>

<svelte:head>
	<title>Higher Perspective Droning</title>
</svelte:head>

<section>
	{#if pages[page] === 'start' && !transistioning}
	<div in:fly="{{ duration: 250, y: -300}}" out:slide>
		<h1 class="pb-36">
			HIGHER <br/>PERSPECTIVE <br/> DRONING
		</h1>
		<button on:click="{() => show = !show}">Explore</button>
	</div>
	{:else if pages[page] === 'contactForm' && !transistioning}
	<div in:slide="{{ duration: 250}}" out:slide>
		<ContactForm  data={data[0]}/>
	</div>
	{/if}
	<Three 
		bind:show={show} 
		on:loaded={dispatchLoaded}
		on:scrolled-finished={() => { transistioning = false }}
		on:scrolling-down={() => changePage('down',true)} 
		on:scrolling-up={() => changePage('up',true)} 
	/>
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
