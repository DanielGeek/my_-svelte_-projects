import Button from '../src/lib/Button.svelte';
import { render } from '@testing-library/svelte';

describe('Button', () => {
	it('Snapshot', () => {
		const { component } = render(Button);
		expect(component).toMatchSnapshot();
	});
	it('should render a button with default props', () => {
		const { getByText } = render(Button);

		const button = getByText('Fallback');

		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('size-sm');
		expect(button).not.toHaveClass('size-lg');
		expect(button).not.toHaveClass('shadow');
		expect(button).toHaveStyle('background-color: inherit');
		expect(button).toHaveStyle('color: inherit');
	});

	it('should render a button with custom props', () => {
		const { getByText } = render(Button, {
			props: {
				size: 'large',
				shadow: true,
				bgColor: 'red',
				textColor: 'white',
			},
		});

		const button = getByText('Fallback');

		expect(button).toBeInTheDocument();
		expect(button).not.toHaveClass('size-sm');
		expect(button).toHaveClass('size-lg');
		expect(button).toHaveClass('shadow');
		expect(button).toHaveStyle('background-color: red');
		expect(button).toHaveStyle('color: white');
	});
});
