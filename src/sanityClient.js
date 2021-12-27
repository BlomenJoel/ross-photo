import sanityClient from '@sanity/client';

const token = import.meta.env.VITE_SANITY_TOKEN.toString();
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID.toString();
const dataset = 'production';

export const client = sanityClient({
  projectId,
  dataset,
  useCdn: true,
});

export const previewClient = sanityClient({
  projectId,
  dataset,
  token,
});