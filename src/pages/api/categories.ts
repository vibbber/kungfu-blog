import type { APIRoute } from 'astro';
import { validateAuth, unauthorizedResponse, optionsResponse, corsHeaders } from '../../lib/auth';
import { slugify } from '../../lib/slugify';
import { topics } from '../../data/articles';

// CRITICAL: This makes the endpoint server-rendered (not static)
export const prerender = false;

// Handle CORS preflight requests
export const OPTIONS: APIRoute = async () => {
  return optionsResponse();
};

export const GET: APIRoute = async ({ request }) => {
  // Validate auth
  if (!validateAuth(request)) {
    return unauthorizedResponse();
  }

  // Build categories array from topics
  const categories = topics.map(topic => ({
    id: slugify(topic),
    label: topic,
  }));

  return new Response(
    JSON.stringify({ categories }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    }
  );
};
