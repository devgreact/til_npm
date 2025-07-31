import { atom } from "recoil";

export const KKOLoginAtom = atom({
  key: "KKOLoginAtom",
  default: { id: "", nickname: "", thumbnail_image_url: "", email: "" },
});
