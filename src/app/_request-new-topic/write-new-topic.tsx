"use client";

import { useState } from "react";

// 토픽 추가 요청에 성공했을 경우
function SubmitSuccess({ topicName }: { topicName: string }) {
  return (
    <p className="paragraph text-small text-center c(--positive)">
      새로운 주제 {topicName} 신청 완료 :{")"}
    </p>
  );
}

// 토픽 추가 요청에 실패했을 경우
function SubmitFail({ topicName }: { topicName: string }) {
  return (
    <p className="paragraph text-small text-center c(--negative)">
      새로운 주제 {topicName} 신청 실패 :{"("}
    </p>
  );
}

// 새로운 토픽 추가를 요청할 때, 토픽을 작성하는 공간
export default function WriteNewTopic() {
  // 상태
  const [content, setContent] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [failMessage, setFailMessage] = useState<string>("");

  // 토픽 작성 반영
  function handleContent(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  // Submit
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 사용자가 입력을 완료하면, 작성된 토픽 추가 요청을 전송 및 초기화
    event.preventDefault();

    setSuccessMessage(content);
    setContent("");
  }

  return (
    <div className="vbox relative w(100%) gap(8)">
      <form className="hpack h(35)" onSubmit={handleSubmit}>
        <input
          type="text"
          name="request-topic"
          id="request-topic"
          className="paragraph text-medium w(80%+16px) b(1/solid/--content-secondary) br(none) bg(--secondary) c(--primary) rl(4) p(4/8) outline(none) no-scrollbar ~md:w(80%)"
          value={content}
          onChange={handleContent}
        ></input>
        <button className="paragraph text-small text-center h(100%) b(1/solid/--content-secondary) c(--content-secondary) rr(4) p(4/12) hover:b(1/solid/--accent)+c(--accent)">
          요청
        </button>
      </form>
      {successMessage ? <SubmitSuccess topicName={successMessage} /> : <></>}
      {failMessage ? <SubmitFail topicName={failMessage} /> : <></>}
    </div>
  );
}
