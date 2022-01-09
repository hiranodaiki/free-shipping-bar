type DeeplinkQueryParams = {
  template?: "product" | "collection" | "article" | "blog"; // 指定しないと index が表示される
  uuid: string;
  handle: string;
};

// 任意で変更してください
const deeplinkQueryParams: DeeplinkQueryParams = {
  uuid: "907d32d2-eb34-4e9f-a95f-95e7504ff3b9",
  handle: "ja-font-selector",
};

export const createDeeplink = (shop: string): string => {
  return `https://${shop}/admin/themes/current/editor?context=apps${
    deeplinkQueryParams.template
      ? `&template=${deeplinkQueryParams.template}`
      : ""
  }&activateAppId=${deeplinkQueryParams.uuid}/${deeplinkQueryParams.handle}`;
};