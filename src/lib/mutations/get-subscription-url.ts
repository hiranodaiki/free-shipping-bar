import "isomorphic-fetch";
import ApolloClient, { gql } from "apollo-boost";

function RECURRING_CREATE(url: string) {
  return gql`
    mutation {
      appSubscriptionCreate(
        name: "Standard Plan"
        returnUrl: "${url}"
        test: true
        trialDays: 7
        lineItems: [
          {
            plan: {
              appRecurringPricingDetails: {
                price: { amount: 15, currencyCode: USD }
                interval: EVERY_30_DAYS
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

export type GetSubscriptionUrl = (
  client: ApolloClient<any>,
  shop: string | string[],
  host: string | string[]
) => Promise<string>;

export const getSubscriptionUrl: GetSubscriptionUrl = async (
  client,
  shop,
  host
) => {
  // マーチャントが請求を承認した時のリダイレクト先 URL の加工
  const redirectUrl = process.env.HOSTURL + `/?shop=${shop}&host=${host}`;

  // Billing APIを叩く
  const confirmationUrl: string = await client
    .mutate({
      mutation: RECURRING_CREATE(redirectUrl),
    })
    .then((response) => response.data.appSubscriptionCreate.confirmationUrl);
  return confirmationUrl;
};
