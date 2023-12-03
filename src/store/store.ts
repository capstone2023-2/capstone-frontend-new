import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface accessTokenProps {
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
  effects_UNSTABLE: [persistAtom],
});
