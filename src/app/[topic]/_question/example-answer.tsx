import { useState, useEffect } from "react";

// 모범 답안
export default function ExampleAnswer({ id }: { id: number }) {
  // ToDo: API를 통해 모범 답안을 Fetch합니다.
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    // API
    setAnswer("더미 데이터");
  }, []);

  return (
    <div className="vbox gap(4) py(4)">
      <p className="paragraph text-small c(--content-secondary)">모범 답안</p>
      <p className="paragraph text-medium c(--primary)">{answer}</p>
    </div>
  );
}