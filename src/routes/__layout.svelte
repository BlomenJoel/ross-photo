<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../css/app.css';
</script>

<Header />

<main>
	<slot />
</main>


<style scoped>
	main {
		margin-top: 6rem;
	}
</style>
