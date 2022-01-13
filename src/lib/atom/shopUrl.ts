import { atom } from "recoil";

export const shopUrlState = atom<string>({
  key: "shopUrlState",
  default: "",
});
