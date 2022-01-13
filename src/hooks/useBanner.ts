import { useCallback, useState } from "react";

type BannerType = {
  bannerDisplay: boolean;
  deleteBanner: () => void;
};

const useBanner = (): BannerType => {
  const [bannerDisplay, setBannerDisplay] = useState(true);

  const deleteBanner = useCallback(() => setBannerDisplay((prev) => !prev), []);

  return {
    bannerDisplay,
    deleteBanner,
  };
};

export default useBanner;
