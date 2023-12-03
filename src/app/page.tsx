import { RandomQuestionPart } from "./_random-questions";
import { TopicListPart } from "./_topic-list";
import { RequestNewTopicPart } from "./_request-new-topic";
import LinkToInterview from "./_link-to-interview/link-to-interview";

export default function MainPage() {
  return (
    <>
      <title>CS-Essence</title>
      <div className="vbox w(100%) gap(80)">
        { /* <RandomQuestionPart /> */ }
        <LinkToInterview />
        <TopicListPart />
        <RequestNewTopicPart />
      </div>
    </>
  );
}
