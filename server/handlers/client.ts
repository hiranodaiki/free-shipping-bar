import ApolloClient from "apollo-boost";

type CreateClient = (
  shop: string,
  accessToken: string
) => ApolloClient<unknown>;

export const createClient: CreateClient = (shop, accessToken) => {
  return new ApolloClient({
    uri: `https://${shop}/admin/api/2021-10/graphql.json`,
    request: (operation) => {
      operation.setContext({
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "User-Agent": `shopify-app-node ${process.env.npm_package_version} | Shopify App CLI`,
        },
      });
    },
  });
};