import { TopicList } from ".";

// 메인 화면의 주제 목록의 전체
export default function TopicListPart() {
  return (
    <div className="vbox(center) relative w(100%) gap(12)">
      <p className="label text-xl c(--primary) user-select-none">더 많은 주제를 원한다면?</p>
      <TopicList />
    </div>
  )
}