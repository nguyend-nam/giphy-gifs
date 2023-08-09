import { createRef } from "react";
import { SWRResponse } from "swr";
import { useIsInViewport } from "../../../hooks/useIsInViewport";
import { TrendingGifItem } from "../../../types";
import cx from "classnames";
import { Spin } from "antd";

interface Props<T> {
  // eslint-disable-next-line no-unused-vars
  renderPage: (data: T) => JSX.Element | null;
  pageSize: number;
  // eslint-disable-next-line no-unused-vars
  itemGetter: (params: any) => SWRResponse<any, any, any>;
  totalItems: number;
  offsetAmount?: number;
  LoadingRender?: () => JSX.Element;
  commonItemGetterParams?: object;
}

export const InfiniteScroll = (props: Props<TrendingGifItem[]>) => {
  const {
    renderPage,
    pageSize,
    itemGetter,
    totalItems,
    offsetAmount = 0,
    LoadingRender,
    commonItemGetterParams,
  } = props;

  const loadingRef = createRef<any>();
  const { isVisible, visibleCounts } = useIsInViewport(loadingRef);

  const currentPageSWR = itemGetter({
    limit: pageSize,
    offset: offsetAmount,
    ...commonItemGetterParams,
  });

  const nextPageSWR = itemGetter(
    !isVisible && visibleCounts === 0
      ? null
      : {
          limit: pageSize,
          offset: offsetAmount + pageSize,
          ...commonItemGetterParams,
        }
  );

  return !currentPageSWR.isLoading ? (
    <>
      {renderPage(currentPageSWR?.data?.data || [])}

      {offsetAmount < totalItems ? (
        <div
          className={cx(
            "h-[100px] w-full bg-transparent flex justify-center items-center overflow-hidden",
            {
              "!opacity-0 !h-4": !nextPageSWR.isLoading,
            }
          )}
          ref={loadingRef}
        >
          {LoadingRender ? (
            <LoadingRender />
          ) : (
            <div className="flex flex-col gap-2 items-center p-2">
              <Spin size="large" />
              <span className="text-indigo-50">Loading More</span>
            </div>
          )}
        </div>
      ) : null}

      {!isVisible && visibleCounts === 0 ? null : (
        <InfiniteScroll {...props} offsetAmount={offsetAmount + pageSize} />
      )}
    </>
  ) : null;
};
