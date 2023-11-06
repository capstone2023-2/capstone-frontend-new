import { TopicList } from ".";

export default function TopicListPart() {
  return (
    <div className="vbox(center) relative w(100%) gap(12)">
      <p className="label text-xl c(--primary) user-select-none">주제 목록</p>
      <TopicList />
    </div>
  )
}