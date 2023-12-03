const API_URL = "http://3.36.234.136:8080/api/v1";

import { signIn, signInOld, signUp } from "./sign.api";
import { setCookie, getCookie } from "./cookie.api";
import { getTopics, getTopic } from "./topic.api";
import {
  getAnswerHistory,
  writeAnswerToServer,
  AnswerHistoryType,
  GetAnswerHistoryDataType,
} from "./answer.api";
import {
  getRandomQuestionFromRandomTopic,
  singleInterviewType,
} from "./interview.api";

export default API_URL;
export {
  signIn,
  signInOld,
  signUp,
  setCookie,
  getCookie,
  getTopics,
  getTopic,
  getAnswerHistory,
  writeAnswerToServer,
  getRandomQuestionFromRandomTopic,
};
export type {
  AnswerHistoryType,
  GetAnswerHistoryDataType,
  singleInterviewType,
};
