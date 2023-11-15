"use client";

import { useState, useEffect } from "react";
import { TopicProps } from "../_topic-list";
import QuestionList from "./_question/question-list";
import { useParams, usePathname, useSearchParams } from "next/navigation";

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
  // 라우팅 계열
  const params = useParams();
  const searchParams = useSearchParams();

  const name = params['topic'] as string;
  const nameTranslated = searchParams.get('nameTranslated');

  const [data, setData] = useState<TopicPageProps>({
    topicData: {
      name: name,
      nameTranslated: nameTranslated ?? "",
    },
  });

  return (
    <>
      <title>{`${data.topicData.nameTranslated} - CS-Essence`}</title>
      <div className="vbox(center) w(100%) gap(40)">
        <p className="label text-xl c(--primary)">
          {data.topicData.nameTranslated}
        </p>
        <QuestionList name={data.topicData.name} />
      </div>
    </>
  );
}
