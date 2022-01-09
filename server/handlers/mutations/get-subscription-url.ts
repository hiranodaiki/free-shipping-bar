import "isomorphic-fetch";
import { gql } from "apollo-boost";
import Koa from "koa";

export function RECURRING_CREATE(url: string) {
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

export type GetSubscriptionUrl = (
  ctx: Koa.Context,
  host: string | string[],
  shop: string
) => Promise<void>;

export const getSubscriptionUrl: GetSubscriptionUrl = async (
  ctx,
  host,
  shop
) => {
  const { client } = ctx;
  const confirmationUrl: string = await client
    .mutate({
      // mutation: RECURRING_CREATE(process.env.HOST),
      mutation: RECURRING_CREATE(
        process.env.HOST.concat(`/?shop=${shop}&host=${host}`)
      ),
    })
    .then((response: any) => {
      return response.data.appSubscriptionCreate.confirmationUrl;
    });
  await ctx.redirect(confirmationUrl);
};
