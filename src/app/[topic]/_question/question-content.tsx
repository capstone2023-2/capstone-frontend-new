import { QuestionProps } from ".";

interface QuestionContentProps {
  question: QuestionProps;
  onClick: (event: React.MouseEvent<Element>) => void;
}

// 질문 내용
export default function QuestionContent({ question, onClick }: QuestionContentProps) {
  return (
    <div className="relative hbox gap(20) pointer" onClick={onClick}>
      <p className="paragraph text-small text-center w(30~) c(--content-secondary)">
        {String(question.id).padStart(3, "0")}
      </p>
      <p className="paragraph text-medium w(~100%-50px) c(--primary) break-word pre-line">{question.content}</p>
    </div>
  );
}