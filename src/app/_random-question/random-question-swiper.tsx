"use client";

import { useState } from "react";
import { RandomQuestion, RandomQuestionProps } from ".";

// 배너 슬라이드 (Ref: https://xionwcfm.tistory.com/331)
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

// 랜덤 질문 (혹은 오늘의 질문) 슬라이드 부분
export default function RandomQuestionSwiper() {
  // 임시
  const [questionList, setQuestionList] = useState<RandomQuestionProps[]>([
    {
      content: "11",
    },
    {
      content: "22",
    },
    {
      content: "33",
    },
    {
      content: "44",
    },
    {
      content: "55",
    },
    {
      content: "프로세스와 스레드의 차이점은 무엇일까요?",
    },
  ]);

  return (
    <div className="relative w(90%)">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop
        centeredSlides={false}
        centerInsufficientSlides={true}
        spaceBetween={10}
        slidesPerView={1}
      >
        {questionList?.map((question) => {
          return (
            <SwiperSlide key={question.content}>
              <RandomQuestion
                content={question.content}
                topicName={question.topicName}
                questionId={question.questionId}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
