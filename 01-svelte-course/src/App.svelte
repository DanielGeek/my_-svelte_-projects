<script>
	// import Counter from './lib/Counter.svelte';
	// import Button from './lib/Button.svelte';
	// import FaAngellist from 'svelte-icons/fa/FaAngellist.svelte';
	// import FaAllergies from 'svelte-icons/fa/FaAllergies.svelte';

	import TodoList from './lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';
	import { onMount, tick } from 'svelte';

	let todoList;
	let showList = true;

	let todos = null;
	let error = null;
	let isLoading = false;
	// $: console.log(todos);

	onMount(() => {
		loadTodos();
	});

	async function loadTodos() {
		isLoading = true;
		await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then(
			async (response) => {
				if (response.ok) {
					todos = await response.json();
				} else {
					error = 'Failed to load JSON';
				}
			}
		);
		isLoading = false;
	}

	async function handleAddTodo(event) {
		event.preventDefault();
		todos = [
			...todos,
			{
				id: uuid(),
				title: event.detail.title,
				completed: false,
			},
		];
		await tick();
		todoList.clearInput();
	}

	function handleRemoveTodo(event) {
		todos = todos.filter((t) => t.id !== event.detail.id);
	}

	function handleToggleTodo(event) {
		todos = todos.map((todo) => {
			if (todo.id === event.detail.id) {
				return { ...todo, completed: event.detail.value };
			}
			return { ...todo };
		});
	}

	// const props = {
	//   maxCount: 10,
	//   initialCount: 5
	// };
</script>

<label>
	<input type="checkbox" bind:checked={showList} />
	Show/Hide list
</label>
{#if showList}
	<div style:max-width="400px">
		<TodoList
			{todos}
			{error}
			{isLoading}
			bind:this={todoList}
			on:addtodo={handleAddTodo}
			on:removetodo={handleRemoveTodo}
			on:toggletodo={handleToggleTodo}
		/>
	</div>
{/if}

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
