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
import "root/style/style.css";
// アプリ管理画面のルーティング周りの設定用の自作モジュール
import RoutePropagator from "@/components/RoutePropagator";
// 請求が完了していない時に、請求画面にリダイレクトするための実装に必要なモジュール
import { useRouter } from "next/router";
import { gql } from "apollo-boost";

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

// サブスクリプションのstatusを取得するためのクエリ
const GET_SUBSCRIPTION_STATUS = gql`
  query {
    currentAppInstallation {
      activeSubscriptions {
        createdAt
        name
        status
        test
        trialDays
      }
    }
  }
`;

// 定期購読を作成するためのミューテーション(get-subscription-url.jsと一致させること)
export function RECURRING_CREATE(url) {
  return gql`
    mutation {
      appSubscriptionCreate(
          name: "Input Your Plan Name"
          returnUrl: "${url}"
          test: true
          lineItems: [
          {
            plan: {
              appRecurringPricingDetails: {
                  price: { amount: 10, currencyCode: USD }
              }
            }
          }
          ]
        ) {
            userErrors {
              field
              message
            }
            confirmationUrl
            appSubscription {
              id
            }
        }
    }`;
}

// 請求画面にリダイレクトするためのURLを生成する関数
export const getSubscriptionUrl = async (app, client, shop, host) => {
  const redirectUrl = process.env.HOSTURL.replaceAll('"', "").concat(
    `/?shop=${shop}&host=${host}`
  );

  // Billing APIを叩く
  const confirmationUrl = await client
    .mutate({
      mutation: RECURRING_CREATE(redirectUrl),
    })
    .then((response) => {
      return response.data.appSubscriptionCreate.confirmationUrl;
    });
  return confirmationUrl;
};

function MyProvider(props) {
  const app = useAppBridge();
  const router = useRouter();

  const client = new ApolloClient({
    fetch: userLoggedInFetch(app),
    fetchOptions: {
      credentials: "include",
    },
  });

  client.query({ query: GET_SUBSCRIPTION_STATUS }).then((response) => {
    if (
      response.data.currentAppInstallation?.activeSubscriptions[0]?.status !=
      "ACTIVE"
    ) {
      getSubscriptionUrl(
        app,
        client,
        router.query.shop,
        router.query.host
      ).then((confirmationUrl) => {
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.REMOTE, confirmationUrl);
      });
    }
  });

  const Component = props.Component;

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
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
