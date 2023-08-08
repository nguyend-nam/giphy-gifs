import { useState } from "react";
import { GifSearch } from "../../common/GifSearch";
import { SearchGifsList } from "./SearchGifsList";
import { TrendingGifsList } from "./TrendingGifsList";

export const MainPageView = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="max-w-screen-lg w-screen mx-auto p-4 pt-0">
      <GifSearch onChange={setSearch} />
      {search.length ? <SearchGifsList query={search} /> : <TrendingGifsList />}
    </div>
  );
};
