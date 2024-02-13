import { TopicList } from ".";

// 메인 화면의 주제 목록의 전체
export default function TopicListPart() {
  return (
    <div className="vbox(center) relative w(100%) gap(12)">
      <p className="label text-xl text-center c(--primary) user-select-none">원하는 주제를 찾아보세요!</p>
      <TopicList />
    </div>
  )
}