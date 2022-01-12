import "isomorphic-fetch";
import ApolloClient, { gql } from "apollo-boost";

const GET_STORE_PLAN_NAME = gql`
  query {
    shop {
      description
      plan {
        partnerDevelopment
      }
    }
  }
`;

type GetShopPlanStatus = (client: ApolloClient<any>) => Promise<boolean>;

export const getShopPlanStatus: GetShopPlanStatus = async (client) => {
  const isDevelopmentStore = await client
    .query({ query: GET_STORE_PLAN_NAME })
    .then((response) => {
      return response.data.shop.plan.partnerDevelopment;
    });

  return isDevelopmentStore;
};
