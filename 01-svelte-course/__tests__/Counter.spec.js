import { render } from '@testing-library/svelte';
import Counter from '../src/lib/Counter.svelte';

describe('Counter', () => {
	it('Snapshot', () => {
		const { component } = render(Counter);
		expect(component).toMatchSnapshot();
	});
	it('renders with default values', () => {
		const { getByTestId } = render(Counter);
		const button = getByTestId('counter');
		expect(button).toHaveTextContent('Clicks: 0');
	});

	it('increments count when button is clicked', async () => {
		const { getByTestId, container } = render(Counter);
		const button = getByTestId('counter');
		await button.click();
		expect(button).toHaveTextContent('Clicks: 1');
		expect(container.querySelector('h3')).toHaveTextContent(
			'You have clicked 1 times.'
		);
	});
});
