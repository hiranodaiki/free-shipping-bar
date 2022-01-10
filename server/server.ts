import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, { ApiVersion } from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
// 請求画面にリダイレクトするために必要なモジュール
import { createClient, getSubscriptionUrl } from "./handlers/index";
import { receiveWebhook } from "@shopify/koa-shopify-webhooks";

// ACTIVE_SHOPIFY_SHOPSのための型を定義する
type ActiveShopifyShops = {
  [key: string]: string;
}

type KoaDefaultContext = {
  shop: string
  accessToken: string
  scope: string
}

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\/|\/$/g, ""),
  API_VERSION: ApiVersion.October21, // 最新のGraphQL APIを使用するために、バージョンを2021-10をしています
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS: ActiveShopifyShops = {};

// Shopifyからのウェブフックを検知するミドルウェア関数の作成
const webhook = receiveWebhook({ secret: process.env.SHOPIFY_API_SECRET });

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      async afterAuth(ctx) {
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope }: KoaDefaultContext = ctx.state.shopify;
        const host = ctx.query.host;
        ACTIVE_SHOPIFY_SHOPS[shop] = scope;

        const response = await Shopify.Webhooks.Registry.register({
          shop,
          accessToken,
          path: "/webhooks",
          topic: "APP_UNINSTALLED",
          webhookHandler: async (topic, shop, body): Promise<void> => {
            delete ACTIVE_SHOPIFY_SHOPS[shop];
          },
        });

        if (!response.success) {
          console.log(
            `Failed to register APP_UNINSTALLED webhook: ${response.result}`
          );
        }

        // Redirect to app with shop parameter upon auth
        // ctx.redirect(`/?shop=${shop}&host=${host}`);

        // 請求画面にリダイレクト
        server.context.client = createClient(shop, accessToken);
        await getSubscriptionUrl(ctx, host, shop);
      },
    })
  );

  const handleRequest = async (
    ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>
  ) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  // クリックジャック対策
  const setClickJackingHeadersMiddleware = async (
    ctx: Koa.ParameterizedContext<
      any,
      Router.IRouterParamContext<any, {}>,
      any
    >,
    next: Koa.Next
  ): Promise<void> => {
    const shop = ctx.query.shop;
    try {
      if (shop) {
        ctx.set({
          "Content-Security-Policy": `frame-ancestors https://${shop} https://admin.shopify.com;`,
        });
        console.log(
          "Set Content-Security-Policy to: ",
          `frame-ancestors https://${shop} https://admin.shopify.com;`
        );
      } else {
      }
    } catch (err) {
      console.log("Doesnt matter");
    } finally {
      return next();
    }
  };

  router.use(setClickJackingHeadersMiddleware);

  // カスタムサーバーのルーティング設定
  router.post("/webhooks", async (ctx) => {
    try {
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  // GDPR必須ウェブフックに対応
  router.post(`/webhooks/customers/data_request`, webhook, async (ctx) => {
    ctx.res.statusCode = 200;
  });

  router.post(`/webhooks/customers/redact`, webhook, async (ctx) => {
    ctx.res.statusCode = 200;
  });

  router.post(`/webhooks/shop/redact`, webhook, async (ctx) => {
    ctx.res.statusCode = 200;
  });

  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear
  router.get("(.*)", async (ctx) => {
    const shop = ctx.query.shop as string;

    // This shop hasn't been seen yet, go through OAuth to create a session
    if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
      ctx.redirect(`/auth?shop=${shop}`);
    } else {
      await handleRequest(ctx);
    }
  });

  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
