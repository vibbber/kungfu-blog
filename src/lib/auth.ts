/**
 * Validates the Authorization header for API requests.
 * Expected format: "Bearer <secret>"
 *
 * Returns true if valid, false otherwise.
 */
export function validateAuth(request: Request): boolean {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return false;
  }

  // Expected format: "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return false;
  }

  const token = parts[1];
  // Note: process.env is more reliable in Netlify Functions; import.meta.env is fallback
  const expectedSecret = process.env.BLOG_API_SECRET ?? import.meta.env.BLOG_API_SECRET ?? 'kf-blog-api-2026-shared-secret';

  return token === expectedSecret;
}

/**
 * Standard CORS headers for API responses.
 * Required because netlify.toml headers do NOT apply to serverless functions.
 */
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
};

/**
 * Returns a 401 Unauthorized JSON response with CORS headers.
 */
export function unauthorizedResponse(): Response {
  return new Response(
    JSON.stringify({ error: 'Unauthorized' }),
    {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    }
  );
}

/**
 * Returns a 200 OK response for OPTIONS preflight requests.
 */
export function optionsResponse(): Response {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}
