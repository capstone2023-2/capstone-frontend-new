const API_URL = "https://api.csessence.site:8080/api/v1";
const STT_API_URL = "https://stt.csessence.site";

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
  sendAnswerAndWaitSTT
} from "./interview.api";

export default API_URL;
export {
  STT_API_URL,
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
  sendAnswerAndWaitSTT
};
export type {
  AnswerHistoryType,
  GetAnswerHistoryDataType,
  singleInterviewType,
};
