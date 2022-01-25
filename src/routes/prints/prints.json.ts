import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import { fetchData } from '../../cms/api.json';

export const get: RequestHandler<Locals> = async (request) => {
	const category = request.query.get('category');
	let query = `{'prints':*[_type == "print"]{
		...,
		  categories[]{
			_type == "reference" => {
			"title": @ -> title
		  }
		}
	  }, 'categories': *[_type == 'category']}`;
	if(category !== 'null' && category) {
		query = `{'prints':*[_type == "print" && references(*[_type=="category" && title == "${category}"]._id)]{
		...,
		  categories[]{
			_type == "reference" => {
			"title": @ -> title
		  }
		}
	  }, 'categories': *[_type == 'category']}`
	}
    const response = await fetchData(query);
	return { body: response };
};
