<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
		import Three from '../three/three.svelte'
		let loaded = false;

		const dispatchLoaded = () => loaded = true;

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<div class="welcome">
	</div>
	<h1>
		HIGHER <br/>PERSPECTIVE <br/> DRONING
	</h1>
	<Three on:loaded={dispatchLoaded} />
	{#if !loaded}
			<p>Loading</p>
	{/if}
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
		backdrop-filter: blur(2px);
	}

	@media (max-width: 480px) {
		h1 {
			font-size: 3rem;
		}
	}
	
</style>
