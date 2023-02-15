<script>
	// import Counter from './lib/Counter.svelte';
	import Button from './lib/Button.svelte';
	import FaAngellist from 'svelte-icons/fa/FaAngellist.svelte';

	// const props = {
	//   maxCount: 10,
	//   initialCount: 5
	// };
</script>

<!-- <Counter {...props} x="y" /> -->
<Button size="small" shadow>
	<div style:width="20px" slot="leftContent"><FaAngellist /></div>
	Button Text
</Button>

<style>
</style>
