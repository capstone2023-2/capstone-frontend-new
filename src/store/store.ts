import { atom } from "recoil";

interface accessTokenProps {
  accessToken: string;
  expireDate: number;
}

// 로그인 후 accessToken을 저장해두는 atom
export const accessTokenState = atom<accessTokenProps>({
  key: "accessTokenState",
  default: {
    accessToken: "",
    expireDate: 0,
  },
});
