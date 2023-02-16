<svelte:options immutable={true} />

<script>
	import Button from './Button.svelte';
	import {
		createEventDispatcher,
		onMount,
		onDestroy,
		beforeUpdate,
		afterUpdate,
	} from 'svelte';
	import FaRegTrashAlt from 'svelte-icons/fa/FaRegTrashAlt.svelte';

	// onMount(() => {
	// 	console.log('Mounted');
	// 	return () => {
	// 		console.log('Destroyed 2');
	// 	};
	// });

	// onDestroy(() => {
	// 	console.log('Destroyed');
	// });

	// beforeUpdate(() => {
	// 	if (listDiv) {
	// 		console.log(listDiv.offsetHeight);
	// 	}
	// });

	afterUpdate(() => {
		if (autoscroll) listDiv.scrollTo(0, listDivScrollHeight);
		autoscroll = false;
	});

	export let todos = [];
	let prevTodos = todos;
	let inputText = '';
	let input, listDiv, autoscroll, listDivScrollHeight;

	const dispatch = createEventDispatcher();

	$: {
		autoscroll = todos.length > prevTodos.length;
		prevTodos = todos;
	}

	export function clearInput() {
		inputText = '';
	}
	export function focusInput() {
		input.focus();
	}

	function handleAddTodo() {
		const isNotCancelled = dispatch(
			'addtodo',
			{
				title: inputText,
			},
			{ cancelable: true }
		);
		if (isNotCancelled) {
			inputText = '';
		}
	}

	function handleRemoveTodo(id) {
		dispatch('removetodo', {
			id,
		});
	}

	function handleToggleTodo(id, value) {
		dispatch('toggletodo', {
			id,
			value,
		});
	}
</script>

<div class="todo-list-wrapper">
	<div class="todo-list" bind:this={listDiv}>
		<div bind:offsetHeight={listDivScrollHeight}>
			{#if todos.length === 0}
				<p class="no-items-text">No todos yet</p>
			{:else}
				<ul>
					{#each todos as { id, title, completed } (id)}
						<!-- {@debug id, title} -->
						<!-- {@const number = index + 1} -->
						<li class:completed>
							<label>
								<input
									on:input={(event) => {
										event.currentTarget.checked = completed;
										handleToggleTodo(id, !completed);
									}}
									type="checkbox"
									checked={completed}
								/>
								{title}
							</label>
							<button
								class="remove-todo-button"
								arial-label="Remove todo: {title}"
								on:click={() => handleRemoveTodo(id)}
							>
								<span style:width="10px" style:display="inline-block"
									><FaRegTrashAlt /></span
								>
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
	<form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
		<!-- <input bind:this={input} /> -->
		<!-- <input
			on:input={(e) => {
				inputText = e.currentTarget.value;
			}}
		/> -->
		<input bind:this={input} bind:value={inputText} placeholder="New Todo" />
		<Button type="submit" disabled={!inputText}>Add</Button>
	</form>
</div>

<style>
	.todo-list {
		max-height: 150px;
		overflow: auto;
	}
</style>
