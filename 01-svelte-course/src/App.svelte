<script>
	// import Counter from './lib/Counter.svelte';
	import Button from './lib/Button.svelte';
	import FaAngellist from 'svelte-icons/fa/FaAngellist.svelte';
	import FaAllergies from 'svelte-icons/fa/FaAllergies.svelte';

	// const props = {
	//   maxCount: 10,
	//   initialCount: 5
	// };
</script>

<!-- <Counter {...props} x="y" /> -->
<Button let:isLeftHovered size="small" shadow>
	<div style:width="20px" slot="leftContent" let:x>
		{x}
		{#if isLeftHovered}
			<FaAngellist />
		{:else}
			<FaAllergies />
		{/if}
	</div>
	Button Text
</Button>

<style>
</style>
