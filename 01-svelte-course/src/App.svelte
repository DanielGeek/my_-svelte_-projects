<script>
	// import Counter from './lib/Counter.svelte';
	// import Button from './lib/Button.svelte';
	// import FaAngellist from 'svelte-icons/fa/FaAngellist.svelte';
	// import FaAllergies from 'svelte-icons/fa/FaAllergies.svelte';

	import TodoList from './lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';
	import { onMount, tick } from 'svelte';
	import { fly, slide, blur } from 'svelte/transition';
	import { cubicInOut, bounceInOut } from 'svelte/easing';

	let todoList;
	let showList = true;

	let todos = null;
	let error = null;
	let isLoading = false;
	let isAdding = false;
	let disabledItems = [];
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
		isAdding = true;
		await fetch('https://jsonplaceholder.typicode.com/todos', {
			method: 'POST',
			body: JSON.stringify({
				title: event.detail.title,
				completed: false,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}).then(async (response) => {
			if (response.ok) {
				const todo = await response.json();
				todos = [...todos, { ...todo, id: uuid() }];
				todoList.clearInput();
			} else {
				alert('An error has ocurred.');
			}
		});
		isAdding = false;
		await tick();
		todoList.focusInput();
	}

	async function handleRemoveTodo(event) {
		const id = event.detail.id;
		if (disabledItems.includes(id)) return;
		disabledItems = [...disabledItems, id];
		await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'DELETE',
		}).then((response) => {
			if (response.ok) {
				todos = todos.filter((t) => t.id !== event.detail.id);
			} else {
				alert('An error has ocurred.');
			}
		});
		disabledItems = disabledItems.filter((itemId) => itemId !== id);
	}

	async function handleToggleTodo(event) {
		const id = event.detail.id;
		const value = event.detail.value;
		if (disabledItems.includes(id)) return;
		disabledItems = [...disabledItems, id];
		await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				completed: value,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}).then(async (response) => {
			if (response.ok) {
				const updatedTodo = await response.json();
				todos = todos.map((todo) => {
					if (todo.id === id) {
						return updatedTodo;
					}
					return { ...todo };
				});
			} else {
				alert('An error has ocurred.');
			}
		});

		disabledItems = disabledItems.filter((itemId) => itemId !== id);
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
	<div
		in:slide={{ duration: 700, easing: cubicInOut }}
		out:blur={{ amount: 10, duration: 700 }}
		on:introstart={() => console.log('introstart')}
		on:introend={() => console.log('introend')}
		on:outrostart={() => console.log('outrostart')}
		on:outroend={() => console.log('outroend')}
		style:max-width="400px"
	>
		<TodoList
			{todos}
			{error}
			{isLoading}
			{disabledItems}
			disableAdding={isAdding}
			bind:this={todoList}
			on:addtodo={handleAddTodo}
			on:removetodo={handleRemoveTodo}
			on:toggletodo={handleToggleTodo}
			let:todo
			let:handleToggleTodo
			let:index
		>
			<svelte:fragment slot="title">{index + 1}- {todo.title}</svelte:fragment>
			<!-- {@const { id, completed, title } = todo} -->
			<!-- <Todo {todo} on:remove on:toggle /> -->
			<!-- <div>
				<input
					disabled={disabledItems.includes(id)}
					on:input={(event) => {
						event.currentTarget.checked = completed;
						handleToggleTodo(id, !completed);
					}}
					type="checkbox"
					checked={completed}
				/>
				{title}
			</div> -->
		</TodoList>
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
