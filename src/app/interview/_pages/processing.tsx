export default function Processing({ question, answer }: { question: string, answer: string }) {
  return (
    <div className="vbox gap(36) pt(20)">
      <div className="vbox gap(4)">
        <p className="label text-medium c(--primary)">
          질문 (텍스트)
        </p>
        <p className="paragraph text-medium c(--primary) line-height(1.5) pre-line">
          {question}
        </p>
      </div>
      <div className="vbox gap(4)">
        <p className="label text-medium c(--primary)">
          모범 답안 (텍스트)
        </p>
        <p className="paragraph text-medium c(--primary) line-height(1.5) pre-line">
          {answer}
        </p>
      </div>
    </div>
  )
}