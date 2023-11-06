const API_URL = "http://3.36.234.136:8080/api/v1";

import { signIn, signInOld, signUp } from "./sign.api";
import { addThread, getAllThreads, getThread } from "./thread.api";
import { postDataType, getPost, getThreadPosts, writePostToThread } from "./post.api";

export default API_URL;
export { signIn, signInOld, signUp, addThread, getAllThreads, getThread, getPost, getThreadPosts, writePostToThread };
export type { postDataType };