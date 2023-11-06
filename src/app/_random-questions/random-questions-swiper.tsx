"use client";

import { useState } from "react";
import { RandomQuestion, RandomQuestionProps } from ".";

// 배너 슬라이드 (Swiper Library, Ref: https://xionwcfm.tistory.com/331, ...)
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

// 메인 화면에 노출되는 랜덤 질문들 (혹은 오늘의 질문들)의 슬라이드 부분
export default function RandomQuestionSwiper() {
  // 임시로 더미 데이터 설정
  const [randomQuestionList, setRandomQuestionList] = useState<
    RandomQuestionProps[]
  >([
    {
      question: {
        id: 1,
        content: "11",
      },
      topicName: "aa",
    },
    {
      question: {
        id: 2,
        content: "22",
      },
      topicName: "bb",
    },
    {
      question: {
        id: 3,
        content: "33",
      },
      topicName: "cc",
    },
    {
      question: {
        id: 4,
        content: "44",
      },
      topicName: "dd",
    },
    {
      question: {
        id: 5,
        content: "55",
      },
      topicName: "ee",
    },
  ]);

  return (
    <div className="relative w(90%)">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        centeredSlides={false}
        centerInsufficientSlides={true}
        spaceBetween={10}
        slidesPerView={1}
      >
        {randomQuestionList?.map((randomQuestion) => {
          return (
            <SwiperSlide
              key={`${randomQuestion.topicName} ${randomQuestion.question.id}`}
            >
              <RandomQuestion
                question={randomQuestion.question}
                topicName={randomQuestion.topicName}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
