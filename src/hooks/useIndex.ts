import { shopUrlState } from "@/lib/atom/shopUrl";
import { createDeeplink } from "@/lib/deeplink";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

type IndexType = { deeplink: string };

const useIndex = (): IndexType => {
  const router = useRouter();
  const [shopUrl, setShopUrl] = useRecoilState(shopUrlState);

  useEffect(() => {
    // 初回の1回だけrecoilの管理に入れる
    shopUrl || setShopUrl(router.query.shop as string);
  }, []);

  const deeplink: string = createDeeplink(shopUrl);

  return { deeplink };
};

export default useIndex;
