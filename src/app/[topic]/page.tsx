"use client";

import { useState, useEffect } from "react";
import { TopicProps } from "../_topic-list";
import { Question } from "./_question";
import QuestionList from "./_question/question-list";

// API 호출을 통해 다음 형태의 데이터를 받아온다고 가정
interface TopicPageProps {
  topicData: TopicProps;
  // questionList: questionProps[];
}

const DUMMY_DATA: TopicPageProps = {
  topicData: {
    name: "frontend",
    nameTranslated: "프론트엔드",
  },
};

// 특정 주제의 정보를 보여주는 페이지
export default function TopicPage() {
  const [data, setData] = useState<TopicPageProps>({
    topicData: {
      name: "",
      nameTranslated: "",
    },
  });

  useEffect(() => {
    // 원래는 API를 통해 데이터를 가져옴
    setData({
      topicData: DUMMY_DATA.topicData,
    });
  }, []);

  return (
    <>
      <title>{`${data.topicData.nameTranslated} - CStation`}</title>
      <div className="vbox(center) w(100%) gap(40)">
        <p className="label text-xl c(--primary)">
          {data.topicData.nameTranslated}
        </p>
        {/* 질문 및 답변 목록 */}
        <QuestionList />
      </div>
    </>
  );
}
