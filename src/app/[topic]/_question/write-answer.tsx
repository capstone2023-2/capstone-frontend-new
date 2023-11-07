import { useState } from "react";

// 답안 작성
export default function WriteAnswer({ id }: { id: number }) {
  const [content, setContent] = useState<string>("");

  function handleContent(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);

    // 자동 높이 조절
    event.target.style.height = "0px";
    event.target.style.height = event.target.scrollHeight + "px";
  }

  return (
    <div className="vbox gap(4) py(4)">
      <p className="paragraph text-small c(--content-secondary)">답안 작성</p>
      <textarea
        name="content"
        id="content"
        className="paragraph text-medium h(33) b(1/solid/--content-secondary) bg(--secondary) c(--primary) r(4) p(4/8) outline(none) resize(none) no-scrollbar"
        rows={1}
        value={content}
        onChange={handleContent}
      ></textarea>
    </div>
  );
}
