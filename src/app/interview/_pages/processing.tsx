import { useRouter } from "next/navigation";

export default function Processing({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const router = useRouter();

  return (
    <div className="vbox gap(36) pt(20)">
      <div className="vbox gap(4)">
        <p className="label text-medium c(--primary)">질문 (텍스트)</p>
        <p className="paragraph text-medium c(--primary) line-height(1.5) pre-line">
          {question}
        </p>
      </div>
      <div className="vbox gap(4)">
        <p className="label text-medium c(--primary)">모범 답안 (텍스트)</p>
        <p className="paragraph text-medium c(--primary) line-height(1.5) pre-line">
          {answer}
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
