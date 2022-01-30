import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import { fetchData } from '../../cms/api.json';

export const get: RequestHandler<Locals> = async (request) => {
	const ids = request.query.getAll('id');
    const idArray = ids.map(id => `"${id}"`).join(',')
	const query = `*[_type == "print" && _id in [${idArray}]]`;
    
    const response = await fetchData(query);
	return { body: response };
};
