import { Image } from "antd";
import { ReactElement } from "react";
import { useFetchTrendingGifs } from "../../../hooks/useFetchTrendingGifs";
import { Masonry } from "react-plock";
import { GifSearch } from "../../common/GifSearch";

export const MainPageView = () => {
  const { data, loading, isFirstLoading } = useFetchTrendingGifs({});

  let content: ReactElement | null = null;

  if (loading || isFirstLoading) {
    content = <>Loading...</>;
  } else if (!loading && !isFirstLoading && (data?.data || []).length === 0) {
    content = <>No gifs found</>;
  } else {
    content = (
      <Masonry
        items={data?.data || []}
        config={{
          columns: [1, 2, 3],
          gap: new Array(3).fill(8),
          media: [640, 768, 1024],
        }}
        render={(item) => (
          <Image
            key={item.id}
            alt={item.title}
            src={item.images.original.url}
            className="object-cover"
          />
        )}
      />
    );
  }

  return (
    <div className="w-screen">
      <GifSearch />
      <div className="w-full">{content}</div>;
    </div>
  );
};
