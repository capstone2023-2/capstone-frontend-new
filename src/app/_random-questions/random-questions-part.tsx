import { RandomQuestionSwiper } from ".";

// 메인 화면에 노출되는 랜덤 질문들 (혹은 오늘의 질문들)의 전체
export default function RandomQuestionPart() {
  return (
    <div className="vbox(center) relative w(100%) gap(12)">
      <p className="label text-xl c(--primary) user-select-none">오늘의 질문</p>
      <RandomQuestionSwiper />
    </div>
  )
}