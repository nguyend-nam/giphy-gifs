import { Avatar, Drawer, Empty, Image, ImageProps, Spin } from "antd";
import { useFetchGifByID } from "../../../hooks/useFetchGifByID";
import isValid from "date-fns/isValid";
import format from "date-fns/format";
import { useId } from "react";
import Link from "next/link";
import { CloseOutlined } from "@ant-design/icons";

interface Props extends ImageProps {
  id: string;
  open?: boolean;
  onClose: () => void;
}

export const GifDetailDrawer = ({ id, open, onClose }: Props) => {
  const uniqueId = useId();
  const { data, isLoading, isFirstLoading } = useFetchGifByID(
    open ? { id } : null
  );

  let detailContent: JSX.Element | null = null;
  if (isLoading || isFirstLoading) {
    detailContent = (
      <div className="h-full w-full flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  } else if (
    !(isLoading || isFirstLoading) &&
    (!data || data?.meta?.status !== 200)
  ) {
    detailContent = (
      <div className="h-full w-full flex justify-center items-center">
        <Empty
          description={
            <div className="text-white text-center">
              Error while fetching data.
              <br />
              Please try again.
            </div>
          }
        />
      </div>
    );
  } else {
    const rowData = {
      ...(data?.data?.import_datetime !== undefined &&
      isValid(new Date(data?.data?.import_datetime))
        ? {
            "Uploaded at": format(
              new Date(data?.data?.import_datetime),
              "dd/MM/yyyy"
            ),
          }
        : {}),
      ...(data?.data?.images?.original.width &&
      data?.data?.images?.original.height
        ? {
            Source: `${data?.data?.images?.original.width}x${data?.data?.images?.original.height} px`,
          }
        : {}),
      Size: `${(
        parseFloat(data?.data?.images?.original?.size || "0") / 1e6
      ).toFixed(1)} MB`,
      Frames: data?.data?.images?.original?.frames || 0,
      Rating: (data?.data?.rating || "").toUpperCase(),
    };

    detailContent = (
      <div className="max-w-screen-lg text-white mx-auto">
        <div className="flex items-center gap-4 w-full">
          {data?.data?.user ? (
            <Avatar
              shape="square"
              className="border-none shrink-0 bg-gradient-to-tr from-indigo-500 to-rose-500"
              src={data?.data?.user?.avatar_url}
              size={64}
            />
          ) : null}
          <div className="flex shrink truncate flex-col gap-0">
            <span className="font-bold text-white text-2xl md:text-3xl truncate text-ellipsis">
              {data?.data.title}
            </span>
            {data?.data?.user ? (
              <div className="space-x-1 truncate">
                <span className="font-medium text-white text-base md:text-lg">
                  {data?.data?.user?.display_name}
                </span>
                <span className="text-white/70 text-sm md:text-base">
                  ({data?.data?.user?.username})
                </span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6 md:mt-12 flex flex-col md:flex-row gap-6 md:gap-8 justify-between">
          <div className="flex-1 shrink-0">
            <div
              className="relative bg-gradient-to-tr from-indigo-500 to-rose-500"
              style={{
                paddingBottom:
                  data?.data?.images.original.height &&
                  data?.data?.images.original.width
                    ? `calc(${parseFloat(
                        data?.data?.images.original.height
                      )} / ${parseFloat(
                        data?.data?.images.original.width
                      )} * 100%)`
                    : "unset",
              }}
            >
              <Image
                alt={uniqueId}
                preview={false}
                className="absolute"
                wrapperClassName="block"
                src={data?.data?.images?.original?.url}
              />
            </div>
          </div>
          <div className="min-w-full md:min-w-[240px] !text-base divide-y divide-indigo-900/50">
            {Object.entries(rowData).map((entry) => (
              <div
                key={entry[0]}
                className="flex justify-between items-center gap-4 py-2.5 border-dashed"
              >
                <span className="!font-light text-sm text-white/70">
                  {entry[0]}:
                </span>
                <span>{entry[1]}</span>
              </div>
            ))}

            <Link
              href={data?.data?.embed_url || "#"}
              target="_blank"
              rel="noreferrer"
              className="!w-full block text-center rounded-md p-2 h-max bg-indigo-500 hover:bg-rose-500 !border-none !shrink-0"
            >
              <span className="font-semibold !text-white uppercase">Embed</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {open ? (
        <CloseOutlined className="text-[20px] blabla z-[9999] !text-white fixed top-[34px] right-[34px]" />
      ) : null}

      <Drawer placement="bottom" closable={false} onClose={onClose} open={open}>
        {detailContent}
      </Drawer>
    </>
  );
};
