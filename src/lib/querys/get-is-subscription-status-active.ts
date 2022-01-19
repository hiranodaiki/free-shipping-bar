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

type GetIsSubscriptionStatusActive = (
  client: ApolloClient<any>
) => Promise<boolean> | Promise<void>;

export const getIsSubscriptionStatusActive: GetIsSubscriptionStatusActive = async (
  client
) => {
  try {
    const isSubscriptionStatusActive = await client
      .query({ query: GET_SUBSCRIPTION_STATUS })
      .then((response) => {
        return response.data.currentAppInstallation?.activeSubscriptions[0]
          ?.status == "ACTIVE"
          ? true
          : false;
      });
    return isSubscriptionStatusActive;
  } catch {//例外処理を書く
    console.log("Error occured when gettng subscription url.");
    //何も返さない
  }
};
