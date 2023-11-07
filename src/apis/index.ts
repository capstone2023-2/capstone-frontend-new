const API_URL = "http://3.36.234.136:8080/api/v1";

import { signIn, signInOld, signUp } from "./sign.api";
import { setCookie, getCookie } from "./cookie.api";

export default API_URL;
export { signIn, signInOld, signUp, setCookie, getCookie };