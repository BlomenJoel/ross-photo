<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

    const dispatch = createEventDispatcher();
	onMount(() => {
		if(window) {
			const threeImport = () => import('../three/script');
			threeImport().then(test => test.test(dispatch));
		}
	});
</script>

<canvas class="webgl"></canvas>


<style>
	canvas {
		height: -webkit-fill-available;
		width: -webkit-fill-available;
		position: absolute;
		margin-left: auto;
		margin-right: auto;
    	top: 30%;
    	outline: none;    
	}
</style>