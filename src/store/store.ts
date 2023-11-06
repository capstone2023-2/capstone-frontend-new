import { atom } from "recoil";

interface accessTokenProps {
  accessToken: string;
  expireDate: number;
}

export const accessTokenState = atom<accessTokenProps>({
  key: "accessTokenState",
  default: {
    accessToken: "",
    expireDate: 0,
  },
});
