import "isomorphic-fetch";
import ApolloClient, { gql } from "apollo-boost";

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

type GetIsSubscriptionStatusActive = (client: ApolloClient<any>) => Promise<boolean>;

export const getIsSubscriptionStatusActive: GetIsSubscriptionStatusActive = async (client) => {
  const isSubscriptionStatusActive = await client
    .query({ query: GET_SUBSCRIPTION_STATUS })
    .then((response) => {
      return response.data.currentAppInstallation?.activeSubscriptions[0]
        ?.status == "ACTIVE"
        ? true
        : false;
    });

  return isSubscriptionStatusActive;
};