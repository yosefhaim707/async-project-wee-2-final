import { createApiResult } from "./apiResultFactory.js";

export function createApiClient(apiConfig) {
  async function searchExternalItems(query) {
    const cleanQuery = String(query ?? "").trim();

    if (!cleanQuery) {
      throw createError(400, "query is required");
    }

    try {
      const url = new URL(`${apiConfig.baseUrl}${apiConfig.searchPath}`);
      const response = await fetch(url);

      if (!response.ok) {
        throw createError(response.status, "External API search failed");
      }

      const posts = await response.json();
      const results = posts.filter((post) => postMatchesQuery(post, cleanQuery));

      return results
        .slice(0, apiConfig.maxSearchResults)
        .map((post) => normalizeExternalItem(post));
    } catch (error) {
      if (error.statusCode) {
        throw error;
      }

      throw createError(502, `External API error: ${error.message}`);
    }
  }

  async function getExternalItemById(externalId) {
    const cleanExternalId = String(externalId ?? "").trim();

    if (!cleanExternalId) {
      throw createError(400, "externalId is required");
    }

    try {
      const safeId = encodeURIComponent(cleanExternalId);
      const url = `${apiConfig.baseUrl}${apiConfig.itemPath}/${safeId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw createError(response.status, "External item was not found");
      }

      const post = await response.json();

      if (!post.id) {
        throw createError(404, "External item was not found");
      }

      return normalizeExternalItem(post);
    } catch (error) {
      if (error.statusCode) {
        throw error;
      }

      throw createError(502, `External API error: ${error.message}`);
    }
  }

  function normalizeExternalItem(post) {
    return createApiResult({
      externalId: String(post.id),
      title: post.title,
      description: post.body,
      sourceUrl: `${apiConfig.baseUrl}${apiConfig.itemPath}/${post.id}`,
      rawData: post,
    });
  }

  function postMatchesQuery(post, query) {
    const lowerQuery = query.toLowerCase();
    const searchableText = [
      post.id,
      post.title,
      post.body,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(lowerQuery);
  }

  function createError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  }

  return {
    searchExternalItems,
    getExternalItemById,
    normalizeExternalItem,
  };
}
