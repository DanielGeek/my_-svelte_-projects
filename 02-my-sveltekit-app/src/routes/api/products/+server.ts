import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const products = await (await import('$lib/dummy-products.json')).default;

	throw error(401, 'Not authorized');

	// return new Response(JSON.stringify(products), {
	// 	status: 200
	// });
};
