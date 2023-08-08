import { client } from "../libs/apis";
import { GetGifsBySearchTermRequest } from "../types";
import { useFetchWithCache } from "./useFetchWithCache";

const SEARCH_GIFS_KEY = "SEARCH_GIFS";

export const useFetchGifsBySearchTerm = (
  params: GetGifsBySearchTermRequest | null
) => {
  return useFetchWithCache(
    params === null || !params.q
      ? null
      : [SEARCH_GIFS_KEY, JSON.stringify(params)],
    () => client.getGifsBySearchTerm(params || { q: "" })
  );
};
