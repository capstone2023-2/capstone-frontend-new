import { QuestionProps } from ".";

interface QuestionContentProps {
  question: QuestionProps;
  onClick: (event: React.MouseEvent<Element>) => void;
}

// 질문 내용
export default function QuestionContent({ question, onClick }: QuestionContentProps) {
  return (
    <div className="hbox gap(20) pointer" onClick={onClick}>
      <p className="paragraph text-small text-center w(30~) c(--content-secondary)">
        {String(question.id).padStart(3, "0")}
      </p>
      <p className="paragraph text-medium c(--primary)">{question.content}</p>
    </div>
  );
}