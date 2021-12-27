import { client, previewClient } from '../sanityClient';
export let useClient = client

export const fetchData = async (query:string, preview?: string):Promise<string> => {
    useClient = preview === 'preview' ? previewClient : client;
    const data = await useClient.fetch(query)
    return data
}