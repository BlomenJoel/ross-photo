import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import { fetchData } from '../../cms/api.json';


export const get: RequestHandler<Locals> = async (request) => {
	const slug = request.query.get('slug');
	const query = `*[_type == "print" && slug == "${slug}"][0]`
    const response = await fetchData(query);
	return { body: response };
};
