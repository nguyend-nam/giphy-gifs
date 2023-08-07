import qs from "qs";
import { GetTrendingGifsRequest, GetTrendingGifsResponse } from "../types";
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

  public getTrendingGifs(params: GetTrendingGifsRequest) {
    const {
      limit = 20,
      offset = 0,
      rating = "g",
      bundle = "messaging_non_clips",
    } = params;
    return fetcher<GetTrendingGifsResponse>(
      `${BASE_URL}/trending?${qs.stringify({
        api_key: API_KEY,
        ...{ limit, offset, rating, bundle },
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
