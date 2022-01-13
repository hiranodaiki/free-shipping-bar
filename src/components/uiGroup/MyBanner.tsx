import { Banner, Layout } from "@shopify/polaris";
import useBanner from "@/hooks/useBanner";

const MyBanner = () => {
  const { bannerDisplay, deleteBanner } = useBanner();

  return (
    bannerDisplay && (
      <Layout.Section>
        <Banner title="初期設定を行いましょう" onDismiss={deleteBanner}>
          <p>アプリの導入方法を参考にセットアップを行ってください。</p>
        </Banner>
      </Layout.Section>
    )
  );
};

export default MyBanner;
