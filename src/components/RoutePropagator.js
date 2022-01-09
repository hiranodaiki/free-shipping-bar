import {useEffect , useContext} from 'react';
import Router, { useRouter } from "next/router";
import { Context as AppBridgeContext } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { RoutePropagator as ShopifyRoutePropagator } from "@shopify/app-bridge-react";

const RoutePropagator = () => {
  const router = useRouter(); 
  const { route } = router;
  const appBridge = React.useContext(AppBridgeContext);

// appBridgeのURLを取得して、Next/routerに送信
  useEffect(() => {
    appBridge.subscribe(Redirect.Action.APP, ({ path }) => {
      Router.push(path);
    });
  }, []);

// Shopifyのデフォルトのルーティングをnext.jsのルーティングに変える
  return appBridge && route ? (
    <ShopifyRoutePropagator location={route} app={appBridge} />
  ) : null;
}

export default RoutePropagator;