"use client";

import { useState, useEffect } from "react";
import Topic, { TopicProps } from "./topic";
import { getTopics } from "@/apis";

// 메인 화면의 주제 리스트
export default function TopicList() {
  const [topicList, setTopicList] = useState<TopicProps[]>([]);

  // API를 통해 주제(토픽) 리스트를 받아옵니다.
  useEffect(() => {
    async function getTopicsWrapper() {
      const topicListData = getTopics();
      topicListData.then((topicList) => {
        const newTopicList = topicList?.map((topicLinkData) => {
          const result: TopicProps = {
            name: topicLinkData.uri,
            nameTranslated: topicLinkData.topic,
          };
          return result;
        });
        setTopicList(newTopicList ?? []);
      });
    }

    getTopicsWrapper();
  }, []);

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
