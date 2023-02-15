<script>
  let count = 0;
  // let string = `You have clicked ${count} times.`;
  let string;
  // 9. Reactive Statements
  $: string = `You have clicked ${count} times.`;

  $: if (count > 5) {
    console.log(`The count is ${count}`)
  }

  function increment() {
    count += 1;
  }
</script>

<button on:click={increment} data-testid="counter">Clicks: {count}</button>
<h3>{string}</h3>

<style>
  button {
    padding: 15px 20px;
  }
</style>