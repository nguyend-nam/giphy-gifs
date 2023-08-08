import { Masonry } from "react-plock";
import { randomItem } from "../../../utils/common";
import { GifImageItem } from "../../common/GifImageItem";
import { InfiniteScroll } from "../../common/InfiniteScroll";
import { Empty, Spin } from "antd";
import { TrendingGifItem } from "../../../types";
import { useEffect, useState } from "react";
import { useFetchGifsBySearchTerm } from "../../../hooks/useFetchGifsBySearchTerm";
import {
  IMAGE_BG_PLACEHOLDER,
  INFINITE_LOAD_PAGE_SIZE,
} from "../../../constants";

interface Props {
  query: string;
}

export const SearchGifsList = ({ query }: Props) => {
  const { data, loading, isFirstLoading } = useFetchGifsBySearchTerm({
    q: query,
    limit: INFINITE_LOAD_PAGE_SIZE,
  });

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
            render={(item) => <GifImageItemRender item={item} />}
          />
        )}
        pageSize={INFINITE_LOAD_PAGE_SIZE}
        totalItems={data?.pagination?.total_count || 0}
        itemGetter={useFetchGifsBySearchTerm}
        commonItemGetterParams={{ q: query }}
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
      src={item.images.fixed_height_downsampled.url}
      className="object-cover absolute"
      wrapperClassName="block"
      containerClassName="!rounded-md overflow-hidden relative"
      containerStyle={{
        paddingBottom: `calc(${parseFloat(
          item.images.original.height
        )} / ${parseFloat(item.images.original.width)} * 100%)`,
        backgroundColor: bgColor,
      }}
    />
  );
};
