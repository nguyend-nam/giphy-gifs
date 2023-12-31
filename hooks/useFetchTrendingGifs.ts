import { client } from "../libs/apis";
import { GetTrendingGifsRequest } from "../types";
import { useFetchWithCache } from "./useFetchWithCache";

const TRENDING_GIFS_KEY = "TRENDING_GIFS";

export const useFetchTrendingGifs = (params: GetTrendingGifsRequest | null) => {
  return useFetchWithCache(
    params === null ? null : [TRENDING_GIFS_KEY, JSON.stringify(params)],
    () => client.getTrendingGifs(params || {})
  );
};
