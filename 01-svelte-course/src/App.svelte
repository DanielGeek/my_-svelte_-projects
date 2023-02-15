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
<Button
	on:click|once={(event) => {
		alert(true);
	}}
	let:isLeftHovered
	size="small"
	shadow
	disabled
>
	<div style:width="20px" slot="leftContent">
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
