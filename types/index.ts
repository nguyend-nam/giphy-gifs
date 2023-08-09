export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}

export interface BaseResponse<T> {
  data: T;
  meta: Meta;
}

export interface BaseResponseWithPagination<T> {
  data: T;
  pagination: Pagination;
  meta: Meta;
}

export interface GetTrendingGifsRequest {
  limit?: number;
  offset?: number;
  rating?: "g" | "pg" | "pg-13" | "r";
  bundle?:
    | "messaging_non_clips"
    | "clips_grid_picker"
    | "sticker_layering"
    | "low_bandwidth";
}

export interface GetTrendingGifsResponse
  extends BaseResponseWithPagination<TrendingGifItem[]> {}

export interface TrendingGifItem {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  user: User;
  analytics_response_payload: string;
  analytics: Analytics;
}

export interface Images {
  original: ImageVariant;
  fixed_height: ImageVariant;
  fixed_height_downsampled: ImageVariant;
  fixed_height_small: ImageVariant;
  fixed_width: ImageVariant;
  fixed_width_downsampled: ImageVariant;
  fixed_width_small: ImageVariant;
  fixed_width_still?: ImageVariant;
  preview?: ImageVariant;
}

export interface ImageVariant {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size?: string;
  mp4?: string;
  webp_size: string;
  webp: string;
  frames?: string;
  hash?: string;
}

export interface User {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
}

export interface Analytics {
  onload: AnalyticEvents;
  onclick: AnalyticEvents;
  onsent: AnalyticEvents;
}

export interface AnalyticEvents {
  url: string;
}

export interface GetSearchSuggestionsRequest {
  term: string;
}

export interface GetSearchSuggestionsResponse
  extends BaseResponse<GetSearchSuggestionItem[]> {}

export interface GetSearchSuggestionItem {
  name: string;
  analytics_response_payload: string;
}

export interface GetGifsBySearchTermRequest {
  q: string;
  limit?: number;
  offset?: number;
  rating?: "g" | "pg" | "pg-13" | "r";
  bundle?:
    | "messaging_non_clips"
    | "clips_grid_picker"
    | "sticker_layering"
    | "low_bandwidth";
}

export interface GetGifByIDRequest {
  id: string;
  rating?: "g" | "pg" | "pg-13" | "r";
}

export interface GetGifByIDResponse extends BaseResponse<TrendingGifItem> {}
