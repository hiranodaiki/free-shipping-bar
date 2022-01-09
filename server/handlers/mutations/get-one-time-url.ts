import "isomorphic-fetch";
import { gql } from "apollo-boost";
import Koa from "koa";

export function ONETIME_CREATE(url: string) {
  return gql`
    mutation {
      appPurchaseOneTimeCreate(
        name: "test"
        price: { amount: 10, currencyCode: USD }
        returnUrl: "${url}"
        test: true
      ) {
        userErrors {
          field
          message
        }
        confirmationUrl
        appPurchaseOneTime {
          id
        }
      }
    }
  `;
}

export type GetOneTimeUrl = (
  ctx: Koa.Context,
  host: string | string[],
  shop: string
) => Promise<void>;

export const getOneTimeUrl: GetOneTimeUrl = async (ctx, host, shop) => {
  const { client } = ctx;
  const confirmationUrl: string = await client
    .mutate({
      mutation: ONETIME_CREATE(
        process.env.HOST.concat(`/?shop=${shop}&host=${host}`)
      ),
    })
    .then(
      (response: any) => response.data.appPurchaseOneTimeCreate.confirmationUrl
    );
  return ctx.redirect(confirmationUrl);
};
