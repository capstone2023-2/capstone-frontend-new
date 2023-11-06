import React from "react";
import Link from "next/link";
import { QuestionProps } from "../[topic]/_question";

export interface RandomQuestionProps {
  question: QuestionProps;
  topicName: string;
}

// 메인 화면에 노출되는 랜덤한 질문 (혹은 오늘의 질문) 1개
function RandomQuestion({
  question = {
    id: 0,
    content: "",
  },
  topicName = "",
}: RandomQuestionProps) {
  return (
    <div className="relative vbox(left) w(75%) pb(48) gap(20) z(20)">
      <Link
        href={`/${topicName}#${question.id}`}
        className="paragraph text-large text-center w(100%) c(--primary) break-word letter-spacing(-1.5px) word-spacing(1.5px) hover:c(--accent)"
      >
        {question.content}
      </Link>
    </div>
  );
}

export default React.memo(RandomQuestion);