import { atom } from "recoil";

export const counterAtom = atom({
  key: "counterAtom", // state 를 구분하는 역할
  default: 0, // state 의 초기값
});
