"use client";

import React, { useState } from "react";
import { ExampleAnswer, QuestionContent, WriteAnswer } from ".";

export interface QuestionProps {
  id: number;
  content: string;
}

// 주제와 관련된 질문 1개
export default function Question({ id, content }: QuestionProps) {
  // 상태 관리
  const [showTool, setShowTool] = useState<boolean>(false);
  const [showExampleAnswer, setShowExampleAnswer] = useState<boolean>(false);
  const [showWriteAnswer, setShowWriteAnswer] = useState<boolean>(false);

  // 도구
  function QuestionTool() {
    return (
      <div className="hbox(reverse) gap(20)">
        <p className="paragraph text-small c(--content-secondary) hover:c(--accent)">
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
      className="vbox w(100%) b(1/solid/transparent) r(8) p(12/20) gap(4) hover:b(1/solid/--accent)"
    >
      <QuestionContent
        question={{
          id: id,
          content: content,
        }}
        onClick={() => setShowTool((prev) => !prev)}
      />
      {showTool ? <QuestionTool /> : <></>}
      {(showTool && showExampleAnswer) ? <ExampleAnswer id={id} /> : <></>}
      {(showTool && showWriteAnswer) ? <WriteAnswer id={id}/> : <></>}
    </div>
  );
}
