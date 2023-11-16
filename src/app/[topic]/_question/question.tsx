"use client";

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/store";
import { AnswerHistory, ExampleAnswer, QuestionContent, WriteAnswer } from ".";

export interface QuestionProps {
  id: number;
  topic: string;
  content: string;
  answer: string;
}

// 주제와 관련된 질문 1개
export default function Question({
  id,
  topic,
  content,
  answer,
}: QuestionProps) {
  // 상태 관리
  const accessTokenValue = useRecoilValue(accessTokenState);
  const [showTool, setShowTool] = useState<boolean>(false);
  const [showExampleAnswer, setShowExampleAnswer] = useState<boolean>(false);
  const [showWriteAnswer, setShowWriteAnswer] = useState<boolean>(false);
  const [showAnswerHistory, setShowAnswerHistory] = useState<boolean>(false);

  // 도구
  function QuestionTool() {
    return (
      <div className="hbox(reverse) gap(20)">
        <p
          className={`paragraph text-small ${
            accessTokenValue.accessToken
              ? "c(--content-secondary) pointer hover:c(--accent)"
              : "c(--content-tertiary) user-select-none"
          } ${showAnswerHistory ? "c(--accent-emphasized)" : ""} `}
          onClick={() => {
            if (accessTokenValue.accessToken) {
              setShowAnswerHistory((prev) => !prev);
            }
          }}
        >
          답안 히스토리
        </p>
        <p
          className={`paragraph text-small c(--content-secondary) pointer hover:c(--accent) ${
            showWriteAnswer ? "c(--accent-emphasized)" : ""
          }`}
          onClick={() => setShowWriteAnswer((prev) => !prev)}
        >
          답안 작성
        </p>
        <p
          className={`paragraph text-small c(--content-secondary) pointer hover:c(--accent) ${
            showExampleAnswer ? "c(--accent-emphasized)" : ""
          }`}
          onClick={() => setShowExampleAnswer((prev) => !prev)}
        >
          모범 답안
        </p>
      </div>
    );
  }

  return (
    <div
      id={id.toString()}
      className={`vbox w(100%) b(1/solid/transparent) r(8) p(12/20) gap(8) ${
        showTool ? "b(1/solid/--accent)" : ""
      } hover:b(1/solid/--accent)`}
    >
      <QuestionContent
        question={{
          id: id,
          topic: topic,
          content: content,
          answer: answer,
        }}
        onClick={() => setShowTool((prev) => !prev)}
      />
      {showTool ? <QuestionTool /> : <></>}
      {showTool && showExampleAnswer ? (
        <ExampleAnswer id={id} content={answer} />
      ) : (
        <></>
      )}
      {showTool && showWriteAnswer ? (
        <WriteAnswer id={id} topicName={topic} />
      ) : (
        <></>
      )}
      {showTool && showAnswerHistory ? (
        <AnswerHistory id={id} topicName={topic} />
      ) : (
        <></>
      )}
    </div>
  );
}
