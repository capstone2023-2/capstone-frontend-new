import { RandomQuestionSwiper } from ".";

export default function RandomQuestionPart() {
  return (
    <div className="vbox(center) relative w(100%) gap(12)">
      <p className="label text-xl c(--primary) user-select-none">오늘의 질문</p>
      <RandomQuestionSwiper />
    </div>
  )
}