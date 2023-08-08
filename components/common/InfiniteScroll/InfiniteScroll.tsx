import { createRef, ReactElement } from "react";
import { SWRResponse } from "swr";
import { useIsInViewport } from "../../../hooks/useIsInViewport";
import { TrendingGifItem } from "../../../types";
import cx from "classnames";
import { Spin } from "antd";

interface Props<T> {
  // eslint-disable-next-line no-unused-vars
  renderPage: (data: T) => ReactElement | null;
  pageSize: number;
  // eslint-disable-next-line no-unused-vars
  itemGetter: (params: any) => SWRResponse<any, any, any>;
  totalItems: number;
  renderedAmount?: number;
  LoadingRender?: () => JSX.Element;
}

export const InfiniteScroll = (props: Props<TrendingGifItem[]>) => {
  const {
    renderPage,
    pageSize,
    itemGetter,
    totalItems,
    renderedAmount = 0,
    LoadingRender,
  } = props;

  const loadingRef = createRef<any>();
  const { isVisible, visibleCounts } = useIsInViewport(loadingRef);

  const currentPageSWR = itemGetter({
    limit: pageSize,
    offset: renderedAmount,
  });

  const nextPageSWR = itemGetter(
    !isVisible && visibleCounts === 0
      ? null
      : {
          limit: pageSize,
          offset: renderedAmount + pageSize,
        }
  );

  return !currentPageSWR.isLoading ? (
    <>
      {renderPage(currentPageSWR?.data?.data || [])}

      {renderedAmount < totalItems ? (
        <div
          className={cx(
            "h-[100px] w-full bg-transparent flex justify-center items-center overflow-hidden",
            {
              "!opacity-0 !h-2": !nextPageSWR.isLoading,
            }
          )}
          ref={loadingRef}
        >
          {LoadingRender ? (
            <LoadingRender />
          ) : (
            <div className="flex flex-col gap-2 items-center p-2">
              <Spin size="large" />
              <span className="text-white">Loading More</span>
            </div>
          )}
        </div>
      ) : null}

      {!isVisible && visibleCounts === 0 ? null : (
        <InfiniteScroll {...props} renderedAmount={renderedAmount + pageSize} />
      )}
    </>
  ) : null;
};
