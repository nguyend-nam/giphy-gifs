import { Image, ImageProps } from "antd";
import { createRef, CSSProperties, useId } from "react";
import { useIsInViewport } from "../../../hooks/useIsInViewport";

interface Props extends ImageProps {
  containerClassName?: string;
  containerStyle?: CSSProperties;
}

export const GifImageItem = ({
  containerClassName,
  containerStyle,
  ...rest
}: Props) => {
  const uniqueId = useId();
  const ref = createRef<any>();
  const { isVisible, visibleCounts } = useIsInViewport(ref);

  return (
    <div className={containerClassName} style={containerStyle} ref={ref}>
      {!isVisible && visibleCounts === 0 ? null : (
        <Image alt={uniqueId} preview={false} {...rest} />
      )}
    </div>
  );
};
