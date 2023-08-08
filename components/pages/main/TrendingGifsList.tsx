import { useFetchTrendingGifs } from "../../../hooks/useFetchTrendingGifs";
import { Masonry } from "react-plock";
import { randomItem } from "../../../utils/common";
import cx from "classnames";
import { GifImageItem } from "../../common/GifImageItem";
import { InfiniteScroll } from "../../common/InfiniteScroll";
import { Spin } from "antd";
import { TrendingGifItem } from "../../../types";
import { useEffect, useState } from "react";

const IMAGE_BG_PLACEHOLDER = [
  "bg-red-400",
  "bg-emerald-500",
  "bg-yellow-400",
  "bg-purple-500",
  "bg-blue-400",
];

export const TrendingGifsList = () => {
  const { data, loading, isFirstLoading } = useFetchTrendingGifs({
    limit: 25,
  });

  return loading || isFirstLoading ? (
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
          render={(item) => <GifImageItemRender item={item} />}
        />
      )}
      pageSize={25}
      totalItems={data?.pagination?.total_count || 0}
      itemGetter={useFetchTrendingGifs}
    />
  );
};

const GifImageItemRender = ({ item }: { item: TrendingGifItem }) => {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    setBgColor(randomItem(IMAGE_BG_PLACEHOLDER));
  }, []);

  return (
    <GifImageItem
      key={item.id}
      preview={false}
      alt={item.title}
      src={item.images.fixed_height_downsampled.url}
      className={cx("object-cover absolute")}
      wrapperClassName="block"
      containerClassName={cx("!rounded-lg overflow-hidden relative", bgColor)}
      containerStyle={{
        paddingBottom: `calc(${parseFloat(
          item.images.original.height
        )} / ${parseFloat(item.images.original.width)} * 100%)`,
      }}
    />
  );
};
