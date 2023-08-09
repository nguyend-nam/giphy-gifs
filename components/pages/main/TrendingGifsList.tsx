import { useFetchTrendingGifs } from "../../../hooks/useFetchTrendingGifs";
import { Masonry } from "react-plock";
import { randomItem } from "../../../utils/common";
import { GifImageItem } from "../../common/GifImageItem";
import { InfiniteScroll } from "../../common/InfiniteScroll";
import { Empty, Spin } from "antd";
import { TrendingGifItem } from "../../../types";
import { useEffect, useState } from "react";
import {
  IMAGE_BG_PLACEHOLDER,
  INFINITE_LOAD_PAGE_SIZE,
} from "../../../constants";
import { useIntroContext } from "../../../context/intro";

export const TrendingGifsList = () => {
  const { data, loading, isFirstLoading } = useFetchTrendingGifs({
    limit: INFINITE_LOAD_PAGE_SIZE,
  });
  const { shouldEnd, setShouldEnd } = useIntroContext();

  useEffect(() => {
    if (!shouldEnd) {
      if (!(loading || isFirstLoading)) {
        setShouldEnd?.(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isFirstLoading]);

  let content: JSX.Element | null = null;

  if (loading || isFirstLoading) {
    content = (
      <div className="h-[50vh] flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  } else if ((data?.data || []).length === 0) {
    content = (
      <div className="h-[50vh] flex justify-center items-center">
        <Empty description={<div className="text-white">No gifs found</div>} />
      </div>
    );
  } else {
    content = (
      <InfiniteScroll
        renderPage={(data) => (
          <Masonry
            items={data || []}
            config={{
              columns: [2, 3, 4],
              gap: new Array(3).fill(16),
              media: [640, 1280, 1920],
            }}
            className="min-h-[30vh]"
            render={(item) => <GifImageItemRender item={item} />}
          />
        )}
        pageSize={INFINITE_LOAD_PAGE_SIZE}
        totalItems={data?.pagination?.total_count || 0}
        itemGetter={useFetchTrendingGifs}
      />
    );
  }

  return content;
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
      src={
        item.images?.fixed_width_still?.url ||
        item.images?.fixed_width?.url ||
        item.images?.preview?.url
      }
      className="object-cover absolute bg-transparent"
      wrapperClassName="block"
      containerClassName="!rounded-md overflow-hidden relative"
      containerStyle={{
        paddingBottom: `calc(${parseFloat(
          item.images.original.height
        )} / ${parseFloat(item.images.original.width)} * 100%)`,
        backgroundColor: bgColor,
      }}
      user={item?.user}
    />
  );
};
