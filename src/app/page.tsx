import { RandomQuestionPart } from "./_random-questions";
import { TopicListPart } from "./_topic-list";

export default function MainPage() {
  return (
    <>
      <title>CStation</title>
      <div className="vbox w(100%) gap(60)">
        <RandomQuestionPart />
        <TopicListPart />
      </div>
    </>
  );
}
