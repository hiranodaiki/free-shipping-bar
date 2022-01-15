import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "next/app";
import { AppProvider } from "@shopify/polaris";
import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
// tailwindcssのスタイルを展開
import "../style/style.css";
//Polarisのスタイルを初期化
// アプリ管理画面のルーティング周りの設定用の自作モジュール
import RoutePropagator from "@/components/layout/RoutePropagator";
// 請求が完了していない時に、請求画面にリダイレクトするための実装に必要なモジュール
import { useRouter } from "next/router";
import { getSubscriptionUrl } from "@/lib/mutations/get-subscription-url";
import { getIsDevelopmentStore } from "@/lib/querys/get-is-development-store";
import { getIsSubscriptionStatusActive } from "@/lib/querys/get-is-subscription-status-active";
import { useState } from "react";
// recoilを導入
import { RecoilRoot } from "recoil";

function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}

function MyProvider(props) {
  const app = useAppBridge();
  const router = useRouter();
  const [isSubscriptionStateActive, setIsSubscriptionStatusActive] = useState(
    false
  );

  const client = new ApolloClient({
    fetch: userLoggedInFetch(app),
    fetchOptions: {
      credentials: "include",
    },
  });

  getIsDevelopmentStore(client).then((isDevelopmentStore) => {
    if (isDevelopmentStore) {
      //開発ストアである場合
      //請求画面へリダイレクトせずに、アプリ管理画面にリダイレクト
      setIsSubscriptionStatusActive(true);
      return;
    }
    //請求画面へのリダイレクト
    getIsSubscriptionStatusActive(client).then((isSubscriptionStatusActive) => {
      if (isSubscriptionStatusActive) {
        setIsSubscriptionStatusActive(isSubscriptionStatusActive);
        return;
      }
      getSubscriptionUrl(client, router.query.shop, router.query.host).then(
        (confirmationUrl) => {
          const redirect = Redirect.create(app);
          redirect.dispatch(Redirect.Action.REMOTE, confirmationUrl);
        }
      );
    });
  });

  const Component = props.Component;

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        {isSubscriptionStateActive && <Component {...props} />}
      </RecoilRoot>
    </ApolloProvider>
  );
}

class MyApp extends App {
  render() {
    const { Component, pageProps, host } = this.props;
    return (
      <AppProvider i18n={translations}>
        <Provider
          config={{
            apiKey: API_KEY,
            host: host,
            forceRedirect: true,
          }}
        >
          <RoutePropagator />
          <MyProvider Component={Component} {...pageProps} />
        </Provider>
      </AppProvider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    host: ctx.query.host,
  };
};

export default MyApp;
