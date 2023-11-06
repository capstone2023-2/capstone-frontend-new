"use client";

import { useState, useEffect } from "react";
import { Question, QuestionProps } from ".";

export default function QuestionList() {
  // 임시 (더미 데이터)
  const [questionList, setQuestionList] = useState<QuestionProps[]>([
    {
      id: 1,
      content: "11",
    },
    {
      id: 2,
      content: "22",
    },
    {
      id: 3,
      content: "33",
    },
    {
      id: 4,
      content: "44",
    },
    {
      id: 5,
      content: "55",
    },
    {
      id: 6,
      content: "11",
    },
    {
      id: 7,
      content: "22",
    },
    {
      id: 8,
      content: "33",
    },
    {
      id: 9,
      content: "44",
    },
    {
      id: 10,
      content: "55",
    },
    {
      id: 11,
      content: "11",
    },
    {
      id: 12,
      content: "22",
    },
    {
      id: 13,
      content: "33",
    },
    {
      id: 14,
      content: "44",
    },
    {
      id: 15,
      content: "55",
    },
  ]);

  return (
    <div className="vbox w(100%) gap(12)">
      {questionList.map((question) => {
        return (
          <Question
            key={question.id}
            id={question.id}
            content={question.content}
          />
        );
      })}
    </div>
  );
}
