import { useRouter } from "next/navigation";

export default function InterviewResult({
  topic,
  question,
  answer,
  sttResult = "",
}: {
  topic: string;
  question: string;
  answer: string;
  sttResult?: string;
}) {
  const router = useRouter();

  return (
    <div className="vbox w(100%) gap(36) pt(20)">
      <div className="vbox gap(4)">
        <p className="label text-medium c(--primary)">주제</p>
        <p className="paragraph text-medium c(--primary) line-height(1.5) pre-line">
          {topic}
        </p>
      </div>
      <div className="vbox gap(4)">
        <p className="label text-medium c(--primary)">질문</p>
        <p className="paragraph text-medium c(--primary) line-height(1.5) pre-line">
          {question}
        </p>
      </div>
      <div className="vbox gap(4)">
        <p className="label text-medium c(--primary)">모범 답안</p>
        <p className="paragraph text-medium c(--primary) line-height(1.5) pre-line">
          {answer}
        </p>
      </div>
      <div className="vbox gap(4)">
        <p className="label text-medium c(--primary)">나의 답변</p>
        <p className="paragraph text-medium c(--primary) line-height(1.5) pre-line">
          {sttResult ? sttResult : "현재 변환 중입니다."}
        </p>
      </div>
      <div className="vbox">
        <button
          className="paragraph text-medium text-left c(--content-secondary) letter-spacing(-0.5px) line-height(1.5) pre-line hover:c(--accent)"
          onClick={() => {
            router.push("/");
          }}
        >
          홈 화면으로 돌아가기
        </button>
      </div>
    </div>
  );
}
