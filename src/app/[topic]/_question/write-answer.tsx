"use client";

import { useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/store";
import { writeAnswerToServer } from "@/apis";

// 답안 작성
export default function WriteAnswer({
  id,
  topicName,
}: {
  id: number;
  topicName: string;
}) {
  // 상태 관리
  const [content, setContent] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);
  const accessTokenValue = useRecoilValue(accessTokenState);

  // 내용 변화 관리
  function handleContent(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setSaved(false);
    setContent(event.target.value);

    // 자동 높이 조절
    event.target.style.height = "0px";
    event.target.style.height = event.target.scrollHeight + "px";
  }

  // 내용 전송 관리
  async function handleWriteAnswerToServer(
    event: React.MouseEvent<HTMLParagraphElement>
  ) {
    const answerHistoryData = await writeAnswerToServer({
      answer: content,
      otherProps: {
        questionId: id,
        topic: topicName,
        accessTokenValue: accessTokenValue,
      },
    });

    if (answerHistoryData) {
      console.log("Write Success")!;
      setSaved(true);
    } else {
      console.log("Write Failed!");
    }
  }

  return (
    <div className="vbox(left) relative gap(4) py(4)">
      <p className="paragraph text-small c(--content-secondary)">답안 작성</p>
      <textarea
        name="content"
        id="content"
        className="paragraph text-medium w(100%) h(33) b(1/solid/--content-secondary) bg(--secondary) c(--primary) r(4) p(4/8) outline(none) resize(none) no-scrollbar"
        rows={1}
        value={content}
        onChange={handleContent}
      ></textarea>
      <div className="hbox gap(auto)">
        <p
          className={`paragraph text-small p(0/8) ${
            content
              ? "c(--content-secondary) pointer hover:c(--accent)"
              : "c(--content-tertiary) user-select-none"
          }`}
          onClick={handleWriteAnswerToServer}
        >
          저장
        </p>
        {saved ? (
          <p className="paragraph text-small text-center c(--positive)">
            답안 저장 완료 :{")"}
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
