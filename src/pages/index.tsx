import { Page, Layout } from "@shopify/polaris";
import useIndex from "@/hooks/useIndex";
import MyFrame from "@/components/layout/MyFrame";
import MyBanner from "@/components/uiGroup/MyBanner";
import MyLayoutAnnotatedSection from "@/components/uiGroup/MyLayoutAnnotatedSection";

const Index = () => {
  const { deeplink } = useIndex();

  return (
    <MyFrame>
      <Page>
        <Layout>
          <MyBanner />
          <MyLayoutAnnotatedSection
            title="テーマに導入する"
            description="手順に従いアプリを有効化してください。"
            cards={[
              {
                heading: "1. 見出し",
                content:
                  "ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。",
                buttonText: "日本語フォントを有効化",
                buttonUrl: deeplink,
                buttonExternal: true,
              },
              {
                heading: "1. 見出し",
                content:
                  "ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。",
              },
              {
                heading: "1. 見出し",
                content:
                  "ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。",
              },
            ]}
          />
          <MyLayoutAnnotatedSection
            title="日本語フォントを選択する"
            description=""
            cards={[
              {
                heading: "1. 見出し",
                content:
                  "ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。",
                buttonText: "詳しい使い方を見る",
                buttonUrl: "/",
                buttonExternal: true,
              },
            ]}
          />
        </Layout>
      </Page>
    </MyFrame>
  );
};

export default Index;
