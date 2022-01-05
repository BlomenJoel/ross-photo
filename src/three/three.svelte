<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	
	export let show;
    const dispatch = createEventDispatcher();
	onMount(() => {
		if(window) {
			const threeImport = () => import('../three/script');
			threeImport().then(test => test.test(dispatch));
		}
	});
</script>

<canvas class="webgl" hidden={!show}></canvas>


<style>
	canvas {
		height: -webkit-fill-available !important;
		width: -webkit-fill-available !important;
		position: absolute;
		margin-left: auto;
		margin-right: auto;
    	top: 0;
    	outline: none;    
		z-index: -1;
	}
</style>