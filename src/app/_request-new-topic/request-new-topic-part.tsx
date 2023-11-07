import { WriteNewTopic } from ".";

export default function RequestNewTopicPart() {
  return (
    <div className="vbox(center) relative w(100%) gap(12)">
      <p className="label text-xl c(--primary) user-select-none">
        내가 찾는 주제가 없다면 바로 여기서 신청!
      </p>
      <WriteNewTopic />
    </div>
  );
}
