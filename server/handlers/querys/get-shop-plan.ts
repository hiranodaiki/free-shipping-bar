import "isomorphic-fetch";
import { gql } from "apollo-boost";
import Koa from "koa";

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

type GetShopPlanStatus = (ctx: Koa.Context) => Promise<boolean>;

export const getShopPlanStatus: GetShopPlanStatus = async (ctx) => {
  const { client } = ctx;
  const isDevelopmentStore = await client
    .query({ query: GET_STORE_PLAN_NAME })
    .then((response: any) => {
      return response.data.shop.plan.partnerDevelopment;
    });

  return isDevelopmentStore;
};
