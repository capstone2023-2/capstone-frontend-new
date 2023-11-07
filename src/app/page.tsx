import { RandomQuestionPart } from "./_random-questions";
import { TopicListPart } from "./_topic-list";
import { RequestNewTopicPart } from "./_request-new-topic";

export default function MainPage() {
  return (
    <>
      <title>CStation</title>
      <div className="vbox w(100%) gap(80)">
        <RandomQuestionPart />
        <TopicListPart />
        <RequestNewTopicPart />
      </div>
    </>
  );
}
