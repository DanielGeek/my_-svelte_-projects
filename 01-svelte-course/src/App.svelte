<script>
	// import Counter from './lib/Counter.svelte';
	// import Button from './lib/Button.svelte';
	// import FaAngellist from 'svelte-icons/fa/FaAngellist.svelte';
	// import FaAllergies from 'svelte-icons/fa/FaAllergies.svelte';

	import TodoList from './lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';

	let todos = [
		{
			id: uuid(),
			title: 'Todo 1',
			completed: true,
		},
		{
			id: uuid(),
			title: 'Todo 2',
			completed: false,
		},
		{
			id: uuid(),
			title: 'Todo 3',
			completed: true,
		},
	];
	$: console.log(todos);
	// const props = {
	//   maxCount: 10,
	//   initialCount: 5
	// };
</script>

<h2>{todos.length} Todos</h2>
<TodoList bind:todos />

<button
	on:click={() => {
		todos = [];
	}}
	>Update todos
</button>

<!-- <Button
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
</Button> -->

<!-- <Counter {...props} x="y" /> -->
<style>
</style>
