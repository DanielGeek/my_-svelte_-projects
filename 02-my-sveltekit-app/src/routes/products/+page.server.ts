import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	console.log('Products Load Function.');
	const parentData = await parent();
	console.log(parentData);
	const products = await (await import('$lib/dummy-products.json')).default;
	return {
		products
	};
};
