import { useState, useEffect, useRef } from 'react';

type Resolutions = 1920 | 1400 | 1024 | 768 | 360 | null

const calcSize = (): Resolutions =>
  window.innerWidth >= 1920
    ? 1920
    : window.innerWidth >= 1400
      ? 1400
      : window.innerWidth >= 1024
        ? 1024
        : window.innerWidth >= 768
          ? 768
          : 360;

const useResponsive = (): number | null => {

  const [resolutionCategory, setResolutionCategory] =
    useState<Resolutions>(null);
  const timeOutId = useRef<any>(null);

  const action = (): void => setResolutionCategory(calcSize());

  const actionWithLastResize = (): void => {

    if (timeOutId.current) clearTimeout(timeOutId.current);
    timeOutId.current = setTimeout(() => action(), 100);

  };

  useEffect(() => {

    action();
    window.addEventListener('resize', actionWithLastResize);

    return () => {

      window.removeEventListener('resize', actionWithLastResize);

    };

  }, []);

  return resolutionCategory;

};

export default useResponsive;
