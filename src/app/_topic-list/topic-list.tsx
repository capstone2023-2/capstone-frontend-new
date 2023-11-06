"use client";

import { useState } from "react";
import Topic, { TopicProps } from "./topic";

// 메인 화면의 주제 리스트
export default function TopicList() {
  const [topicList, setTopicList] = useState<TopicProps[]>([
    {
      name: "aa",
      nameTranslated: "aa",
    },
    {
      name: "bb",
      nameTranslated: "bb",
    },
    {
      name: "cc",
      nameTranslated: "cc",
    },
    {
      name: "dd",
      nameTranslated: "dd",
    },
    {
      name: "ee",
      nameTranslated: "ee",
    },
  ]);

  return (
    <div className="hbox(center) flex-wrap relative w(100%) gap(16)">
      {topicList?.map((topic) => {
        return (
          <Topic
            key={topic.name}
            name={topic.name}
            nameTranslated={topic.nameTranslated}
          />
        );
      })}
    </div>
  );
}
