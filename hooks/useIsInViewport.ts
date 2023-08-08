import { useState, useMemo, useEffect, RefObject } from "react";
import { useIsSSR } from "./useIsSSR";

/* 
  This hook is used to detect whether a reference argument is
  inside or outside the viewport and return a boolean.
  In this case, we use this custom hook to trigger showing
  the sticky header when the main header is scrolled outside
  the viewport.
*/

export interface UseIsOnScreenReturn {
  isVisible: boolean;
  visibleCounts: number;
}

export function useIsInViewport(
  ref: RefObject<HTMLDivElement>
): UseIsOnScreenReturn {
  const [isIntersecting, setIntersecting] = useState(false);
  const [appearTimes, setAppearTimes] = useState(0);
  const isSSR = useIsSSR();

  useEffect(() => {
    if (isIntersecting) {
      setAppearTimes(appearTimes + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting]);

  const observer = useMemo(() => {
    if (isSSR) {
      return undefined;
    }
    const obs = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );
    return obs;
  }, [isSSR]);

  useEffect(() => {
    if (ref?.current) {
      observer?.observe(ref?.current as Element);
    }
    return () => {
      observer?.disconnect();
    };
  }, [observer, ref]);

  return { isVisible: isIntersecting, visibleCounts: appearTimes };
}
