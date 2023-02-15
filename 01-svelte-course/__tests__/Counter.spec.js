import { render, fireEvent } from '@testing-library/svelte';
import Counter from '../src/lib/Counter.svelte';

describe('Counter', () => {
	it('Snapshot', () => {
		const { component } = render(Counter);
		expect(component).toMatchSnapshot();
	});
	it('renders with default values', async () => {
		const { getByTestId } = render(Counter, {
			props: {
				initialCount: 0,
				maxCount: undefined,
			},
		});
		const button = getByTestId('counter');
		expect(button).toHaveTextContent('Clicks: 0');
	});

	it('increments count when button is clicked', async () => {
		const { getByTestId } = render(Counter, {
			props: {
				initialCount: 0,
				maxCount: undefined,
			},
		});

		const button = getByTestId('counter');

		await fireEvent.click(button);
		await fireEvent.click(button);
		await fireEvent.click(button);

		expect(button).toHaveTextContent('Clicks: 3');
		// expect(container.querySelector('h3')).toHaveTextContent(
		// 	'You have clicked 1 times.'
		// );
	});

	it('does not increment count beyond maxCount', async () => {
		const { getByTestId } = render(Counter, {
			props: {
				initialCount: 0,
				maxCount: 3,
			},
		});

		const button = getByTestId('counter');

		await fireEvent.click(button);
		await fireEvent.click(button);
		await fireEvent.click(button);
		await fireEvent.click(button);

		expect(button).toHaveTextContent('Clicks: 3');
	});
});
