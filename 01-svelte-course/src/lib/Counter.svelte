<script>
	export let initialCount = 0;
	export let maxCount = undefined;

	console.log($$props, $$restProps);

	// 9. Reactive Statements
	// $: string = `Count2 is ${count2}`;

	let count = initialCount;

	function increment() {
		if (count === maxCount) return;
		count += 1;
	}
</script>

<button on:click={increment} data-testid="counter">Clicks: {count} </button>

<style>
	button {
		padding: 15px 20px;
	}
</style>
