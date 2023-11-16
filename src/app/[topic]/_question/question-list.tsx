"use client";

import { useState, useEffect } from "react";
import { Question, QuestionProps } from ".";
import { getTopic } from "@/apis";

export default function QuestionList({ topicName }: { topicName: string }) {
  // 상태 관리
  const [questionList, setQuestionList] = useState<QuestionProps[]>([]);

  // API를 통해 질문 및 모범 답안 리스트를 받아옵니다.
  useEffect(() => {
    async function getTopicWrapper(name: string) {
      const questionListData = getTopic({name});
      questionListData.then(
        (questionList) => {
          const newQuestionList = questionList?.map((questionData) => {
            const result: QuestionProps = {
              id: questionData.id,
              topic: questionData.topic.toLowerCase(),
              content: questionData.question,
              answer: questionData.answer,
            };
            return result;
          });
          setQuestionList(newQuestionList ?? []);
        }
      );
    }

    getTopicWrapper(topicName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="vbox w(100%) gap(12)">
      {questionList.map((question) => {
        return (
          <Question
            key={question.id}
            id={question.id}
            topic={question.topic}
            content={question.content}
            answer={question.answer}
          />
        );
      })}
    </div>
  );
}
