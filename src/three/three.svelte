<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import {test} from './script'
	import { browser } from "$app/env";

	export let show;
    const dispatch = createEventDispatcher();
	// onMount(() => {
	// 	if(window && show) {
	// 		test(dispatch);
	// 	}
	// });
	const tester = () => {
		if(browser && show) {
			test(dispatch)
		}
	}
	$: show, tester()
</script>

<canvas class="webgl" hidden={!show} disabled={!show} /> 


<style>
	canvas {
		width: -webkit-fill-available !important;
 		position: fixed;
		margin-left: auto;
		margin-right: auto;
    	top: 0;
		left:0;
    	outline: none;    
		z-index: -1;
	}
</style>