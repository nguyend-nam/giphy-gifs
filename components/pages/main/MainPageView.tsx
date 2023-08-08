import { GifSearch } from "../../common/GifSearch";
import { TrendingGifsList } from "./TrendingGifsList";

export const MainPageView = () => {
  return (
    <div className="max-w-screen-lg w-screen mx-auto p-4 pt-0">
      <GifSearch />
      <TrendingGifsList />
    </div>
  );
};
