import { useFetchTrendingGifs } from "../../../hooks/useFetchTrendingGifs";
import { Masonry } from "react-plock";
import { GifSearch } from "../../common/GifSearch";
import { randomItem } from "../../../utils/common";
import cx from "classnames";
import { GifImageItem } from "../../common/GifImageItem";
import { InfiniteScroll } from "../../common/InfiniteScroll";
import { Spin } from "antd";

const IMAGE_BG_PLACEHOLDER = [
  "bg-red-400",
  "bg-emerald-500",
  "bg-yellow-400",
  "bg-purple-500",
  "bg-blue-400",
];

export const MainPageView = () => {
  const { data, loading, isFirstLoading } = useFetchTrendingGifs({
    limit: 25,
  });

  return (
    <div className="max-w-screen-md w-screen mx-auto p-4 pt-0">
      <GifSearch />
      {loading || isFirstLoading ? (
        <div className="h-[50vh] flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <InfiniteScroll
          renderPage={(data) => (
            <Masonry
              items={data || []}
              config={{
                columns: [2, 4],
                gap: new Array(2).fill(8),
                media: [640, 1920],
              }}
              render={(item) => (
                <GifImageItem
                  key={item.id}
                  preview={false}
                  alt={item.title}
                  src={item.images.fixed_height_downsampled.url}
                  className={cx(
                    "object-cover absolute",
                    randomItem(IMAGE_BG_PLACEHOLDER)
                  )}
                  wrapperClassName="block"
                  rootClassName={cx(randomItem(IMAGE_BG_PLACEHOLDER))}
                  containerClassName={cx(
                    "!rounded-lg overflow-hidden relative",
                    randomItem(IMAGE_BG_PLACEHOLDER)
                  )}
                  containerStyle={{
                    paddingBottom: `calc(${parseFloat(
                      item.images.original.height
                    )} / ${parseFloat(item.images.original.width)} * 100%)`,
                  }}
                />
              )}
            />
          )}
          pageSize={25}
          totalItems={data?.pagination?.total_count || 0}
          itemGetter={useFetchTrendingGifs}
        />
      )}
    </div>
  );
};
