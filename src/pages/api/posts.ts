import type { APIRoute } from 'astro';
import { validateAuth, unauthorizedResponse, optionsResponse, corsHeaders } from '../../lib/auth';
import { slugify } from '../../lib/slugify';
import { articles } from '../../data/articles';

// Site URL for absolute image paths
const SITE_URL = 'https://kungfu.family';

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

  const url = new URL(request.url);

  // Parse query parameters with validation
  const categoryParam = url.searchParams.get('category') || '';
  const pageParam = url.searchParams.get('page') || '1';
  const pageSizeParam = url.searchParams.get('pageSize') || '10';

  const page = Math.max(1, parseInt(pageParam, 10) || 1);
  const pageSize = Math.max(1, Math.min(100, parseInt(pageSizeParam, 10) || 10));

  // Sort articles by datePublished descending (newest first)
  const sortedArticles = [...articles].sort((a, b) => {
    return new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime();
  });

  // Filter by category if provided
  let filteredArticles = sortedArticles;
  if (categoryParam) {
    filteredArticles = sortedArticles.filter(article => {
      const articleCategoryId = slugify(article.topic);
      return articleCategoryId === categoryParam;
    });
  }

  // Calculate pagination
  const total = filteredArticles.length;
  const totalPages = Math.ceil(total / pageSize) || 0;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get page of articles
  const pageArticles = filteredArticles.slice(startIndex, endIndex);

  // Transform to response format with absolute image URLs
  const posts = pageArticles.map(article => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    image: `${SITE_URL}${article.image}`,
    topic: {
      id: slugify(article.topic),
      label: article.topic,
    },
  }));

  return new Response(
    JSON.stringify({
      posts,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
      },
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    }
  );
};
