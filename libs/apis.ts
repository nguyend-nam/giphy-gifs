import qs from "qs";
import { INFINITE_LOAD_PAGE_SIZE } from "../constants";
import {
  GetGifByIDRequest,
  GetGifByIDResponse,
  GetGifsBySearchTermRequest,
  GetSearchSuggestionsRequest,
  GetSearchSuggestionsResponse,
  GetTrendingGifsRequest,
  GetTrendingGifsResponse,
} from "../types";
import fetcher from "./fetcher";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export interface Response<T> {
  data: T;
}

type Headers = Record<string, string>;

// keys for swr
export const GET_PATHS = {};

class Client {
  headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  public get formDataHeaders(): Headers {
    const cloned = Object.assign({}, this.headers) as Headers;
    delete cloned["Content-Type"];
    return cloned;
  }

  public getTrendingGifs({
    limit = INFINITE_LOAD_PAGE_SIZE,
    offset = 0,
    rating = "pg-13",
    bundle = "messaging_non_clips",
  }: GetTrendingGifsRequest) {
    return fetcher<GetTrendingGifsResponse>(
      `${BASE_URL}/gifs/trending?${qs.stringify({
        api_key: API_KEY,
        limit,
        offset,
        rating,
        bundle,
      })}`,
      {
        method: "GET",
        headers: {
          ...this.headers,
        },
      }
    );
  }

  public getSearchSuggestions({ term }: GetSearchSuggestionsRequest) {
    return fetcher<GetSearchSuggestionsResponse>(
      `${BASE_URL}/tags/related/${term}?${qs.stringify({
        api_key: API_KEY,
      })}`,
      {
        method: "GET",
        headers: {
          ...this.headers,
        },
      }
    );
  }

  public getGifsBySearchTerm({
    q,
    limit = INFINITE_LOAD_PAGE_SIZE,
    offset = 0,
    rating = "pg-13",
    bundle = "messaging_non_clips",
  }: GetGifsBySearchTermRequest) {
    return fetcher<GetTrendingGifsResponse>(
      `${BASE_URL}/gifs/search?${qs.stringify({
        api_key: API_KEY,
        q,
        limit,
        offset,
        rating,
        bundle,
        lang: "en",
      })}`,
      {
        method: "GET",
        headers: {
          ...this.headers,
        },
      }
    );
  }

  public getGifByID({ id, rating = "pg-13" }: GetGifByIDRequest) {
    return fetcher<GetGifByIDResponse>(
      `${BASE_URL}/gifs/${id}?${qs.stringify({
        api_key: API_KEY,
        rating,
      })}`,
      {
        method: "GET",
        headers: {
          ...this.headers,
        },
      }
    );
  }
}

const client = new Client();

export { client };
