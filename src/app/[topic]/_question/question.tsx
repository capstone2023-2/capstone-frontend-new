"use client";

import React, { useEffect, useState } from "react";

export interface QuestionProps {
  id: number;
  content: string;
}

interface QuestionContentProps {
  question: QuestionProps;
  onClick: (event: React.MouseEvent<Element>) => void;
}

// 질문 내용
function QuestionContent({ question, onClick }: QuestionContentProps) {
  return (
    <div className="hbox gap(20) pointer" onClick={onClick}>
      <p className="paragraph text-small text-center w(30~) c(--content-secondary)">
        {String(question.id).padStart(3, "0")}
      </p>
      <p className="paragraph text-medium c(--primary)">{question.content}</p>
    </div>
  );
}

// 모범 답안
function ExampleAnswer({ id }: { id: number }) {
  // ToDo: API를 통해 모범 답안을 Fetch합니다.
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    // API
    setAnswer("더미 데이터");
  }, []);

  return (
    <div className="vbox gap(4) py(4)">
      <p className="paragraph text-small c(--content-secondary)">모범 답안</p>
      <p className="paragraph text-medium c(--primary)">{answer}</p>
    </div>
  );
}

// 답안 작성
function WriteAnswer() {
  const [content, setContent] = useState<string>("");

  function handleContent(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);

    // 자동 높이 조절
    event.target.style.height = "0px";
    event.target.style.height = event.target.scrollHeight + "px";
  }

  return (
    <div className="vbox gap(4) py(4)">
      <p className="paragraph text-small c(--content-secondary)">답안 작성</p>
      <textarea
        name="content"
        id="content"
        className="paragraph text-medium h(33) b(1/solid/--content-secondary) bg(--secondary) c(--primary) r(4) p(4/8) outline(none) resize(none) no-scrollbar"
        rows={1}
        value={content}
        onChange={handleContent}
      ></textarea>
    </div>
  );
}

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
      {(showTool && showWriteAnswer) ? <WriteAnswer /> : <></>}
    </div>
  );
}
