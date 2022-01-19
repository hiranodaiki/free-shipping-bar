import { useAppBridge } from "@shopify/app-bridge-react";
import { Banner, Frame, Layout, List, Page } from "@shopify/polaris";
import { Redirect } from "@shopify/app-bridge/actions";

const GraphQLExceptionError = ({ shop }) => {
  const app = useAppBridge();
  return (
    <Frame>
      <Page>
        <Layout>
          <Layout.Section>
            <Banner
              title="このページを表示する権利が必要です"
              action={{
                content: "ストアに戻る",
                onAction: () => {
                  console.log("やり申した");
                  const redirect = Redirect.create(app);
                  const reidrectUrl = "https://" + shop + "/admin";
                  redirect.dispatch(Redirect.Action.REMOTE, reidrectUrl);
                },
              }}
              status="warning"
            >
              <List>
                <List.Item>
                  このページにアクセスするためには、ストアのオーナー権限が必要です。
                </List.Item>
                <List.Item>
                  あなたがコラボレーターである場合、アカウントオーナーにメールを送信してください。
                </List.Item>
              </List>
            </Banner>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
};
export default GraphQLExceptionError;
