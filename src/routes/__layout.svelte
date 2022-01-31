<script lang="ts">
import Footer from '$lib/footer.svelte';

	import Header from '$lib/header/Header.svelte';
	import '../css/app.css';
	
</script>

<Header />

<main>
	<slot />
</main>

<Footer />


<style scoped>
	main {
		margin-top: 6rem;
	}
</style>
