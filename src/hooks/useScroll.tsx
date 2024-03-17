import { useEffect, useRef } from 'react';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useScroll = (deps?: any[]) => {
  const scrollRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialize, _] = useOverlayScrollbars({ defer: true });
  const dependencies = deps ? [initialize, ...deps] : [initialize];
  useEffect(() => {
    if (scrollRef.current) {
      initialize(scrollRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencies]);
  return scrollRef;
};
