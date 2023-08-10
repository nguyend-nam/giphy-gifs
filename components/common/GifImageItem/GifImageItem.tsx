import { Avatar, Image, ImageProps } from "antd";
import { createRef, CSSProperties, useState } from "react";
import { useIsInViewport } from "../../../hooks/useIsInViewport";
import cx from "classnames";
import { User } from "../../../types";
import { GifDetailDrawer } from "../../pages/main/GifDetailDrawer";

interface Props extends ImageProps {
  id: string;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  showUserInfo?: boolean;
  user?: User;
}

export const GifImageItem = ({
  id,
  containerClassName,
  containerStyle,
  showUserInfo = true,
  user,
  ...rest
}: Props) => {
  const ref = createRef<any>();
  const { isVisible, visibleCounts } = useIsInViewport(ref);
  const [isHovering, setIsHovering] = useState(false);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={showDrawer}
        className={cx("relative", containerClassName)}
        style={containerStyle}
        ref={ref}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        {!isVisible && visibleCounts === 0 ? null : (
          <Image alt={`${user?.avatar_url}`} preview={false} {...rest} />
        )}

        {user && showUserInfo ? (
          <div
            className={cx(
              "absolute flex items-center gap-2 bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-black/0 p-2 opacity-50 transition-all",
              {
                "!opacity-100": isHovering,
              }
            )}
          >
            <Avatar
              shape="square"
              className="border-none shrink-0 bg-gradient-to-tr from-indigo-500 to-rose-500"
              src={user.avatar_url}
              size={36}
            />
            <div
              className={cx(
                "flex items-start shrink truncate flex-col gap-0 opacity-0",
                {
                  "!opacity-100": isHovering,
                }
              )}
            >
              <span className="font-extrabold text-white text-sm truncate text-ellipsis">
                {user.display_name}
              </span>
              <span className="text-white/70 text-xs truncate text-ellipsis">
                {user.username}
              </span>
            </div>
          </div>
        ) : null}
      </button>

      <GifDetailDrawer id={id} open={open} onClose={onClose} {...rest} />
    </>
  );
};
