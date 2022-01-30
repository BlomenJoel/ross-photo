import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import { fetchData } from '../cms/api.json';

export const get = async () => {
	const query = '*[_type == "contactForm"][0]'
    const response = await fetchData(query);
	return { body: response };
};
