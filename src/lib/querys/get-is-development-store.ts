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

type GetIsDevelopmentStore = (client: ApolloClient<any>) => Promise<boolean>;

export const getIsDevelopmentStore: GetIsDevelopmentStore = async (client) => {
  const isDevelopmentStore = await client
    .query({ query: GET_STORE_PLAN_NAME })
    .then((response) => {
      return response.data.shop.plan.partnerDevelopment;
    });

  return isDevelopmentStore;
};
