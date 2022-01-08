import "isomorphic-fetch";
import { gql } from "apollo-boost";

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

export const getSubscriptionUrl = async (ctx,host,shop) => {
  const { client } = ctx;
  const confirmationUrl = await client
    .mutate({
      // mutation: RECURRING_CREATE(process.env.HOST),
      mutation: RECURRING_CREATE(process.env.HOST.concat(`/?shop=${shop}&host=${host}`)),
    })
    .then((response) => {
      return response.data.appSubscriptionCreate.confirmationUrl;
    });
  await ctx.redirect(confirmationUrl);
};