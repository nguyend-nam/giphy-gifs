import { client } from "../libs/apis";
import { GetGifByIDRequest } from "../types";
import { useFetchWithCache } from "./useFetchWithCache";

const GET_GIF_BY_ID_KEY = "GET_GIF_BY_ID";

export const useFetchGifByID = (params: GetGifByIDRequest | null) => {
  return useFetchWithCache(
    params === null || !params.id
      ? null
      : [GET_GIF_BY_ID_KEY, JSON.stringify(params)],
    () => client.getGifByID(params || { id: "" })
  );
};
