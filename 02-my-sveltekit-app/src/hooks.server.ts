import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// this code run in every request
export const handle1: Handle = async ({ event, resolve }) => {
	const { url } = event;
	// if (url.pathname === '/products') {
	// 	return new Response('Custom response');
	// }
	const response = await resolve(event);

	// response.headers.set('x-custom-header', 'value');

	return response;
};

export const handle = sequence(handle1);
