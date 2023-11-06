"use client";

import { useState } from "react";
import Topic from "./topic";

export default function TopicList() {
  const [topicNameList, setTopicNameList] = useState<string[]>([
    "aa",
    "bb",
    "cc",
    "dd",
    "ee",
  ]);

  return (
    <div className="hbox(center) flex-wrap relative w(100%) gap(16)">
      {topicNameList?.map((topicName) => {
        return <Topic key={topicName} name={topicName} />;
      })}
    </div>
  );
}
