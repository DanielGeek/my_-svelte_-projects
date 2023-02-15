import { render } from '@testing-library/svelte';
import App from '../src/App.svelte';

describe('App', () => {
	it('renders the component with the correct name and image source', async () => {
		const { component, container } = render(App, {
			props: {
				name: 'Svelte',
				src: 'http://picsum.com/200/',
			},
		});

		expect(container.querySelector('img')).toHaveAttribute(
			'src',
			'http://picsum.com/200/'
		);
		expect(container.querySelector('h1')).toHaveTextContent('Hello svelte!');
	});

	it('renders the component with the correct html string', async () => {
		const { component, container } = render(App, {
			props: {
				string: 'Some <strong>string</strong> with html.',
			},
		});

		expect(container.querySelector('p')).toContainHTML(
			'Some <strong>string</strong> with html.'
		);
	});
});
