import { useState, useEffect } from "react";

// 모범 답안
export default function ExampleAnswer({ id, content }: { id: number, content: string }) {
  return (
    <div className="vbox gap(4) py(4)">
      <p className="paragraph text-small c(--content-secondary)">모범 답안</p>
      <p className="paragraph text-medium c(--primary) line-height(1.5)">{content}</p>
    </div>
  );
}