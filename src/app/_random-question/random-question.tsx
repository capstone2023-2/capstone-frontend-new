import React from "react";
import Link from "next/link";

export interface RandomQuestionProps {
  content: string;
  topicName?: string;
  questionId?: number;
}

function RandomQuestion({
  content,
  topicName = "",
  questionId = 0,
}: RandomQuestionProps) {
  return (
    <div className="relative vbox(left) w(75%) pb(48) gap(20) z(20)">
      <Link
        href={`/${topicName}#${questionId}`}
        className="paragraph text-large text-center w(100%) c(--primary) break-word letter-spacing(-1.5px) word-spacing(1.5px) hover:c(--accent)"
      >
        {content}
      </Link>
    </div>
  );
}

export default React.memo(RandomQuestion);