import { useState } from "react";
import { GifSearch } from "../../common/GifSearch";
import { Intro } from "../../common/Intro";
import { SearchGifsList } from "./SearchGifsList";
import { TrendingGifsList } from "./TrendingGifsList";

export const MainPageView = () => {
  const [search, setSearch] = useState("");
  const [searchResultLength, setSearchResultLength] = useState(0);

  return (
    <>
      <div className="max-w-screen-lg w-screen mx-auto p-4 pt-0">
        <GifSearch onChange={setSearch} />
        {search.length ? (
          <div className="pt-4 pb-8">
            <span className="text-2xl mr-4 text-white font-semibold leading-none">
              {search}
            </span>
            <span className="text-white/80 text-sm leading-none">
              {searchResultLength}{" "}
              {searchResultLength > 1 ? "results" : "result"}
            </span>
          </div>
        ) : null}
        {search.length ? (
          <SearchGifsList
            query={search}
            setSearchResultLength={setSearchResultLength}
          />
        ) : (
          <TrendingGifsList />
        )}
      </div>

      <Intro />
    </>
  );
};
