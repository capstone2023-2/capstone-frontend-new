import Link from "next/link";
import React from "react";

// 로고
function Logo() {
  return (
    <nav>
        <Link
          href="/"
          className="group label text-xxl c(--primary) hover:c(--accent) transition(color=.35s)"
        >
          <span>C</span>
          <span className="c(--accent) group-hover:c(--primary) transition(color=.35s)">S</span>
          <span>tation</span>
        </Link>
      </nav>
  )
};

export default React.memo(Logo);