<script lang="ts">
		import Three from '../three/three.svelte'
		import ContactForm from '../lib/contactForm.svelte'
		import Prints from './prints/index.svelte'
		let loaded = false, show = false, page = undefined, contactData = undefined, printsData = undefined;
		
		const getData = async (section) => {
			if(section === 'contact') {
				if(!contactData) {
					contactData = await fetch('initial.json').then(res => res.json())
				}
				page = 'contact'; 
			} else if(section === 'prints') {
				if(!printsData) {
					printsData = await fetch('./prints/prints.json').then(res => res.json());
				}
				page = 'prints'; 
			}
		}
		const dispatchLoaded = () => loaded = true;
</script>

<svelte:head>
	<title>Higher Perspective Droning</title>
</svelte:head>

<div class="self-center">
	{#if !show} 
	<div class="sm:flex page-selection">
		<button on:click="{() => show = !show}" class="inline-flex mr-24" >Exciting explore<img alt="drone" src="/drone.png" class="icon"/> </button>
		<a href="explore">
			<button class="text-black sm:mt-0 mt-8">Simple explore</button>
		</a>
	</div>
	{/if}
	<section class="first-page">
		<h1 class="pb-36 text-left">
			HIGHER <br/>PERSPECTIVE <br/> DRONING
		</h1>
	</section>
	{#if show} 
	<section>
		{#if page === 'contact'}
		<ContactForm  data={contactData}/>
		{:else}
		<div on:click={() => { getData('contact')}} class="w-full">
			<h1 class="cursor-pointer text-center">
				CONTACT
			</h1>	
		</div>
		{/if}
	</section>
	<section>
		{#if page === 'prints'}
		<Prints allPrints={printsData.prints} categories={printsData.categories}
		redirect={false}
		horizontal={true}/>
		{:else}
		<div on:click={() => { getData('prints')}} class="w-full">
			<h1 class="cursor-pointer text-center">
				PRINTS
			</h1>	
		</div>
		{/if}
	</section>
	{/if}
	<Three 
		bind:show={show} 
		on:loaded={() => dispatchLoaded()}
	/>
</div>

<style scoped>
.first-page {
	height: 80vh !important;  /* Fixed height to match header */
}
.page-selection {
	position: fixed;
	bottom: 10rem;
	z-index: 2;
}
section
{
    display: flex;
    align-items: start;
    height: 100vh;
    position: relative;
}
h1 {
	width: 100%;
	color:whitesmoke;
	z-index: 2;
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

	.page-selection {
		bottom: 4rem;
	}
}	
</style>
