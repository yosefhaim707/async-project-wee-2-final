import { createApiResult } from "./apiResultFactory.js";

export class ApiClient {
  constructor(apiConfig) {
    this.apiConfig = apiConfig;
  }

  async searchExternalItems(query) {
    const cleanQuery = String(query ?? "").trim();

    if (!cleanQuery) {
      throw this.createError(400, "query is required");
    }

    try {
      const url = new URL(`${this.apiConfig.baseUrl}${this.apiConfig.searchPath}`);

      if (/^\d+$/.test(cleanQuery)) {
        url.searchParams.set("userId", cleanQuery);
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw this.createError(response.status, "External API search failed");
      }

      const posts = await response.json();
      const results = /^\d+$/.test(cleanQuery)
        ? posts
        : posts.filter((post) => this.postMatchesQuery(post, cleanQuery));

      return results
        .slice(0, this.apiConfig.maxSearchResults)
        .map((post) => this.normalizeExternalItem(post));
    } catch (error) {
      if (error.statusCode) {
        throw error;
      }

      throw this.createError(502, `External API error: ${error.message}`);
    }
  }

  async getExternalItemById(externalId) {
    const cleanExternalId = String(externalId ?? "").trim();

    if (!cleanExternalId) {
      throw this.createError(400, "externalId is required");
    }

    try {
      const safeId = encodeURIComponent(cleanExternalId);
      const url = `${this.apiConfig.baseUrl}${this.apiConfig.itemPath}/${safeId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw this.createError(response.status, "External item was not found");
      }

      const post = await response.json();

      if (!post.id) {
        throw this.createError(404, "External item was not found");
      }

      return this.normalizeExternalItem(post);
    } catch (error) {
      if (error.statusCode) {
        throw error;
      }

      throw this.createError(502, `External API error: ${error.message}`);
    }
  }

  normalizeExternalItem(post) {
    return createApiResult({
      externalId: String(post.id),
      title: post.title,
      description: post.body,
      sourceUrl: `${this.apiConfig.baseUrl}${this.apiConfig.itemPath}/${post.id}`,
      rawData: post,
    });
  }

  postMatchesQuery(post, query) {
    const lowerQuery = query.toLowerCase();
    const searchableText = [
      post.id,
      post.userId,
      post.title,
      post.body,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(lowerQuery);
  }

  createError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  }
}
