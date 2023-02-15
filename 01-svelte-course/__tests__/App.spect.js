import { render } from '@testing-library/svelte';
import App from '../src/App.svelte';

describe('App', () => {
	it('Snapshot', () => {
		const { component } = render(App);
		expect(component).toMatchSnapshot();
	});

	it('component should be defined', () => {
		const { component } = render(App);
		expect(component).toBeDefined();
	});
});
